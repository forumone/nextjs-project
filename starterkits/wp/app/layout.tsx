import '@/source/00-config/index.css';

import logo from '@/public/images/logo-183x300.png';
import { creepster, lora, raleway } from '@/source/01-global/fonts/fonts';
import '@/source/01-global/index.css';
import Footer from '@/source/02-layouts/Footer/Footer';
import Grid from '@/source/02-layouts/Grid/Grid';
import Header from '@/source/02-layouts/Header/Header';
import SiteContainer from '@/source/02-layouts/SiteContainer/SiteContainer';
import BackToTop from '@/source/03-components/BackToTop/BackToTop';
import Copyright from '@/source/03-components/Copyright/Copyright';
import ResponsiveMenu from '@/source/03-components/Menu/ResponsiveMenu/ResponsiveMenu';
import SocialMenu, {
  SocialMenuItem,
} from '@/source/03-components/Menu/SocialMenu/SocialMenu';
import UtilityMenu from '@/source/03-components/Menu/UtilityMenu/UtilityMenu';
import SiteBranding from '@/source/03-components/SiteBranding/SiteBranding';
import Skiplink from '@/source/03-components/Skiplink/Skiplink';
import addBasePath from '@/source/06-utility/addBasePath';
import '@/source/06-utility/index.css';
import {
  GetLayoutQuery,
  LayoutMetadataQuery,
} from '@/types/__generated__/graphql';
import { arrayFromAcf } from '@/util/wp/acfTools';
import { isNotNullNorUndefined } from '@/util/isNullOrUndefined';
import { gql } from '@apollo/client';
import { getClient } from '@faustwp/experimental-app-router';
import { FaustProvider } from '@faustwp/experimental-app-router/ssr';
import { decode } from 'html-entities';
import parse from 'html-react-parser';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PropsWithChildren } from 'react';
import '../faust.config.js';
import ClientProvider from './ClientProvider';
import layoutMetadataQuery from './layoutMetadataQuery';

export async function generateMetadata(): Promise<Metadata> {
  const client = await getClient();
  const { data } = await client.query<LayoutMetadataQuery>({
    query: layoutMetadataQuery,
  });
  const title = data.generalSettings?.title || '';
  return {
    // https://nextjs.org/docs/app/api-reference/functions/generate-metadata#title
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    // https://nextjs.org/docs/app/api-reference/functions/generate-metadata#manifest
    // manifest: addBasePath('/site.webmanifest'),
    // https://nextjs.org/docs/app/api-reference/functions/generate-metadata#icons
    icons: {
      icon: [
        { url: addBasePath('/favicon.ico') },
        {
          url: addBasePath('/favicon-16x16.png'),
          sizes: '16x16',
          type: 'image/png',
        },
        {
          url: addBasePath('/favicon-32x32.png'),
          sizes: '32x32',
          type: 'image/png',
        },
      ],
      apple: addBasePath('/apple-touch-icon.png'),
      // TODO: Add mask-icon for safari-pinned-tab.svg?
    },
  };
}

export default async function RootLayout({ children }: PropsWithChildren) {
  const client = await getClient();

  const { data } = await client.query<GetLayoutQuery>({
    query: gql`
      query GetLayout {
        generalSettings {
          title
          description
        }
        primaryMenuItems: menuItems(where: { location: PRIMARY }) {
          nodes {
            id
            label
            uri
          }
        }
        secondaryMenuItems: menuItems(where: { location: SECONDARY }) {
          nodes {
            id
            label
            uri
          }
        }
        footerMenuItems: menuItems(where: { location: FOOTER }) {
          nodes {
            id
            label
            uri
          }
        }
        footerContactInformation
        socialMediaItems: menuItems(where: { location: SOCIAL_MEDIA }) {
          nodes {
            id
            label
            uri
            cssClasses
          }
        }
      }
    `,
  });

  if (
    !data.generalSettings ||
    !data.primaryMenuItems ||
    !data.secondaryMenuItems ||
    !data.footerMenuItems ||
    !data.socialMediaItems
  ) {
    throw new Error('Query failed.');
  }
  return (
    <html
      lang="en"
      className={`${lora.variable} ${raleway.variable} ${creepster.variable}`}
    >
      <body>
        <SiteContainer>
          <FaustProvider>
            <ClientProvider>
              <Skiplink />
              <Header
                branding={
                  <SiteBranding
                    siteName={data.generalSettings.title || ''}
                    siteLogo={<Image src={logo} alt="Scary Celery Logo" />}
                    siteTagline={decode(data.generalSettings.description)}
                  />
                }
                primary={
                  <>
                    <ResponsiveMenu
                      items={arrayFromAcf(data.primaryMenuItems.nodes).map(
                        el => ({
                          title: el.label || '',
                          url: el.uri || '',
                        }),
                      )}
                      mobileItems={arrayFromAcf(
                        data.secondaryMenuItems.nodes,
                      ).map(el => ({
                        title: el.label || '',
                        url: el.uri || '',
                      }))}
                    />
                  </>
                }
                utility={
                  <UtilityMenu
                    items={arrayFromAcf(data.secondaryMenuItems.nodes).map(
                      el => ({
                        title: el.label || '',
                        url: el.uri || '',
                      }),
                    )}
                  />
                }
              />
              {children}
              <Footer>
                <Grid numCols={2}>
                  {/* Left column */}
                  <div>{parse(data.footerContactInformation || '')}</div>
                  {/* Right column */}
                  <div>
                    {/* Social media links */}

                    {data.socialMediaItems && (
                      <SocialMenu
                        items={arrayFromAcf(data.socialMediaItems.nodes)
                          .map<SocialMenuItem | null>(el => {
                            if (!el.label || !el.uri) {
                              return null;
                            }
                            return {
                              title: el.label,
                              url: el.uri,
                              icon: el.cssClasses?.filter(
                                isNotNullNorUndefined,
                              ),
                            };
                          })
                          .filter(isNotNullNorUndefined)}
                      />
                    )}

                    {/* Footer links */}
                    {data.footerMenuItems && (
                      <ul>
                        {data.footerMenuItems.nodes.map(a => (
                          <li key={a.id}>
                            <Link href={a.uri || ''}>{a.label}</Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Grid>
                {/* Bottom row */}
                {data.generalSettings.title && (
                  <Copyright title={data.generalSettings.title} />
                )}
              </Footer>
            </ClientProvider>
          </FaustProvider>
        </SiteContainer>
        <BackToTop text="Back to Top" topElement="top" />
      </body>
    </html>
  );
}
