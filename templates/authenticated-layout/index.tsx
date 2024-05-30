import React, { PropsWithChildren, useEffect, useState } from 'react';
import { Masthead } from 'components';
import { BaseLayout } from 'templates/base-layout';
import { useTheme } from 'next-themes';
import { useAuth } from 'lib/providers/auth';

import config from 'app-config';

/* Import Styles */
import styles from './styles.module.scss';

import User from 'lib/types/user';
import { useSiteStatus } from 'lib/providers/site-status';
import { Announcement } from 'lib/types/announcement';

interface Props extends PropsWithChildren {
  /**
   * The title of the page to be displayed in the browser tab
   */
  title?: string;
}

/**
 *  The base layout template is used to wrap all pages with a consistent layout
 *  if a different template is required for a page, it should extend this template
 */
export const AuthenticatedLayout: React.FC<Props> = ({
  title,
  children
}: Props) => {
  const { theme, setTheme } = useTheme();
  const { user }: { user: User } = useAuth();
  const { siteStatus } = useSiteStatus();
  const [announcementsList, setAnnouncementsList] = useState<Announcement[]>();

  useEffect(() => {
    const { status, message } = siteStatus;
    const announcements = [];
    const dismissedAnnouncements = sessionStorage.getItem(
      'dismissed-announcements'
    );
    const dismissedList = dismissedAnnouncements
      ? JSON.parse(dismissedAnnouncements)
      : [];

    if (status && status !== 'success') {
      announcements.push({
        id: 'site-status',
        status,
        message
      });
    }
    if (config.announcements?.length > 0) {
      announcements.push(...config.announcements);
    }

    if (dismissedList.length > 0) {
      const filteredAnnouncements = announcements.filter(
        (announcement) =>
          !dismissedList.find(
            (dismissed: Announcement) => dismissed.id === announcement.id
          )
      );
      setAnnouncementsList(filteredAnnouncements);
      return;
    }
    setAnnouncementsList(announcements);
  }, [siteStatus, config.announcements]);

  const handleDismissAnnouncement = (announcement: Announcement) => {
    const dismissedAnnouncements = sessionStorage.getItem(
      'dismissed-announcements'
    );
    const dismissedList = dismissedAnnouncements
      ? JSON.parse(dismissedAnnouncements)
      : [];
    sessionStorage.setItem(
      'dismissed-announcements',
      JSON.stringify([...dismissedList, announcement])
    );
  };

  return (
    <>
      <BaseLayout title={title}>
        <Masthead
          appName={config.appName}
          user={user}
          navigation={config.appLinks}
          currentTheme={theme ?? 'light'}
          switchTheme={setTheme}
          announcements={announcementsList}
          onAnnouncementDismiss={handleDismissAnnouncement}
        />
        <main className={styles['app-container']} id="maincontent">
          {children}
        </main>
      </BaseLayout>
    </>
  );
};

export default AuthenticatedLayout;
