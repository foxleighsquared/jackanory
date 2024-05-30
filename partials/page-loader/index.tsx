import React from 'react';
import classNames from 'classnames';
import { Loader } from 'components';
import BaseLayout from 'templates/base-layout';

/* Import Stylesheet */
import styles from './styles.module.scss';

export type Props = React.ComponentProps<'div'>;

const cx = classNames.bind(styles);

/**
 * The 'PageLoader' partial is used to display a full page loader when
 * loading an entire page.
 */
export const PageLoader: React.FC<Props> = ({ className }: Props) => (
  <BaseLayout title="Loading">
    <div className={cx(styles['page-loader'], className)}>
      <Loader type="spinner" variant="primary" label="Loading..." />
    </div>
  </BaseLayout>
);

export default PageLoader;
