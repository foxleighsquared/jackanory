import React, { useState, useEffect } from 'react';

// If you are looking for the styles, these is a decorator block so the styles are in ../preview-head.html

// Prop Types
export interface Props extends React.ComponentProps<'div'> {
  /**
   * The theme name
   * @default 'light';
   */
  theme?: 'light' | 'dark';
  /**
   * Is the theme being used in docs mode?
   * @default false;
   */
  docsMode?: boolean;
  /**
   * Show overflow on the theme block
   * @default 'show';
   */
  overflow?: 'hide-both' | 'hide-x' | 'hide-y' | 'show';
  /**
   * Reload the page when the theme changes?
   * @default false;
   */
  reloadOnChange?: boolean;
}

// Render component
export const ThemeBlock: React.FC<Props> = ({
  theme = 'light',
  docsMode = false,
  overflow = 'show',
  reloadOnChange = false,
  children
}: Props) => {
  const [themeState, setThemeState] = useState(theme);
  const [prevTheme, setPrevTheme] = useState(theme);

  useEffect(() => {
    setThemeState(theme);
    if (reloadOnChange && prevTheme !== theme) {
      window.location.reload();
      setPrevTheme(theme);
    }
  }, [theme]);

  return (
    <div
      className={`theme-block theme-block-${themeState} theme-block-overflow-${overflow} ${
        docsMode ? 'theme-block-docs' : ''
      }`}
      data-theme={themeState}
    >
      <div>{children}</div>
    </div>
  );
};

export default ThemeBlock;
