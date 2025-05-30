import DropdownContext from '@/source/03-components/Dropdown/DropdownContext';
import clsx from 'clsx';
import { GessoComponent } from 'gesso';
import {
  FocusEventHandler,
  JSX,
  KeyboardEventHandler,
  PropsWithChildren,
  MouseEvent as ReactMouseEvent,
  useContext,
} from 'react';
import type { DropdownMenuItem } from './Dropdown';
import styles from './dropdown.module.css';

interface DropdownItemProps extends GessoComponent {
  item: DropdownMenuItem;
  isChild?: boolean;
  isExpanded: boolean;
  useArrowKeys?: boolean;
  onItemClick: (itemId: string | number, event: ReactMouseEvent) => void;
  onKeyDown?: KeyboardEventHandler;
  onBlur: FocusEventHandler<HTMLAnchorElement | HTMLButtonElement>;
}

interface DropdownItemWrapperProps
  extends Pick<DropdownItemProps, 'modifierClasses' | 'isExpanded'> {
  hasChildren?: boolean;
  isInActiveTrail?: boolean;
}

function DropdownItemWrapper({
  modifierClasses,
  hasChildren,
  isExpanded,
  isInActiveTrail,
  children,
}: PropsWithChildren<DropdownItemWrapperProps>): JSX.Element {
  return (
    <li
      className={clsx(styles.item, modifierClasses, {
        [styles['has-subnav']]: hasChildren,
        [styles['item--expanded']]: isExpanded,
        [styles['item--active-trail']]: isInActiveTrail,
      })}
    >
      {children}
    </li>
  );
}

type DropdownLinkProps = Pick<
  DropdownItemProps,
  'useArrowKeys' | 'onKeyDown' | 'onBlur'
> &
  Pick<DropdownMenuItem, 'url' | 'id' | 'title'>;

interface DropdownMenubarLinkProps
  extends DropdownItemWrapperProps,
    DropdownLinkProps {}

function DropdownMenubarLink({
  modifierClasses,
  useArrowKeys,
  onKeyDown,
  onBlur,
  url,
  id,
  title,
  isExpanded,
}: DropdownMenubarLinkProps): JSX.Element {
  return (
    <DropdownItemWrapper
      modifierClasses={modifierClasses}
      isExpanded={isExpanded}
    >
      <a
        href={url}
        className={styles.link}
        data-id={id}
        onKeyDown={useArrowKeys ? onKeyDown : undefined}
        onBlur={onBlur}
      >
        {title}
      </a>
    </DropdownItemWrapper>
  );
}

type DropdownMenubarButtonProps = DropdownItemWrapperProps &
  Pick<DropdownMenuItem, 'id' | 'title' | 'below'> &
  Pick<
    DropdownItemProps,
    'useArrowKeys' | 'onKeyDown' | 'onBlur' | 'onItemClick'
  >;

function DropdownMenuBarButton({
  modifierClasses,
  isExpanded,
  id,
  useArrowKeys,
  onKeyDown,
  onBlur,
  title,
  isInActiveTrail,
  onItemClick,
  below,
}: DropdownMenubarButtonProps): JSX.Element {
  const expandedItems = useContext(DropdownContext);

  return (
    <DropdownItemWrapper
      key={id}
      modifierClasses={modifierClasses}
      hasChildren={true}
      isExpanded={isExpanded}
      isInActiveTrail={isInActiveTrail}
    >
      <button
        type="button"
        className={clsx(styles.link, styles['has-subnav'])}
        onClick={e => onItemClick(id, e)}
        aria-expanded={isExpanded}
        aria-haspopup="true"
        data-id={id}
        onKeyDown={useArrowKeys ? onKeyDown : undefined}
        onBlur={onBlur}
      >
        {title}
      </button>
      {isExpanded && below?.length && (
        <ul className={styles.submenu}>
          {below.map(child => (
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            <DropdownItem
              key={child.id}
              item={child}
              isChild={true}
              isExpanded={expandedItems[child.id] || false}
              useArrowKeys={useArrowKeys}
              onItemClick={onItemClick}
              onKeyDown={onKeyDown}
              onBlur={onBlur}
            />
          ))}
        </ul>
      )}
    </DropdownItemWrapper>
  );
}

type PopupMenuLinkProps = DropdownLinkProps & DropdownItemWrapperProps;

