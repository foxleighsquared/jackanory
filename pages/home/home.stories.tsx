import type { Meta, StoryObj } from '@storybook/react';
import { withActions } from '@storybook/addon-actions/decorator';

import { Home } from './index';
import { WithStore } from '@doc-blocks/with-store';
const meta: Meta<typeof Home> = {
  component: Home,
  title: 'Homepage',
  parameters: {
    actions: {
      handles: ['click']
    },
    overflow: 'hide-both'
  },
  decorators: [
    //@ts-ignore - this is a 3rd party decorator
    withActions,
    (Story) => {
      return (
        <WithStore>
          <Story />
        </WithStore>
      );
    }
  ]
};

export default meta;

type Story = StoryObj<typeof Home>;

export const Default: Story = {};
