import { OverlayMenuProps } from '@/source/03-components/Menu/OverlayMenu/OverlayMenu';

const overlayMenuArgs = {
  items: [
    { id: 1, title: 'Home', url: '#0', inActiveTrail: false },
    { id: 2, title: 'About', url: '#0', inActiveTrail: false },
    { id: 3, title: 'Resources', url: '#0', inActiveTrail: false },
    { id: 4, title: 'Contact', url: '#0', inActiveTrail: false },
  ],
} satisfies OverlayMenuProps;

export default overlayMenuArgs;
