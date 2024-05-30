import React from 'react';
import classNames from 'classnames';

/* Import Stylesheet */
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

/* Prop Types */
export interface Props extends React.ComponentProps<'td'> {
  /**
   * Forces the cell to output a 'th' instead of a 'td'
   */
  th?: boolean;
  /**
   * Specify the heading the cell should display in responsive mode
   */
  contextHeading?: string;
}

/**
 * The 'TableCell' component is a component that is used to display a cell in a table.
 */
export const TableCell: React.FC<Props> = ({
  className,
  children,
  th,
  contextHeading,
  ...props
}: Props) => {
  const TagChooser = th ? 'th' : 'td';

  return (
    <TagChooser
      className={cx(
        styles['table-cell'],
        th && styles['th'],
        contextHeading && styles['with-context'],
        className
      )}
      {...(contextHeading && { 'data-heading': contextHeading })}
      {...props}
    >
      {children}
    </TagChooser>
  );
};

TableCell.displayName = 'TableCell';

export default TableCell;
