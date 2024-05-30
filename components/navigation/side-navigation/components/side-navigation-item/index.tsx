import React, { useState } from 'react';
import classNames from 'classnames/bind';

/* Import Stylesheet */
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

/* Import Component */
import SideNavigationList from '../side-navigation-list';

/*  Types */
import Link from 'components/navigation/side-navigation/types/link';

export interface Props extends React.HTMLAttributes<HTMLLIElement> {
  /**
   * The JSON data for the navigation links
   */
  link: Link;
  /**
   * The current navigation level
   * @default 0
   */
  level?: number;
  /**
   * Current path of the page (used to determine active link)
   */
  path?: string;
  /**
   * Is this link a skeleton?
   */
  skeleton?: boolean;
  /**
   * The component used to render a link when the `href` prop is provided.
   */
  LinkComponent: React.ElementType;
}

/* Render component */
export const SideNavigationItem: React.FC<Props> = ({
  link,
  level = 0,
  className,
  path,
  skeleton,
  LinkComponent,
  ...props
}: Props) => {
  const [collapsed, setCollapsed] = useState<boolean>(
    path !== link.url && !path?.startsWith(link.url)
  );
  const hasChildren = !!link.links?.length;

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const RenderLink = !LinkComponent ? ('a' as string) : LinkComponent;

  return (
    <li
      role="listitem"
      className={cx(
        skeleton && styles['skeleton-loader'],
        styles[`list-level-${level}`],
        hasChildren && styles['has-children'],
        hasChildren && (collapsed ? styles['collapsed'] : styles['expanded']),
        className
      )}
      {...props}
    >
      <RenderLink
        href={link.url}
        className={cx(styles['link-item'], {
          [styles['active']]: path === link.url
        })}
        onClick={hasChildren ? handleToggleCollapse : undefined}
        title={link.label}
      >
        <div className={styles['label-container']}>
          {link.icon && <span className={styles['icon']}>{link.icon}</span>}
          <span className={styles['label']}>{link.label}</span>
        </div>
        {hasChildren && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={styles['arrow']}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        )}
      </RenderLink>
      {!collapsed && (
        <SideNavigationList
          LinkComponent={LinkComponent}
          links={link.links || []}
          level={level + 1}
          path={path}
        />
      )}
    </li>
  );
};

export default SideNavigationItem;
