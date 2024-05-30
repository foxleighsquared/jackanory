import classNames from 'classnames';
import React, { useState, useEffect } from 'react';

import { Navigation } from './components/navigation';
import { BrandBar } from './components/brand-bar';
import { MetaLinks } from './components/meta-links';
import { Announcements } from './components/announcements';

/* Import Stylesheet */
import styles from './styles.module.scss';

import type User from 'lib/types/user';
import type LinkObject from 'lib/types/link-object';
import type { Announcement } from 'lib/types/announcement';

export interface Props extends React.HTMLAttributes<HTMLElement> {
  /**
   * The name of the application
   */
  appName: string;
  /**
   * The current user
   */
  user: User;
  /**
   * The link for the help button
   */
  helpLink?: string;
  /**
   * Show the accessibility statement link (navigates to /accessibility-statement)
   */
  showAccessiblityStatement?: boolean;
  /**
   * Optional navigation to display in the header.
   * @default 'a'
   */
  navigation?: LinkObject[];
  /**
   * The current path to display active links if navigation is provided.
   */
  currentPath?: string;
  /**
   * The alignment of the header. Defaults to full-width.
   */
  alignment?: 'center' | 'full-width';
  /**
   * The currently set theme
   */
  currentTheme: string;
  /**
   * Announcement banners to display in the header
   */
  announcements?: Announcement[];
  /**
   * An optional action to perform when a announcement is dismissed
   */
  onAnnouncementDismiss?: (announcement: Announcement) => void;
  /**
   * Switch theme function
   */
  switchTheme: (theme: string) => void;
}

const cx = classNames.bind(styles);

/**
 * The Masthead component is the bar which sits at
 * the top of the page and contains the page logo
 * and all primary navigation links
 */
export const Masthead: React.FC<Props> = ({
  appName,
  user,
  helpLink,
  className,
  navigation,
  currentPath,
  alignment = 'full-width',
  currentTheme,
  announcements,
  onAnnouncementDismiss,
  switchTheme,
  ...props
}: Props) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(currentTheme);

  useEffect(() => {
    setTheme(currentTheme);
  }, [currentTheme]);

  /**
   * Global header links
   */
  const headerLinks = [
    {
      text: 'Help',
      href: helpLink ?? '/help'
    },
    {
      text: 'Logout',
      href: '/auth/logout'
    }
  ];

  return (
    <header
      role="banner"
      className={cx(
        styles['masthead'],
        className,
        styles[alignment],
        navigation && styles['with-navigation'],
        menuOpen ? styles['menu-open'] : styles['menu-closed']
      )}
      data-testid="masthead"
      {...props}
    >
      <div className={styles['inner']}>
        <MetaLinks
          links={headerLinks}
          theme={theme}
          switchTheme={switchTheme}
        />
        {announcements && announcements.length > 0 && (
          <Announcements
            announcements={announcements}
            onDismiss={onAnnouncementDismiss}
          />
        )}
        <BrandBar
          appName={appName}
          user={user}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />
        {navigation && (
          <Navigation currentPath={currentPath} navigation={navigation} />
        )}
      </div>
    </header>
  );
};

export default Masthead;
