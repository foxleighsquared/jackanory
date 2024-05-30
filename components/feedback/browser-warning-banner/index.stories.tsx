import type { Meta, StoryObj } from '@storybook/react';

// Import component files
import { BrowserWarningBanner } from 'components';

const meta: Meta<typeof BrowserWarningBanner> = {
  component: BrowserWarningBanner,
  tags: ['autodocs'],
  parameters: {
    previewLayout: 'vertical',
    controls: { hideNoControlsWarning: true }
  }
};

export default meta;

type Story = StoryObj<typeof BrowserWarningBanner>;

export const Default: Story = {};
