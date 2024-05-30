/**
 * This file contains the configuration for the front-end application.
 *
 * NOTE: You may need to restart the application for changes to take effect.
 */

import Announcement from 'lib/types/announcement';

export const appConfig = {
  /**
   * The name of the application (in sentence case)
   * @required
   */
  appName: '%SENTENCE_CASE%',
  /**
   * The description of the application (used in the <meta> tag).
   * @required
   */
  appDescription: '%APP_DESCRIPTION%',
  /**
   * The links to display in the application's masthead.
   * If no links are provided, the navigation bar will not be displayed.
   * @optional
   */
  appLinks: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' }
  ],
  /**
   * The tags to be used for invalidation of cached data.
   * @optional
   */
  storeTags: ['TestData'],
  /**
   * The link to the applications help page to be displayed in the
   * application's masthead.
   * @required
   */
  helpLink: '/help',
  /**
   * Any site announcements to be displayed in the application's masthead.
   * (Any announcements from the site-status service will be displayed first)
   * @optional
   */
  announcements: [
    {
      id: '1',
      status: 'warning',
      message:
        'You can remove this announcement by editing frontend/app-config.ts'
    }
  ]
};

export type AppConfig = {
  appName: string;
  appDescription: string;
  appLinks?: Array<{ label: string; href: string }>;
  helpLink: string;
  announcements?: Announcement[];
};

export default appConfig;
