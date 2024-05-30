import Link from 'next/link';

import styles from '../styles.module.scss';
import { Button, Icon } from 'components';

import type User from 'lib/types/user';

type Props = {
  /**
   * The name of the application
   */
  appName: string;
  /**
   * The current user
   */
  user: User;
  /**
   * the menu open state
   */
  menuOpen: boolean;
  /**
   * the menu open state setter
   */
  setMenuOpen: (menuOpen: boolean) => void;
};

export const BrandBar: React.FC<Props> = ({
  appName,
  user,
  menuOpen,
  setMenuOpen
}: Props) => {
  return (
    <div className={styles['brand-bar']}>
      <h1 className={styles['site-name']}>
        <Icon use="applogo" className={styles['logo']} />
        <Link href="/">{appName}</Link>
      </h1>
      <div className={styles['welcome-message']}>
        Welcome, {user.name} ({user.lsid})
      </div>
      <div className={styles['menu-toggle']}>
        <Button
          data-testid="menu-toggle"
          variant="secondary"
          label={menuOpen ? 'Close menu' : 'Open menu'}
          icon="custom"
          className={styles['menu-toggle-button']}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className={styles['burger-menu-icon']}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default BrandBar;
