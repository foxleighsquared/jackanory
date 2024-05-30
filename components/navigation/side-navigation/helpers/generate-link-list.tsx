import React from 'react';
import classNames from 'classnames';
import Icon from 'components/flourishes/icon';

import styles from '../styles.module.scss';

const cx = classNames.bind(styles);

import Link from '../types/link';

export const generateLinkList = (links: Link[], level = 0): JSX.Element => {
  if (level > 2) {
    console.warn('SideNavigation: Supported nested depth exceeded.');
  }
  return (
    <ul className={cx(styles['link-list'], styles[`list-level-${level}`])}>
      {links.map((link) => {
        const hasChildren = link.links?.length;
        return (
          <li
            className={cx(
              styles[`link-row`],
              hasChildren && styles['has-children']
            )}
            key={link.label}
          >
            <a href={link.url} className={styles['link-item']}>
              {link.label}
              {hasChildren && (
                <Icon use="chevron" className={styles['arrow']} />
              )}
            </a>
            {link.links &&
              link.links.length > 0 &&
              generateLinkList(link.links, level + 1)}
          </li>
        );
      })}
    </ul>
  );
};

export default generateLinkList;
