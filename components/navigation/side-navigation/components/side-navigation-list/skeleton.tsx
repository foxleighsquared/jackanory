import React from 'react';

/* Import Components */

import SideNavigationItem from '../side-navigation-item';

/* Import Stylesheet */
import styles from './styles.module.scss';

/**
 * Props
 */
export interface Props {
  /**
   * The number of rows to render in the loading skeleton.
   * @default 3
   */
  rows?: number;
}

/* Render component */
export const SideNavigationListSkeleton: React.FC<Props> = ({
  rows
}: Props) => {
  return (
    <ul className={styles['skeleton-loader']}>
      {Array.from(Array(rows)).map((link, index) => {
        return (
          <SideNavigationItem
            LinkComponent="a"
            key={`${link}-${index}`}
            link={{
              label: 'Loading navigation...',
              url: '#'
            }}
            level={0}
            skeleton={true}
          />
        );
      })}
    </ul>
  );
};

export default SideNavigationListSkeleton;
