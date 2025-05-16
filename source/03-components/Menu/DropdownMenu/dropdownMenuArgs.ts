import { DropdownMenuProps } from '@/source/03-components/Menu/DropdownMenu/DropdownMenu';

const dropdownMenuArgs = {
  items: [
    {
      id: 'home',
      title: 'Home',
      url: '#0',
      inActiveTrail: false,
    },
    {
      id: 'about',
      title: 'About',
      url: '#0',
      inActiveTrail: false,
      below: [
        {
          id: 'about-submenu-one',
          title: 'About submenu one',
          url: '#0',
          below: [
            {
              id: 'submenu-one-submenu-one',
              title: 'Subsubmenu item one',
              url: '#0',
            },
            {
              id: 'submenu-one-submenu-two',
              title: 'Subsubmenu item two',
              url: '#0',
            },
            {
              id: 'submenu-one-submenu-three',
              title: 'Subsubmenu item three',
              url: '#0',
            },
          ],
        },
        {
          id: 'about-submenu-two',
          title: 'Submenu item two',
          url: '#0',
        },
        {
          id: 'about-submenu-three',
          title: 'Submenu item three',
          url: '#0',
        },
      ],
    },
    {
      title: 'Resources',
      url: '<button>',
      inActiveTrail: false,
      id: 'resources',
      below: [
        {
          id: 'resources-submenu-one',
          title: 'Submenu item one',
          url: '#0',
        },
        {
          id: 'resources-submenu-two',
          title: 'Submenu item two',
          url: '#0',
        },
      ],
    },
    { id: 'contact', title: 'Contact', url: '#0', inActiveTrail: false },
  ],
} satisfies DropdownMenuProps;

export default dropdownMenuArgs;
