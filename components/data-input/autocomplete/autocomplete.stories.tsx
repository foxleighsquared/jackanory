import type { Meta, StoryObj } from '@storybook/react';
import { Label, Autocomplete } from 'components';

const meta: Meta<typeof Autocomplete> = {
  component: Autocomplete,
  args: {
    name: 'autocomplete',
    options: [
      'Star Trek',
      'Star Wars',
      'War of the Worlds',
      'Harry Potter',
      'Lord of the Rings',
      'The Hunger Games'
    ]
  },
  argTypes: {
    status: {
      control: {
        type: 'select',
        options: ['default', 'success', 'warning', 'danger', 'info']
      }
    }
  },
  tags: ['autodocs'],
  parameters: {
    worksWith: 'InputFactory'
  },
  decorators: [
    (Story) => (
      <Label text="Label for the input" id="autocomplete">
        <Story />
      </Label>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof Autocomplete>;

export const Default: Story = {};
