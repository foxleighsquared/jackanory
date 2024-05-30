import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import DataEntity from './index';

const attributes = [
  {
    label: 'Drink name',
    value: 'Grande Frappé'
  },
  {
    label: 'Cost',
    value: '£3.80'
  },
  {
    label: 'Order date',
    value: '8 Apr 22 14:17'
  },
  {
    label: 'Temperature',
    value: '80°C'
  }
];

const meta: Meta<typeof DataEntity> = {
  component: DataEntity,
  parameters: {
    previewLayout: 'vertical'
  },
  args: {
    attributes,
    title: 'Order details'
  },
  argTypes: {
    layout: {
      options: ['vertical', 'horizontal']
    }
  },
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof DataEntity>;

export const Default: Story = {};

export const Vertical: Story = {
  args: {
    layout: 'vertical'
  }
};

export const Horizontal: Story = {
  args: {
    layout: 'horizontal'
  }
};

export const WithTitle: Story = {
  args: {
    title: 'Order details'
  },
  play: async ({ canvasElement, step }) => {
    const title = within(canvasElement).getByTestId('data-entity-title');
    const list = within(canvasElement).getByTestId('data-entity-list');

    await step('Title is rendered', () => {
      expect(title).toHaveTextContent('Order details');
    });

    await step('List is rendered with correct data', () => {
      const attributeValues = within(list).getAllByTestId('data-entity-value');
      const attributeLabels = within(list).getAllByTestId('data-entity-label');

      for (let i = 0; i < attributes.length; i++) {
        expect(attributeValues[i]).toHaveTextContent(attributes[i].value);
        expect(attributeLabels[i]).toHaveTextContent(attributes[i].label);
      }
    });
  }
};

export const WithoutTitle: Story = {
  args: {
    title: undefined
  }
};
