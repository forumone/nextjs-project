// This must be imported first, so it has to stay in a group by itself,
// so prettier won't try to resort it.
import '~/source/00-config/index.css';

import { JSX, PropsWithChildren } from 'react';
import footerStyles from '~components/Menu/menu-footer.module.css';
import sourceSansPro from '~global/fonts/source-sans';
import '~global/index.css';
import PageWrapper from '~templates/PageWrapper/PageWrapper';
import '~utility/index.css';

function RootLayout({ children }: PropsWithChildren): JSX.Element {
  const responsiveMenuItems = [
    {
      title: 'Home',
      url: '/',
    },
    {
      title: 'About',
      url: '/about',
    },
  ];
  const footerMenuItems = [
    {
      title: 'Home',
      url: '/',
    },
    {
      title: 'About',
      url: '/about',
    },
  ];

  return (
    <html lang="en" className={sourceSansPro.variable}>
      <body id="top">
        <PageWrapper
          siteName="NextJS Starter"
          responsiveMenuItems={responsiveMenuItems}
          footerMenuItems={footerMenuItems}
          footerModifierClasses={footerStyles.menu}
          footerItemClasses={footerStyles.item}
          footerLinkClasses={footerStyles.link}
        >
          {children}
        </PageWrapper>
      </body>
    </html>
  );
}

export default RootLayout;
