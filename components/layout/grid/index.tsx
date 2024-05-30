import React from 'react';
import classNames from 'classnames';

export interface Props extends React.HTMLAttributes<HTMLElement> {
  /**
   * The DOM element to render the root of the grid as
   * can be either a div, ul, or ol
   * @default 'div'
   */
  as?: 'div' | 'ul' | 'ol';
  /**
   * The number of columns in the grid.
   * @default 4
   */
  columns?: number;
}

/* Import Stylesheet */
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

/**
 * The 'Grid' component is a component that is used to display a set of items in a collapsible manner.
 * The number of columns in the grid will automatically increase or decrease based on the screen size
 */
export const Grid: React.FC<Props> = ({
  children,
  as = 'div',
  columns = 4,
  className
}: Props) => {
  const RootNode = as;
  return (
    <RootNode
      data-testid="grid"
      data-colcount={columns}
      className={cx(
        styles['grid'],
        columns && styles[`grid-${columns}-up`],
        className
      )}
    >
      {children}
    </RootNode>
  );
};
export default Grid;
