import React from 'react';

/* Import Stylesheet */
import styles from './styles.module.scss';

/* Import Components */
import SideNavigationList from './components/side-navigation-list';

/** Import skeleton loader */
import SideNavigationListSkeleton from './components/side-navigation-list/skeleton';

/*  Types */
import Link from './types/link';

interface Props {
  /**
   * The JSON data for the navigation links
   */
  links: Link[];
  /**
   * The current page path (used to determine active link)
   */
  path?: string;
  /**
   * The loading state of the navigation
   */
  loading?: boolean;
  /**
   * Skeleton row count. Optional. Specifies the number of rows to render in the loading skeleton. Max 25
   * @default 3
   */
  skeletonRowCount?: number;
  /**
   * The component used to render links.
   * @default 'a'
   */
  LinkComponent?: React.ElementType;
}

/**
 * The 'Side Navigation' component displays a list of links in a side navigation bar.
 *
 * Up to 3 levels of nesting are supported. Deeper nesting will not cause any errors
 * but it will display a warning in the console and may not look as intended.
 **/
export const SideNavigation: React.FC<Props> = ({
  path,
  links,
  loading,
  skeletonRowCount = 3,
  LinkComponent = 'a'
}: Props) => {
  return (
    <nav
      role="navigation"
      className={styles[`side-navigation${loading ? '-skeleton' : ''}`]}
    >
      {loading ? (
        <SideNavigationListSkeleton rows={skeletonRowCount} />
      ) : (
        <SideNavigationList
          LinkComponent={LinkComponent}
          links={links}
          path={path}
        />
      )}
    </nav>
  );
};

SideNavigation.displayName = 'SideNavigation';

export type { Props, Link };

export default SideNavigation;
