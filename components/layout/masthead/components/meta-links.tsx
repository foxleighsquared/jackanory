import Link from 'next/link';

import styles from '../styles.module.scss';
import { Button } from 'components';

type Props = {
  /**
   * The header links
   */
  links: {
    text: string;
    href: string;
  }[];
  /**
   * The currently set theme
   */
  theme: string;
  /**
   * The theme switcher function
   */
  switchTheme: (theme: string) => void;
};

export const MetaLinks: React.FC<Props> = ({
  links,
  theme,
  switchTheme
}: Props) => {
  return (
    <ul className={styles['meta-links']}>
      {links.map((link) => (
        <li key={link.text}>
          <Link href={link.href}>{link.text}</Link>
        </li>
      ))}
      <li className={styles['theme-switch-button']}>
        <Button
          data-testid="theme-switcher"
          hideLabel
          variant="secondary"
          label={
            theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'
          }
          small
          icon={theme === 'light' ? 'moon' : 'sun'}
          onClick={() => switchTheme(theme === 'light' ? 'dark' : 'light')}
        />
      </li>
    </ul>
  );
};

export default MetaLinks;
