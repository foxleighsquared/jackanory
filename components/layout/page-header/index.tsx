import classNames from 'classnames';
import React from 'react';

import { Button, Breadcrumbs, Tabs } from 'components';
import type { TabsType } from 'components/navigation/tabs';
import type LinkObject from 'lib/types/link-object';
import type { ButtonProps } from 'components/data-input/button';

import styles from './styles.module.scss';

// 'circular' and 'small' buttons would not be appropriate
// for this component so we remove them from the ButtonProps
type FilteredButtonProps = Omit<ButtonProps, 'circular' | 'small'>;

export interface Action extends FilteredButtonProps {
  /**
   * The label for the action.
   * (This needs to be required because it is used as a key)
   */
  label: NonNullable<FilteredButtonProps['label']>;
}

export interface Props extends React.HTMLAttributes<HTMLElement> {
  /**
   * The title of the page.
   */
  title: string;
  /**
   * The subtitle of the page.
   */
  subtitle?: string;
  /**
   * The optional actions to render.
   */
  actions?: Action[];
  /**
   * The optional tabs to render.
   */
  tabs?: TabsType;
  /**
   * The optional breadcrumbs to render.
   */
  breadcrumbs?: LinkObject[];
  /**
   * The component used to render links.
   * @default 'a'
   */
  LinkComponent?: React.ElementType;
  /**
   * The alignment of the header. Defaults to full-width.
   */
  alignment?: 'center' | 'full-width';
}

const cx = classNames.bind(styles);

/**
 * The page header provides a consistent way to show page context.
 * It can include a title, subtitle, actions, tabs, and breadcrumbs.
 */
const PageHeader: React.FC<Props> = ({
  title,
  subtitle,
  actions,
  tabs,
  breadcrumbs,
  className,
  alignment = 'full-width',
  ...props
}: Props) => {
  const withTabs = tabs && tabs.tabs.length > 0;
  const withBreadcrumbs = breadcrumbs && breadcrumbs.length > 0;

  return (
    <header className={cx(styles['page-header'], className)} {...props}>
      <div className={cx(styles['container'], styles[alignment])}>
        {withBreadcrumbs && <Breadcrumbs breadcrumbs={breadcrumbs} />}
        <div
          className={cx(styles['inner'], { [styles['with-tabs']]: withTabs })}
        >
          <div>
            <h2>{title}</h2>
            <div>{subtitle && <p>{subtitle}</p>}</div>
          </div>
          <div className={styles['actions']}>
            {actions?.map((action) => (
              // @ts-ignore - Ref is not used here so we can ignore this error
              <Button key={`${action.label}`} {...action} />
            ))}
          </div>
        </div>
        {withTabs && <Tabs tabs={tabs.tabs} handleChange={tabs.handleChange} />}
      </div>
    </header>
  );
};

export default PageHeader;
