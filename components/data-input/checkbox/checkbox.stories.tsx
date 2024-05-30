import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox, Label } from 'components';

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  args: {
    name: 'checkbox'
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
      <Label text="Checkbox" id="checkbox" position="after">
        <Story />
      </Label>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Unchecked: Story = {
  args: {
    checked: false
  }
};

export const Checked: Story = {
  args: {
    checked: true
  }
};

export const Disabled: Story = {
  args: {
    disabled: true
  }
};
