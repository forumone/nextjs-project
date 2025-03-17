import siteNameArgs from '@/source/03-components/SiteName/siteNameArgs';
import { ReactNode, type JSX } from 'react';
import Footer from '../../02-layouts/Footer/Footer';
import Header from '../../02-layouts/Header/Header';
import SiteContainer from '../../02-layouts/SiteContainer/SiteContainer';
import BackToTop from '../../03-components/BackToTop/BackToTop';
import Menu from '../../03-components/Menu/Menu';
import footerMenuArgs from '../../03-components/Menu/menuFooterArgs';
import ResponsiveMenu from '../../03-components/Menu/ResponsiveMenu/ResponsiveMenu';
import responsiveMenuArgs from '../../03-components/Menu/ResponsiveMenu/responsiveMenuArgs';
import SiteName from '../../03-components/SiteName/SiteName';
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
          {SiteName && <SiteName {...siteNameArgs} />}
          {ResponsiveMenu && <ResponsiveMenu {...responsiveMenuArgs} />}
        </Header>
        {children}
        <Footer>{Menu && <Menu {...footerMenuArgs} />}</Footer>
      </SiteContainer>
      <BackToTop text="Back to Top" topElement="top" />
    </>
  );
}

export default PageWrapper;
