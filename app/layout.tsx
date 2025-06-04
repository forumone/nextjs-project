import '../source/00-config/index.css';

import DropdownMenu from '@/source/03-components/Menu/DropdownMenu/DropdownMenu';
import { JSX, PropsWithChildren } from 'react';
import sourceSansPro from '../source/01-global/fonts/source-sans';
import '../source/01-global/index.css';
import Footer from '../source/02-layouts/Footer/Footer';
import Header from '../source/02-layouts/Header/Header';
import SiteContainer from '../source/02-layouts/SiteContainer/SiteContainer';
import BackToTop from '../source/03-components/BackToTop/BackToTop';
import Menu from '../source/03-components/Menu/Menu';
import footerStyles from '../source/03-components/Menu/menu-footer.module.css';
import SiteName from '../source/03-components/SiteName/SiteName';
import Skiplink from '../source/03-components/Skiplink/Skiplink';
import '../source/06-utility/index.css';

function RootLayout({ children }: PropsWithChildren): JSX.Element {
  return (
    <html lang="en" className={sourceSansPro.variable}>
      <body id="top">
        <Skiplink />
        <SiteContainer>
          <Header>
            <SiteName siteName="NextJS Starter" />
            <DropdownMenu
              items={[
                {
                  id: 'home',
                  title: 'Home',
                  url: '/',
                },
                {
                  id: 'about',
                  title: 'About',
                  url: '/about',
                },
              ]}
            />
          </Header>
          {/* Breadcrumb */}
          {children}
          <Footer>
            <Menu
              items={[
                {
                  id: 'home',
                  title: 'Home',
                  url: '/',
                },
                {
                  id: 'about',
                  title: 'About',
                  url: '/about',
                },
              ]}
              modifierClasses={footerStyles.menu}
              itemClasses={footerStyles.item}
            />
          </Footer>
        </SiteContainer>
        <BackToTop text="Back to Top" topElement="top" />
      </body>
    </html>
  );
}

export default RootLayout;
