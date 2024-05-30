import React from 'react';
import classNames from 'classnames';

import styles from './styles.module.scss';

const cx = classNames.bind(styles);

export interface Props extends React.HTMLAttributes<HTMLDListElement> {
  /**
   * The optional title
   */
  title?: string;
  /**
   * The attributes to render
   */
  attributes: { label: string; value: JSX.Element | string }[];
  /**
   * The layout of the data entity.
   * @default vertical
   */
  layout?: 'horizontal' | 'vertical';
}

/**
 * The data entity component is used to display a list of attributes and their values with an optional title.
 */
export const DataEntity: React.FC<Props> = ({
  attributes,
  title,
  layout = 'vertical',
  className,
  ...props
}: Props) => {
  return (
    <>
      {title && (
        <h3 data-testid="data-entity-title" className={styles['title']}>
          {title}
        </h3>
      )}
      <dl
        data-testid="data-entity-list"
        className={cx(styles['data-entity'], className)}
        {...props}
      >
        {attributes.map((attribute) => (
          <div key={attribute.label} className={styles[layout]}>
            <dt data-testid="data-entity-label" className={styles['term']}>
              {attribute.label}
            </dt>
            <dd
              data-testid="data-entity-value"
              className={styles['description']}
            >
              {attribute.value}
            </dd>
          </div>
        ))}
      </dl>
    </>
  );
};

export default DataEntity;
