import {
  Meta,
  Story,
  Canvas,
  Description,
  ArgTypes,
  IconGallery,
  IconItem,
  ColorPalette,
  ColorItem,
  Subtitle,
  Primary,
  Source,
  Controls,
  Stories
} from '@storybook/blocks';
import { initialize, mswDecorator } from 'msw-storybook-addon';

import LinkTo from '@storybook/addon-links/react';
import Badge from './doc-blocks/badge';
import Tip from './doc-blocks/tip';
import WorksWith from './doc-blocks/works-with';
import Title from './doc-blocks/title';
import ThemeBlock from './doc-blocks/theme';
import Version from './doc-blocks/version';

import { ThemeProvider } from 'next-themes';

import type { Decorator, Args } from '@storybook/react';

import 'styles/index.scss';
import React from 'react';

/*
 * Initializes MSW
 * See https://github.com/mswjs/msw-storybook-addon#configuring-msw
 * to learn how to customize it
 */
initialize({
  onUnhandledRequest: (request) => {
    if (request.url.pathname.includes('hot-update')) {
      request.passthrough();
    }
    return 'bypass';
  }
});

export const withTheme: Decorator<Args> = (Story, context) => {
  // Get values from story parameter first, else fallback to globals
  const theme = context.parameters.theme || context.globals.theme;
  const previewLayout = context.parameters.previewLayout || 'horizontal';
  const overflowOptions = context.parameters.overflow || 'show';
  const noThemesInDocs = context.parameters.noThemesInDocs || false;
  if (context.viewMode === 'docs' && !noThemesInDocs) {
    return (
      <div className={`preview-layout preview-layout--${previewLayout}`}>
        <ThemeProvider forcedTheme="dark" enableSystem={false}>
          <ThemeBlock theme="dark" docsMode overflow={overflowOptions}>
            <Story />
          </ThemeBlock>
        </ThemeProvider>
        <ThemeProvider forcedTheme="light" enableSystem={false}>
          <ThemeBlock theme="light" docsMode overflow={overflowOptions}>
            <Story />
          </ThemeBlock>
        </ThemeProvider>
      </div>
    );
  }

  return (
    <ThemeBlock theme={theme} overflow={overflowOptions} reloadOnChange>
      <ThemeProvider forcedTheme={theme} enableSystem={false}>
        <Story />
      </ThemeProvider>
    </ThemeBlock>
  );
};

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Theme for the components',
    defaultValue: 'light',
    toolbar: {
      // The icon for the toolbar item
      icon: 'paintbrush',
      // Array of options
      items: [
        { value: 'light', title: 'light' },
        { value: 'dark', title: 'dark' }
      ],
      dynamicTitle: true
    }
  }
};

export const decorators = [withTheme, mswDecorator];

const viewports = {
  iPhoneXR: {
    name: 'iPhone XR',
    styles: {
      width: '414px',
      height: '896px'
    }
  },
  iPhoneXS: {
    name: 'iPhone XS',
    styles: {
      width: '375px',
      height: '812px'
    }
  },
  iPhone5: {
    name: 'iPhone 5',
    styles: {
      width: '320px',
      height: '568px'
    }
  },
  iPadPro: {
    name: 'iPad Pro',
    styles: {
      width: '1024px',
      height: '1366px'
    }
  },
  iPad: {
    name: 'iPad (Other)',
    styles: {
      width: '768px',
      height: '1024px'
    }
  },
  desktop: {
    name: 'Desktop',
    styles: {
      width: '1280px',
      height: '1024px'
    }
  },
  ultrawide: {
    name: 'Ultrawide Desktop',
    styles: {
      width: '1600px',
      height: '1200px'
    }
  }
};

export const parameters = {
  docs: {
    page: () => (
      <>
        <Title />
        <WorksWith />
        <Subtitle />
        <Description />
        <Primary />
        <Controls />
        <Stories />
      </>
    ),
    components: {
      Version,
      Meta,
      Story,
      Canvas,
      Primary,
      Source,
      Controls,
      Description,
      ArgTypes,
      IconGallery,
      IconItem,
      LinkTo,
      Badge,
      Title,
      Tip,
      WorksWith,
      ColorPalette,
      ColorItem
    }
  },
  options: {
    showSearchBox: true,
    storySort: {
      method: 'configure',
      includeName: true,
      order: [
        'Documentation',
        [
          'Introduction',
          'Coding Guidelines',
          ['General'],
          'Infrastructure Guidelines',
          'Design Guidelines',
          ['Introduction'],
          'Architectural Decisions',
          ['Introduction'],
          'Roadmap',
          'Known Issues',
          'Changelog'
        ],
        'Components',
        ['Docs', ['Docs']],
        'Partials',
        ['Docs', ['Docs']],
        'Pages',
        ['Docs', ['Docs']],
        'Templates',
        ['Docs', ['Docs']]
      ]
    }
  },
  layout: 'centered',
  viewport: {
    viewports
  },
  controls: {
    expanded: true
  },
  // The theme switcher handles this for us
  backgrounds: { disable: true },
  actions: { argTypesRegex: '^on[A-Z].*' }
};
