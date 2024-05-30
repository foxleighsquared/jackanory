import type { Meta, StoryObj } from '@storybook/react';
import { Label, File } from 'components';

const meta: Meta<typeof File> = {
  component: File,
  args: {
    name: 'file'
  },
  argTypes: {
    onChange: { action: 'onChange' }
  },
  tags: ['autodocs'],
  parameters: {
    worksWith: 'InputFactory'
  },
  decorators: [
    (Story) => (
      <Label text="Label for the input" id="file">
        <Story />
      </Label>
    )
  ]
};

export default meta;

type Story = StoryObj<typeof File>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true
  }
};

export const ReadOnly: Story = {
  args: {
    readOnly: true
  }
};
