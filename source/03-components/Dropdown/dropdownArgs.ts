import { DropdownProps } from './Dropdown';

const dropdownArgs = {
  items: [
    {
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
  disabled: false,
} satisfies Partial<DropdownProps>;

export default dropdownArgs;
