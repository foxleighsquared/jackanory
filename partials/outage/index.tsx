import BaseLayout from 'templates/base-layout';

import styles from './styles.module.scss';
import { Icon } from 'components';
import config from 'app-config';

type Props = {
  /**
   * The message to display to the user
   * @default 'This application is currently unavailable.'
   */
  message?: string | JSX.Element;
};

/**
 * The Outage partial shows a message to the user when the application is
 * unavailable.
 */
export const Outage = ({ message }: Props) => {
  message = message || 'This application is currently unavailable.';
  return (
    <BaseLayout title={'Application unavailable'}>
      <main className={styles['outage-page']}>
        <div className={styles['container']}>
          <div className={styles['inner']}>
            <div className={styles['logo-container']}>
              <Icon use="denied" size="100%" className={styles['denied']} />
              <Icon use="applogo" size="100%" className={styles['logo']} />
            </div>
            <div className={styles['content']}>
              <h1 className={styles['title']}>{config.appName}</h1>

              <div className={styles['message']}>
                {typeof message === 'string' ? <p>{message}</p> : message}
              </div>
            </div>
          </div>
        </div>
      </main>
    </BaseLayout>
  );
};

Outage.displayName = 'Outage';

export default Outage;
