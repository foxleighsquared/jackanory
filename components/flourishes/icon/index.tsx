import React from 'react';
import icons from './components';

export type IconTypes = keyof typeof icons;

interface Props extends React.ComponentProps<'svg'> {
  /**
   * The name of the icon to render from the icons library
   */
  use: IconTypes;
  /**
   * The size of the icon in (defaults to 50px)
   * @default 50
   */
  size?: number | string;
  /**
   * The default fill color of the icon (defaults to 'currentColor')
   * @default 'currentColor'
   * @see https://css-tricks.com/cascading-svg-fill-color/
   */
  fill?: string;
}

// A react component that will take a name prop and return the correct icon
export const Icon = ({
  use,
  size = 50,
  fill = 'currentColor',
  ...props
}: Props) => {
  const Icon = icons[use];
  return <Icon fill={fill} width={size} {...props} />;
};

Icon.displayName = 'Icon';

export default Icon;
