import clsx from 'clsx';
import { GessoComponent } from 'gesso';
import Link from 'next/link';
import { JSX, ReactElement, ReactNode } from 'react';
import styles from './site-branding.module.css';

interface SiteNameProps extends GessoComponent {
  siteName: string;
  url?: string;
  title?: string;
  siteLogo?: ReactElement;
  siteTagline?: ReactNode;
}

function SiteBranding({
  siteName,
  siteLogo,
  siteTagline,
  url = '/',
  title = 'Home',
  modifierClasses,
}: SiteNameProps): JSX.Element {
  return (
    <Link
      href={url}
      title={title}
      rel="home"
      className={clsx(styles.link, modifierClasses)}
    >
      {siteLogo}
      <span className={styles.name}>{siteName}</span>
      {siteTagline && <p className={styles.tagline}>{siteTagline}</p>}
    </Link>
  );
}

export default SiteBranding;
