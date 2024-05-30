import React from 'react';
import classNames from 'classnames';

export interface Props extends React.ComponentProps<'section'> {
  /**
   * The colour of the note.
   * @default 'clear'
   */
  colour?: 'yellow' | 'green' | 'red' | 'blue' | 'clear';
  /**
   * Should the note be centered?
   * @default false
   */
  centered?: boolean;
}

/* Import Stylesheet */
import styles from './styles.module.scss';

// Allows for multiple classes on one element
const cx = classNames.bind(styles);

/**
 * NoteBlock is a component that is used to display a note to the user. The contents of the note can be any valid React node.
 */
const NoteBlock: React.FC<Props> = ({
  children,
  className,
  colour = 'clear',
  centered = false,
  ...props
}: Props) => (
  <section
    className={cx(
      styles['note-block'],
      styles[colour || 'clear'],
      centered && styles['centered'],
      className
    )}
    role="note"
    {...props}
  >
    {children}
  </section>
);

export default NoteBlock;
