import Link from 'next/link';
import classNames from 'classnames';

import type LinkObject from 'lib/types/link-object';
import { changeCase } from 'lib/helpers';

import styles from '../styles.module.scss';

const cx = classNames.bind(styles);

type Props = {
  /**
   * The current path to display active links if navigation is provided.
   */
  currentPath?: string;
  /**
   * The navigation links
   */
  navigation: LinkObject[];
};

export const Navigation: React.FC<Props> = ({
  currentPath,
  navigation
}: Props) => {
  return (
    <div className={styles['app-links']}>
      <nav role="navigation" className={styles['navigation']}>
        <ul className={styles['list']}>
          {navigation.map((item) => (
            <li className={styles['list-item']} key={item.label}>
              <Link
                data-testid={`navigation-link-${changeCase(
                  item.label,
                  'kebab'
                )}`}
                href={item.href}
                aria-current={
                  currentPath && currentPath === item.href ? 'page' : undefined
                }
                className={cx(styles['link'], {
                  [styles['active']]:
                    currentPath &&
                    currentPath.split('/')[1] === item.href.split('/')[1]
                })}
              >
                {item.label}
                <span className={styles['active-indicator']}></span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
