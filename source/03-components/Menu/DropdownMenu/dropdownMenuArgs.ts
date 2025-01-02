import { DropdownMenuProps } from '@/source/03-components/Menu/DropdownMenu/DropdownMenu';

const dropdownMenuArgs = {
  showOnHover: false,
  items: [
    {
      title: 'Home',
      url: '#0',
      inActiveTrail: false,
    },
    {
      title: 'About',
      url: '#0',
      inActiveTrail: false,
      isButton: true,
      below: [
        {
          title: 'Submenu item one',
          url: '#0',
          below: [
            {
              title: 'Submenu item one',
              url: '#0',
            },
            {
              title: 'Submenu item two',
              url: '#0',
            },
            {
              title: 'Submenu item three',
              url: '#0',
            },
          ],
        },
        {
          title: 'Submenu item two',
          url: '#0',
        },
        {
          title: 'Submenu item three',
          url: '#0',
        },
      ],
    },
    {
      title: 'Resources',
      url: '<button>',
      inActiveTrail: false,
      below: [
        {
          title: 'Submenu item one',
          url: '#0',
        },
        {
          title: 'Submenu item two',
          url: '#0',
        },
      ],
    },
    { title: 'Contact', url: '#0', inActiveTrail: false },
  ],
} satisfies DropdownMenuProps;

export default dropdownMenuArgs;
