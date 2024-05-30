import { useState, useEffect } from 'react';
import classNames from 'classnames';
/* Import Stylesheet */
import styles from './styles.module.scss';

export type Tab = {
  /**
   * The label on the tab.
   */
  label: string;
  /**
   * The ID of the corresponding content container.
   */
  contentId: string;
};

export type TabsType = {
  /**
   * The index of the currently selected tab.
   * Used to control the component externally.
   * @default 0
   */
  selectedTab?: number;
  /**
   * The tabs to display;
   */
  tabs: Tab[];
  /**
   * Handler called when the tab is changed.
   */
  handleChange?: (tabIndex: number) => void;
};

export interface Props extends React.HTMLAttributes<HTMLElement>, TabsType {}

const cx = classNames.bind(styles);

/**
 * The breadcrumbs component provides a list of links to help users navigate through a tree structure.
 */
const Tabs: React.FC<Props> = ({
  tabs,
  selectedTab = 0,
  handleChange,
  className,
  ...props
}: Props) => {
  const [activeTab, setActiveTab] = useState(selectedTab);

  const handleTabChange = (tabIndex: number) => {
    setActiveTab(tabIndex);
    handleChange && handleChange(tabIndex);
  };

  useEffect(() => {
    setActiveTab(selectedTab);
  }, [selectedTab]);

  return (
    <div className={cx(styles['tabs'], className)} role="tablist" {...props}>
      {tabs.map((tab, index) => {
        const isActive = index === activeTab;
        return (
          <button
            className={cx(styles['tab'], {
              [styles['active']]: isActive
            })}
            key={tab.contentId}
            role="tab"
            onClick={() => handleTabChange(index)}
            aria-selected={isActive}
          >
            {tab.label}
            {isActive && <span className={styles['active-indicator']} />}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
