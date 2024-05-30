import type { Meta, StoryObj } from '@storybook/react';
import { AuthenticatedLayout } from './index';

import { WithStore } from '@doc-blocks/with-store';

const meta: Meta<typeof AuthenticatedLayout> = {
  component: AuthenticatedLayout,
  argTypes: {
    title: {
      type: 'string'
    }
  },
  parameters: {
    overflow: 'hide-both'
  },
  decorators: [
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

type Story = StoryObj<typeof AuthenticatedLayout>;

export const Default: Story = {
  args: {
    children: 'Hello World'
  }
};
