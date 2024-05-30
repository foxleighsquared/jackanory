import React, { useState, useRef, useId } from 'react';
import classNames from 'classnames';

/* Import Stylesheet */
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

/** Import custom types */
import InputComponent from 'lib/types/input-component';

export interface Props extends InputComponent {
  /**
   * The text for the 'on' and 'off' states (The 'on' value is also used for the value of the input when checked if no value is provided)
   * @default {
   * on: 'On',
   * off: 'Off'
   * }
   */
  stateText?: {
    on: string;
    off: string;
  };
  /**
   * The text for the 'inactive' state
   * @default 'Off'
   */
  inactiveText?: string;
}

/* Render component */
export const ToggleSwitch: React.FC<Props> = ({
  name,
  id,
  stateText = {
    on: 'On',
    off: 'Off'
  },
  checked,
  disabled,
  readOnly,
  className,
  onFocus,
  onBlur,
  onChange,
  ...props
}: Props) => {
  const [focused, setFocused] = useState(false);
  const [isChecked, setIsChecked] = useState(checked || false);

  const inputRef = useRef<HTMLInputElement>(null);

  function handleOnFocus(e: React.FocusEvent<HTMLInputElement>) {
    setFocused(true);
    onFocus?.(e);
  }

  function handleOnBlur(e: React.FocusEvent<HTMLInputElement>) {
    setFocused(false);
    onBlur?.(e);
  }

  function simulateClick() {
    if (disabled || readOnly) return;
    inputRef?.current?.click();
  }

  function handleInputKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      simulateClick();
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setIsChecked(e.target.checked);
    onChange?.(e);
  }

  const reactID = useId();
  const ID = id || reactID;

  return (
    <div
      data-testid={`${ID}-label`}
      tabIndex={0}
      onKeyDown={handleInputKeyDown}
      onClick={simulateClick}
      className={cx(
        styles['toggle-switch'],
        {
          [styles['focused']]: focused,
          [styles['disabled']]: disabled,
          [styles['readonly']]: readOnly
        },
        className
      )}
    >
      <>
        <input
          className={styles['real-input']}
          ref={inputRef}
          {...props}
          name={name}
          id={ID}
          data-testid={`${ID}-input`}
          checked={isChecked}
          disabled={disabled}
          readOnly={readOnly}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          onChange={handleInputChange}
        />
        <div className={styles['switch']}>
          <span className={styles['inner']} />
        </div>
        <span className={styles['text']}>
          {stateText[isChecked ? 'on' : 'off'] || stateText.on}
        </span>
      </>
    </div>
  );
};

ToggleSwitch.defaultProps = {
  type: 'checkbox'
};

ToggleSwitch.displayName = 'ToggleSwitch';

export default ToggleSwitch;
