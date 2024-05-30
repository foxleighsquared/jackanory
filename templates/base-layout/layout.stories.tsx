import type { Meta, StoryObj } from '@storybook/react';

import { BaseLayout } from './index';

const meta: Meta<typeof BaseLayout> = {
  component: BaseLayout,
  tags: ['autodocs'],
  parameters: {
    overflow: 'hide-both'
  }
};

export default meta;

type Story = StoryObj<typeof BaseLayout>;

export const Default: Story = {
  args: {
    children: <p>Page content goes here</p>
  }
};
