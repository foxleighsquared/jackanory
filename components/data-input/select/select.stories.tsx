import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Label, Select } from 'components';

import options from 'lib/mocks/options';

const meta: Meta<typeof Select> = {
  component: Select,
  args: {
    name: 'select',
    options: options,
    placeholder: 'Select...',
    onChange: (e) => action('Selected option:')(e.target.value)
  },
  argTypes: {
    options: {
      control: {
        type: 'object'
      }
    }
  },
  tags: ['autodocs'],
  parameters: {
    worksWith: 'InputFactory'
  },
  decorators: [
    (Story) => (
      <Label text="Label for the input" id="select">
        <Story />
      </Label>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {};

export const MultiSelect: Story = {
  args: {
    multiple: true
  }
};

export const DefaultSelected: Story = {
  args: {
    value: options[2].value
  }
};

export const DisabledSelected: Story = {
  args: {
    value: options[0].value,
    disabled: true
  }
};
