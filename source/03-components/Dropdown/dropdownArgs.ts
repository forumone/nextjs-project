import { DropdownProps } from './Dropdown';

const dropdownArgs = {
  items: [
    {
      id: 'home',
      title: 'Home',
      url: '#0',
      original_link: {
        options: {
          attributes: {
            class: '',
          },
        },
      },
      in_active_trail: false,
    },
    {
      id: 'about',
      title: 'About',
      url: '#0',
      original_link: {
        options: {
          attributes: {
            class: '',
          },
        },
      },
      in_active_trail: true,
      below: [
        {
          id: 'about-staff',
          title: 'About Staff',
          url: '#0',
          original_link: {
            options: {
              attributes: {
                class: '',
              },
            },
          },
          in_active_trail: true,
          is_active: true,
          below: [
            {
              id: 'staff-leadership',
              title: 'Staff Leadership',
              url: '#0',
              original_link: {
                options: {
                  attributes: {
                    class: '',
                  },
                },
              },
              in_active_trail: false,
            },
            {
              id: 'staff-directory',
              title: 'Staff Directory',
              url: '#0',
              original_link: {
                options: {
                  attributes: {
                    class: '',
                  },
                },
              },
              in_active_trail: false,
            },
            {
              id: 'staff-benefits',
              title: 'Staff Benefits',
              url: '#0',
              original_link: {
                options: {
                  attributes: {
                    class: '',
                  },
                },
              },
              in_active_trail: false,
            },
          ],
        },
        {
          id: 'about-history',
          title: 'About History',
          url: '#0',
          original_link: {
            options: {
              attributes: {
                class: '',
              },
            },
          },
          in_active_trail: false,
        },
        {
          id: 'about-locations',
          title: 'About Locations',
          url: '#0',
          original_link: {
            options: {
              attributes: {
                class: '',
              },
            },
          },
          in_active_trail: false,
        },
      ],
    },
    {
      id: 'resources',
      title: 'Resources',
      url: '#0',
      original_link: {
        options: {
          attributes: {
            class: '',
          },
        },
      },
      in_active_trail: false,
      below: [
        {
          id: 'resource-library',
          title: 'Resource Library',
          url: '#0',
          original_link: {
            options: {
              attributes: {
                class: '',
              },
            },
          },
          in_active_trail: false,
        },
        {
          id: 'resource-downloads',
          title: 'Resource Downloads',
          url: '#0',
          original_link: {
            options: {
              attributes: {
                class: '',
              },
            },
          },
          in_active_trail: false,
        },
      ],
    },
    {
      id: 'contact',
      title: 'Contact',
      url: '#0',
      original_link: {
        options: {
          attributes: {
            class: '',
          },
        },
      },
      in_active_trail: false,
    },
  ],
} satisfies Partial<DropdownProps>;

export default dropdownArgs;
