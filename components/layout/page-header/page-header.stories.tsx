import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

// Import component files
import { PageHeader } from 'components';

const meta: Meta<typeof PageHeader> = {
  component: PageHeader,
  tags: ['autodocs'],
  args: {
    title: 'Coffee recipes'
  },
  parameters: {
    previewLayout: 'vertical'
  }
};

export default meta;

type Story = StoryObj<typeof PageHeader>;

const subtitle = 'This is my really important list of recipes';

const actions = [
  {
    variant: 'primary',
    transparent: true,
    onClick: action('Filter coffee'),
    label: 'Filter coffee'
  },
  {
    variant: 'primary',
    onClick: action('Create coffee'),
    label: 'Create coffee'
  }
];

const tabs = [
  {
    contentId: 'all-recipes',
    label: 'All recipes'
  },
  {
    contentId: 'favourites',
    label: 'Favourites'
  }
];

const breadcrumbs = [
  {
    label: 'Home',
    href: '#'
  },
  {
    label: 'Recipes',
    href: '#',
    current: true
  }
];

export const Default: Story = {};

export const FullWidth: Story = {
  args: {
    alignment: 'full-width'
  }
};

export const Centred: Story = {
  args: {
    alignment: 'center'
  }
};

export const WithSubtitle: Story = {
  args: {
    subtitle
  }
};

export const WithActions: Story = {
  args: {
    actions
  }
};

export const WithTabs: Story = {
  args: {
    subtitle,
    tabs: {
      selectedTab: 0,
      handleChange: action('Tab changed'),
      tabs
    },
    actions
  }
};

export const WithBreadcrumbs: Story = {
  args: {
    subtitle,
    breadcrumbs,
    actions
  }
};

export const WithTabsAndBreadcrumbs: Story = {
  args: {
    subtitle,
    tabs: {
      selectedTab: 0,
      handleChange: action('Tab changed'),
      tabs
    },
    breadcrumbs
  }
};

export const WithEverything: Story = {
  args: {
    subtitle,
    tabs: {
      selectedTab: 0,
      handleChange: action('Tab changed'),
      tabs
    },
    breadcrumbs,
    actions
  }
};
