import React from 'react';
import classNames from 'classnames';
import { changeCase } from 'lib/helpers';

/** Import custom types */
import InputComponent from 'lib/types/input-component';

type Props = InputComponent;

/* Import Stylesheet */
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

/**
 * The `Checkbox` component is a simple checkbox input with a label.
 */
export const Checkbox: React.FC<Props> = ({
  id,
  name,
  checked,
  disabled,
  className,
  status,
  value,
  ...props
}: Props) => {
  if (!id && !name) {
    throw new Error(
      'Inputs must have either an id or name prop to be accessible'
    );
  }

  return (
    <span className={cx(styles['icon-container'])}>
      <input
        id={id || changeCase(name, 'kebab')}
        data-testid={id || changeCase(name, 'kebab')}
        name={name}
        type="checkbox"
        className={cx(
          styles['input'],
          status && styles[`status-${status}`],
          className
        )}
        defaultChecked={checked}
        disabled={disabled}
        defaultValue={value}
        {...props}
      />
    </span>
  );
};

Checkbox.displayName = 'Checkbox';

export default Checkbox;
