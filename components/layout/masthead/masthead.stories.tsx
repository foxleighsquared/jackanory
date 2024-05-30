import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import { Masthead } from 'components';

import type { Announcement } from 'lib/types/announcement';

// Import mocks
import { users } from './mocks/users';
import { navItems } from './mocks/nav-items';
import { announcements } from './mocks/announcements';

const meta: Meta<typeof Masthead> = {
  component: Masthead,
  args: {
    appName: 'Your App Name',
    user: users[0],
    switchTheme: action('theme-switched')
  },
  parameters: {
    status: 'alpha',
    previewLayout: 'vertical'
  }
};

export default meta;
type Story = StoryObj<typeof Masthead>;

export const Default: Story = {};

export const WithNavBar: Story = {
  args: {
    navigation: navItems
  }
};

export const WithNavBarActiveLink: Story = {
  args: {
    navigation: navItems,
    currentPath: '/about'
  }
};

export const WithAnnouncement: Story = {
  args: {
    navigation: navItems,
    announcements: [announcements[1] as Announcement],
    onAnnouncementDismiss: action('announcement-dismissed')
  }
};

export const WithHTMLAnnouncement: Story = {
  args: {
    navigation: navItems,
    announcements: [
      {
        id: '1',
        message: (
          <p>
            The sky is falling!&nbsp;&nbsp;
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                action('link-clicked')('False alarm, my bad');
              }}
            >
              Click here for more info
            </a>
          </p>
        ),
        status: 'warning'
      }
    ],
    onAnnouncementDismiss: action('announcement-dismissed')
  }
};

export const WithMultipleAnnouncements: Story = {
  args: {
    navigation: navItems,
    announcements: announcements as Announcement[],
    onAnnouncementDismiss: action('announcement-dismissed')
  },
  play: async ({ canvasElement, step }) => {
    const masthead = within(canvasElement).getByTestId('masthead');
    const announcements = within(masthead).getByTestId('announcements');
    const announcementsList =
      within(announcements).getAllByTestId('announcement');
    const infoAnnouncement = announcementsList[0];
    const dangerAnnouncement = announcementsList[1];
    const warningAnnouncement = announcementsList[2];

    await step('Three announcements are rendered', async () => {
      await expect(announcementsList).toHaveLength(3);
    });

    await step('The first announcement is an info announcement', async () => {
      await expect(infoAnnouncement).toHaveTextContent(
        'This is an info announcement'
      );
      await expect(infoAnnouncement.className).toContain('info');
    });

    await step('The second announcement is a danger announcement', async () => {
      await expect(dangerAnnouncement).toHaveTextContent(
        'This is a danger announcement'
      );
      await expect(dangerAnnouncement.className).toContain('error');
    });

    await step('The third announcement is a warning announcement', async () => {
      await expect(warningAnnouncement).toHaveTextContent(
        'This is a warning announcement'
      );
      await expect(warningAnnouncement.className).toContain('warning');
    });

    await step(
      'The first announcement is gone when it is dismissed',
      async () => {
        const dismissButton = within(infoAnnouncement).getByRole('button');
        userEvent.click(dismissButton);
        await waitFor(() => expect(infoAnnouncement).not.toBeInTheDocument());
      }
    );
  }
};

export const WithLongAppName: Story = {
  args: {
    appName: 'This application has an absurdly long name'
  }
};

export const WithPlayFunction: Story = {
  args: {
    navigation: navItems,
    currentPath: '/about'
  },
  play: async ({ canvasElement, step }) => {
    const masthead = within(canvasElement).getByTestId('masthead');
    await step('The masthead is rendered', async () => {
      await expect(masthead).toBeVisible();
    });

    await step('The masthead contains the app name', async () => {
      await expect(masthead).toHaveTextContent('Your App Name');
    });

    await step('The masthead contains the welcome message', async () => {
      await expect(masthead).toHaveTextContent('Welcome, Alexander H (51359)');
    });

    await step('The masthead contains the meta navigation', async () => {
      await expect(masthead).toHaveTextContent('Help');
      await expect(masthead).toHaveTextContent('Logout');
    });

    await step('The masthead contains the theme switcher', async () => {
      const themeSwitcher = within(masthead).getByTestId('theme-switcher');
      await expect(themeSwitcher).toBeVisible();
    });

    await step(
      'The masthead contains the menu toggle button but it is not visible',
      async () => {
        const menuToggleButton = within(masthead).getByTestId('menu-toggle');
        await expect(menuToggleButton).not.toBeVisible();
      }
    );

    await step('The masthead contains the app navigation', async () => {
      await expect(masthead).toHaveTextContent('Home');
      await expect(masthead).toHaveTextContent('About');
      await expect(masthead).toHaveTextContent('Contact Us');
      await expect(masthead).toHaveTextContent('Admin');
    });

    await step('The "About" link is the active link', async () => {
      const aboutLink = within(masthead).getByTestId('navigation-link-about');
      await expect(aboutLink).toHaveAttribute('aria-current', 'page');
    });
  }
};