function PopupMenuLink({
  url,
  hasChildren,
  id,
  useArrowKeys,
  onKeyDown,
  onBlur,
  title,
}: PopupMenuLinkProps): JSX.Element {
  return (
    <a
      href={url}
      className={clsx(styles.link, {
        [styles['has-subnav']]: hasChildren,
      })}
      data-id={id}
      onKeyDown={useArrowKeys ? onKeyDown : undefined}
      onBlur={onBlur}
    >
      {title}
    </a>
  );
}

type PopupMenuWithSubmenuProps = DropdownItemWrapperProps &
  PopupMenuLinkProps &
  DropdownMenubarButtonProps;

function PopupMenuWithSubmenu({
  id,
  modifierClasses,
  isExpanded,
  url,
  onBlur,
  onKeyDown,
  useArrowKeys,
  title,
  onItemClick,
  below,
  isInActiveTrail,
}: PopupMenuWithSubmenuProps): JSX.Element {
  const expandedItems = useContext(DropdownContext);

  return (
    <DropdownItemWrapper
      key={id}
      modifierClasses={modifierClasses}
      hasChildren={true}
      isExpanded={isExpanded}
      isInActiveTrail={isInActiveTrail}
    >
      <PopupMenuLink
        url={url}
        hasChildren={true}
        id={id}
        onKeyDown={onKeyDown}
        useArrowKeys={useArrowKeys}
        onBlur={onBlur}
        title={title}
        isExpanded={isExpanded}
      />
      <button
        type="button"
        className={styles['subnav-toggle']}
        onClick={e => onItemClick(id, e)}
        aria-expanded={isExpanded}
        aria-label={`Toggle ${title} submenu`}
        onBlur={onBlur}
      />
      {isExpanded && below?.length && (
        <ul className={clsx(styles.submenu, styles['submenu--nested'])}>
          {below.map(child => (
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            <DropdownItem
              key={child.id}
              item={child}
              isChild={true}
              isExpanded={expandedItems[child.id] || false}
              useArrowKeys={useArrowKeys}
              onItemClick={onItemClick}
              onKeyDown={onKeyDown}
              onBlur={onBlur}
            />
          ))}
        </ul>
      )}
    </DropdownItemWrapper>
  );
}

/**
 * DropdownMenuItem component
 */
function DropdownItem({
  item,
  isChild = false,
  isExpanded,
  useArrowKeys,
  onItemClick,
  onKeyDown,
  onBlur,
  modifierClasses,
}: DropdownItemProps): JSX.Element {
  const { id, title, url } = item;

  const hasChildren = item.below?.length && item.below.length > 0;
  const isInActiveTrail = item.in_active_trail || false;

  // For top-level items without children, render as links
  if (!hasChildren && !isChild && url) {
    return (
      <DropdownMenubarLink
        key={id}
        modifierClasses={modifierClasses}
        useArrowKeys={useArrowKeys}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        url={url}
        id={id}
        title={title}
        isExpanded={false}
      />
    );
  }

  // For top-level items with children, render as buttons
  if (hasChildren && !isChild) {
    return (
      <DropdownMenuBarButton
        key={id}
        modifierClasses={modifierClasses}
        useArrowKeys={useArrowKeys}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        onItemClick={onItemClick}
        isExpanded={isExpanded}
        id={id}
        title={title}
        isInActiveTrail={isInActiveTrail}
        below={item.below}
      />
    );
  }

  // For child items with children, render as link + button
  if (isChild && hasChildren) {
    return (
      <PopupMenuWithSubmenu
        key={id}
        url={url}
        below={item.below}
        id={id}
        onKeyDown={onKeyDown}
        useArrowKeys={useArrowKeys}
        onBlur={onBlur}
        title={title}
        isExpanded={isExpanded}
        onItemClick={onItemClick}
      />
    );
  }

  // For child items without children, render as links
  if (isChild && !hasChildren) {
    return (
      <DropdownItemWrapper
        key={id}
        modifierClasses={modifierClasses}
        hasChildren={false}
        isExpanded={isExpanded}
        isInActiveTrail={isInActiveTrail}
      >
        <PopupMenuLink
          url={url}
          hasChildren={false}
          id={id}
          onKeyDown={onKeyDown}
          useArrowKeys={useArrowKeys}
          onBlur={onBlur}
          title={title}
          isExpanded={false}
        />
      </DropdownItemWrapper>
    );
  }

  // Fallback for any other case
  return (
    <DropdownItemWrapper
      key={id}
      modifierClasses={modifierClasses}
      hasChildren={false}
      isExpanded={isExpanded}
      isInActiveTrail={isInActiveTrail}
    >
      {title}
    </DropdownItemWrapper>
  );
}

export default DropdownItem;
export type { DropdownItemProps };
