import { JSX, ReactNode } from 'react';
import BackToTop from '~components/BackToTop/BackToTop';
import Menu, { MenuProps } from '~components/Menu/Menu';
import ResponsiveMenu, {
  ResponsiveMenuProps,
} from '~components/Menu/ResponsiveMenu/ResponsiveMenu';
import SiteName, { SiteNameProps } from '~components/SiteName/SiteName';
import Skiplink from '~components/Skiplink/Skiplink';
import Footer from '~layouts/Footer/Footer';
import Header from '~layouts/Header/Header';
import SiteContainer from '~layouts/SiteContainer/SiteContainer';

interface PageWrapperProps {
  siteName: SiteNameProps['siteName'];
  responsiveMenuItems: ResponsiveMenuProps['items'];
  footerMenuItems: MenuProps['items'];
  children?: ReactNode;
  footerModifierClasses?: MenuProps['modifierClasses'];
  footerItemClasses?: MenuProps['itemClasses'];
  footerLinkClasses?: MenuProps['linkClasses'];
}

function PageWrapper({
  siteName,
  responsiveMenuItems,
  footerMenuItems,
  footerModifierClasses,
  footerItemClasses,
  children,
}: PageWrapperProps): JSX.Element {
  return (
    <>
      <Skiplink />
      <SiteContainer>
        <Header>
          <SiteName siteName={siteName} />
          <ResponsiveMenu items={responsiveMenuItems} />
        </Header>
        {children}
        <Footer>
          <Menu
            items={footerMenuItems}
            modifierClasses={footerModifierClasses}
            itemClasses={footerItemClasses}
          />
        </Footer>
      </SiteContainer>
      <BackToTop text="Back to Top" topElement="top" />
    </>
  );
}

export default PageWrapper;
export type { PageWrapperProps };
