import { DropdownProps } from './DropdownMenu';

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
      inActiveTrail: true,
      below: [
        {
          id: 'about-staff',
          title: 'About Staff',
          url: '#0',
          inActiveTrail: true,
          below: [
            {
              id: 'staff-leadership',
              title: 'Staff Leadership',
              url: '#0',
              inActiveTrail: false,
            },
            {
              id: 'staff-directory',
              title: 'Staff Directory',
              url: '#0',
              inActiveTrail: false,
            },
            {
              id: 'staff-benefits',
              title: 'Staff Benefits',
              url: '#0',
              inActiveTrail: false,
            },
          ],
        },
        {
          id: 'about-history',
          title: 'About History',
          url: '#0',
          inActiveTrail: false,
        },
        {
          id: 'about-locations',
          title: 'About Locations',
          url: '#0',
          inActiveTrail: false,
        },
      ],
    },
    {
      id: 'resources',
      title: 'Resources',
      url: '#0',
      inActiveTrail: false,
      below: [
        {
          id: 'resource-library',
          title: 'Resource Library',
          url: '#0',
          inActiveTrail: false,
        },
        {
          id: 'resource-downloads',
          title: 'Resource Downloads',
          url: '#0',
          inActiveTrail: false,
        },
      ],
    },
    {
      id: 'contact',
      title: 'Contact',
      url: '#0',
      inActiveTrail: false,
    },
  ],
} satisfies Partial<DropdownProps>;

export default dropdownMenuArgs;
