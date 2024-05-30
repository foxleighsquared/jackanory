import React from 'react';

/* Import Components */

import SideNavigationItem from '../side-navigation-item';

/* Import Stylesheet */
import styles from './styles.module.scss';

/*  Types */
import Link from 'components/navigation/side-navigation/types/link';

export interface Props {
  /**
   * The JSON data for the navigation links
   */
  links: Link[];
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
   * The component used to render a link when the `href` prop is provided.
   */
  LinkComponent: React.ElementType;
}

/* Render component */
export const SideNavigationList: React.FC<Props> = ({
  links,
  level = 0,
  path = '',
  LinkComponent
}: Props) => {
  if (level > 2) {
    console.warn('SideNavigation: Supported nested depth exceeded.');
  }
  return (
    <ul role="list" className={styles['link-list']}>
      {links.map((link) => {
        return (
          <SideNavigationItem
            LinkComponent={LinkComponent}
            key={link.label}
            link={link}
            level={level}
            path={path}
          />
        );
      })}
    </ul>
  );
};

export default SideNavigationList;
