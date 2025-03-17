import { FooterMenu as FooterMenuStory } from '@/source/03-components/Menu/Menu.stories';
import { ReactNode, type JSX } from 'react';
import Footer from '../../02-layouts/Footer/Footer';
import Header from '../../02-layouts/Header/Header';
import SiteContainer from '../../02-layouts/SiteContainer/SiteContainer';
import BackToTop from '../../03-components/BackToTop/BackToTop';
import Menu from '../../03-components/Menu/Menu';
import ResponsiveMenu from '../../03-components/Menu/ResponsiveMenu/ResponsiveMenu';
import { ResponsiveMenu as ResponsiveMenuStory } from '../../03-components/Menu/ResponsiveMenu/ResponsiveMenu.stories';
import SiteName from '../../03-components/SiteName/SiteName';
import { SiteName as SiteNameStory } from '../../03-components/SiteName/SiteName.stories';
import Skiplink from '../../03-components/Skiplink/Skiplink';

interface PageWrapperProps {
  children?: ReactNode;
}

function PageWrapper({ children }: PageWrapperProps): JSX.Element {
  return (
    <>
      <Skiplink />
      <SiteContainer>
        <Header>
          <SiteName
            siteName={SiteNameStory.args?.siteName || ''}
            {...SiteNameStory.args}
          />
          <ResponsiveMenu
            items={ResponsiveMenuStory.args?.items || []}
            {...ResponsiveMenuStory.args}
          />
        </Header>
        {children}
        <Footer>
          <Menu
            items={FooterMenuStory.args?.items || []}
            {...FooterMenuStory.args}
          />
        </Footer>
      </SiteContainer>
      <BackToTop text="Back to Top" topElement="top" />
    </>
  );
}

export default PageWrapper;
