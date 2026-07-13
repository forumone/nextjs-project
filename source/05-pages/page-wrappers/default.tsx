import { ReactNode, type JSX } from 'react';
import { FooterMenu as FooterMenuStory } from '~components/Menu/Menu.stories';
import { ResponsiveMenu as ResponsiveMenuStory } from '~components/Menu/ResponsiveMenu/ResponsiveMenu.stories';
import { SiteName as SiteNameStory } from '~components/SiteName/SiteName.stories';
import PageWrapper from '~templates/PageWrapper/PageWrapper';

const storybookPageWrapperArgs = {
  siteName: SiteNameStory.args?.siteName || '',
  responsiveMenuItems: ResponsiveMenuStory.args?.items || [],
  footerMenuItems: FooterMenuStory.args?.items || [],
  footerModifierClasses: FooterMenuStory.args?.modifierClasses,
  footerItemClasses: FooterMenuStory.args?.itemClasses,
  footerLinkClasses: FooterMenuStory.args?.linkClasses,
};

function StorybookLayout({ children }: { children?: ReactNode }): JSX.Element {
  return <PageWrapper {...storybookPageWrapperArgs}>{children}</PageWrapper>;
}

export default StorybookLayout;
export { storybookPageWrapperArgs };
