import type { Meta, StoryObj } from '@storybook/react';

import NoteBlock from './index';

const meta: Meta<typeof NoteBlock> = {
  component: NoteBlock,
  parameters: {
    previewLayout: 'vertical'
  },
  args: {
    children: (
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
      </p>
    )
  },
  argTypes: {
    colour: {
      control: {
        type: 'select'
      },
      options: ['yellow', 'green', 'red', 'blue', 'clear']
    },
    centered: {
      control: {
        type: 'boolean'
      }
    }
  }
};

export default meta;

type Story = StoryObj<typeof NoteBlock>;

export const Default: Story = {};

export const YellowNote: Story = {
  args: {
    colour: 'yellow'
  }
};

export const GreenNote: Story = {
  args: {
    colour: 'green'
  }
};

export const RedNote: Story = {
  args: {
    colour: 'red'
  }
};

export const BlueNote: Story = {
  args: {
    colour: 'blue'
  }
};

export const CenteredNote: Story = {
  args: {
    centered: true
  }
};
