import React from 'react';
import classNames from 'classnames';

import styles from './styles.module.scss';

const cx = classNames.bind(styles);

export type Props = React.ComponentProps<'article'>;

/**
 * The Rich Text component displays a variety of HTML elements in a single
 * component all styled to match the design system.
 */
const RichText: React.FC<Props> = ({
  className,
  children,
  ...props
}: Props) => (
  <article className={cx(styles['rich-text'], className)} {...props}>
    {children}
  </article>
);

export default RichText;
