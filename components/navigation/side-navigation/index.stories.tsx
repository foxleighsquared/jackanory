import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { action } from '@storybook/addon-actions';

import SideNavigation, { Link } from './index';

// Import mock data
import oneLevelLinks from './mocks/links-one-level';
import twoLevelLinks from './mocks/links-two-level';
import threeLevelLinks from './mocks/links-three-level';
import linksIcon from './mocks/links-icon';

const meta: Meta = {
  component: SideNavigation,
  tags: ['autodocs'],
  args: {
    links: oneLevelLinks.map((link) => ({
      label: link.label,
      url: () => action('link-click')
    })) as unknown as Link[]
  },
  parameters: {
    previewLayout: 'vertical'
  }
};

export default meta;

type Story = StoryObj<typeof SideNavigation>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const navigation = await within(canvasElement).findByRole('navigation');
    const list = await within(navigation).findByRole('list');
    const items = await within(list).findAllByRole('listitem');

    expect(items).toHaveLength(3);
  }
};

export const TwoLevelLinks: Story = {
  args: {
    links: twoLevelLinks.map((link) => ({
      label: link.label,
      url: () => action('link-click')(link.label),
      links: link.links?.map((subLink) => ({
        label: subLink.label,
        url: () => action('link-click')(subLink.label)
      }))
    })) as unknown as Link[]
  },
  play: async ({ canvasElement, step }) => {
    const navigation = await within(canvasElement).findByRole('navigation');
    const list = await within(navigation).findByRole('list');
    const items = await within(list).findAllByRole('listitem');

    await step('First level links are rendered', () => {
      expect(items).toHaveLength(3);
    });

    await step(
      'Clicking on a first level link renders the second level links',
      async () => {
        const itemLink = await within(items[1]).findByText('Item 2');
        await userEvent.click(itemLink);
        const subList = await within(items[1]).findByRole('list');
        const subItems = await within(subList).findAllByRole('listitem');
        await waitFor(async () => {
          expect(subItems).toHaveLength(3);
        });
      }
    );
  }
};

export const ThreeLevelLinks: Story = {
  args: {
    links: threeLevelLinks.map((link) => ({
      label: link.label,
      url: () => action('link-click')(link.label),
      links: link.links?.map((subLink) => ({
        label: subLink.label,
        url: () => action('link-click')(subLink.label),
        links: subLink.links?.map((subSubLink) => ({
          label: subSubLink.label,
          url: () => action('link-click')(subSubLink.label)
        }))
      }))
    })) as unknown as Link[]
  },
  play: async ({ canvasElement, step }) => {
    const navigation = await within(canvasElement).findByRole('navigation');
    const list = await within(navigation).findByRole('list');
    const items = await within(list).findAllByRole('listitem');

    await step('First level links are rendered', () => {
      expect(items).toHaveLength(3);
    });

    await step(
      'Clicking on a first level link renders the second level links',
      async () => {
        const itemLink = await within(items[1]).findByText('Item 2');
        await userEvent.click(itemLink);
        const subList = await within(items[1]).findByRole('list');
        const subItems = await within(subList).findAllByRole('listitem');
        await waitFor(async () => {
          expect(subItems).toHaveLength(3);
        });
      }
    );

    await step(
      'Clicking on a second level link renders the third level links',
      async () => {
        const subList = await within(items[1]).findByRole('list');
        const subItems = await within(subList).findAllByRole('listitem');
        const subItemLink = await within(subItems[0]).findByText('Item 2.1');
        await userEvent.click(subItemLink);
        const subSubList = await within(subItems[0]).findByRole('list');
        const subSubItems = await within(subSubList).findAllByRole('listitem');
        await waitFor(async () => {
          expect(subSubItems).toHaveLength(3);
        });
      }
    );
  }
};

export const IconLinks: Story = {
  args: {
    links: linksIcon.map((link) => ({
      label: link.label,
      url: () => action('link-click')(link.label),
      icon: link.icon
    })) as unknown as Link[]
  },
  play: async ({ canvasElement }) => {
    const navigation = await within(canvasElement).findByRole('navigation');
    const list = await within(navigation).findByRole('list');
    const items = await within(list).findAllByRole('listitem');

    expect(items).toHaveLength(3);

    expect(await within(items[0]).findByTestId('icon')).toBeInTheDocument();
  }
};
