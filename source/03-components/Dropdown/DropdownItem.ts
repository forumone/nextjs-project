interface DropdownItem {
  readonly title: string;
  readonly url?: string;
  readonly below?: DropdownItem[];
  readonly in_active_trail?: boolean;
  readonly is_active?: boolean;
  readonly original_link?: {
    options: {
      attributes: {
        class: string;
      };
    };
  };
}

export default DropdownItem;
