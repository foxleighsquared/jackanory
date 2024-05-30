import { useState } from 'react';
import styles from '../styles.module.scss';
import { Button, Icon, Tooltip } from 'components';

import type { IconTypes } from 'components/flourishes/icon';
import type Announcement from 'lib/types/announcement';

type Props = {
  /**
   * An array of announcements to display
   */
  announcements: Announcement[];
  /**
   * An optional action to take when a announcement is dismissed
   */
  onDismiss?: (announcement: Announcement) => void;
};

export const Announcements: React.FC<Props> = ({
  announcements,
  onDismiss
}: Props) => {
  const [announcementsList, setAnnouncementsList] =
    useState<Announcement[]>(announcements);

  const handleDismiss = (announcement: Announcement) => {
    setAnnouncementsList(
      announcementsList.filter((n: Announcement) => n.id !== announcement.id)
    );
    onDismiss?.(announcement);
  };

  return (
    <ul className={styles['announcements']} data-testid="announcements">
      {announcementsList.map((announcement: Announcement) => {
        const stateString =
          announcement.status === 'danger' ? 'error' : announcement.status;
        return (
          <li
            data-testid="announcement"
            key={announcement.id}
            className={styles[`status-${stateString}`]}
          >
            <div className={styles['message']} role="alert" aria-live="polite">
              <Icon use={stateString as IconTypes} />
              {typeof announcement.message === 'string' ? (
                <p>{announcement.message}</p>
              ) : (
                announcement.message
              )}
              <Tooltip content="Dismiss announcement" placement="left">
                <Button
                  className={styles['dismiss-button']}
                  transparent
                  hideLabel
                  small
                  icon="close"
                  label="dismiss announcement"
                  onClick={() => {
                    handleDismiss(announcement);
                  }}
                />
              </Tooltip>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Announcements;
