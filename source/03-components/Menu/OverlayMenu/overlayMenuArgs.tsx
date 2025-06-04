import Menu, { MenuItem } from '@/source/03-components/Menu/Menu';
import { OverlayMenuProps } from '@/source/03-components/Menu/OverlayMenu/OverlayMenu';
import styles from './overlay-menu-extras.module.css';

const OverlayMenuItems: MenuItem[] = [
  { id: 'home', title: 'Home', url: '#0', inActiveTrail: false },
  { id: 'about', title: 'About', url: '#0', inActiveTrail: false },
  { id: 'resources', title: 'Resources', url: '#0', inActiveTrail: false },
  { id: 'contact', title: 'Contact', url: '#0', inActiveTrail: false },
];

const overlayMenuArgs = {
  children: (
    <Menu
      items={OverlayMenuItems}
      modifierClasses={styles.menu}
      linkClasses={styles.link}
    />
  ),
} satisfies OverlayMenuProps;

export default overlayMenuArgs;
