#! /usr/bin/env node

const blessed = require('blessed');
const XTerm = require('blessed-xterm');
const path = require('node:path');

const config = require(path.resolve(process.cwd(), 'package.json'));

const prefabVersion = config.builda.prefab.version;

const screen = blessed.screen({
  title: 'Jackanory Devkit v' + prefabVersion,
  smartCSR: true,
  autoPadding: false,
  warnings: false,
  fullUnicode: true,
  dockBorders: true,
  ignoreDockContrast: true
});

let terminated = 0;

const intro = blessed.box({
  parent: screen,
  top: 0,
  left: 0,
  width: '100%',
  height: 6,
  border: 'line',
  padding: 1,
  keys: false,
  mouse: false,
  label: 'Jackanory Devkit (v' + prefabVersion + ')',
  style: {
    fg: 'white',
    bg: '#24508f',
    border: { fg: 'default' }
  },
  content:
    'Press Ctrl+q to quit all terminals\r\nPress Ctrl+r to restart the active terminal'
});

const remainingHeight = screen.height - 6;
const terminalWidth = Math.floor(screen.width / 2);

const buildaPanel = () => {
  if (process.cwd().split('/').pop() === 'module') {
    // We're running from within the jackanory repo's module folder so don't run builda
    return {
      label: 'Builda',
      colour: 'default',
      content:
        '\n{center}The Builda terminal is not available within the Jackanory repo{/center}',
      left: terminalWidth,
      top: Math.floor(screen.height / 3 + 4),
      width: terminalWidth,
      height: Math.floor(remainingHeight / 3),
      disabled: true
    };
  }
  // We're running from within an app built with jackanory so run builda
  return {
    label: 'Builda',
    yarnCmd: 'builda-watch',
    colour: 'magenta',
    message: 'Starting Builda...',
    left: terminalWidth,
    top: Math.floor(screen.height / 3 + 4),
    width: terminalWidth,
    height: Math.floor(remainingHeight / 3),
    cwd:
      // If we're in the export folder, go up two levels
      process.cwd().split('/').pop() === 'export'
        ? path.join(process.cwd(), '../../')
        : process.cwd()
  };
};

const terminals = [
  {
    label: 'Storybook',
    yarnCmd: 'storybook',
    colour: 'magenta',
    message: 'Starting Storybook...',
    left: 0,
    top: 6,
    width: terminalWidth,
    height: Math.floor(remainingHeight / 3)
  },
  {
    label: 'NextJS',
    yarnCmd: 'next',
    colour: 'cyan',
    message: 'Starting NextJS...',
    left: terminalWidth,
    top: 6,
    width: terminalWidth,
    height: Math.floor(remainingHeight / 3)
  },
  {
    label: 'Watchers',
    yarnCmd: 'watch',
    colour: 'yellow',
    message: 'Starting Watchers...',
    left: 0,
    top: Math.floor(screen.height / 3 + 4),
    width: terminalWidth,
    height: Math.floor(remainingHeight / 3)
  },
  buildaPanel(),
  {
    initialFocus: true,
    label: 'Shell',
    colour: 'default',
    left: 0,
    top: Math.floor((screen.height / 3) * 2 + 2),
    width: screen.width,
    height: Math.floor(remainingHeight / 3),
    cwd:
      // If we're in the export folder, go up two levels
      process.cwd().split('/').pop() === 'export'
        ? path.join(process.cwd(), '../../')
        : process.cwd()
  }
];

screen.key(['C-q'], (ch, key) => {
  terminate();
});

const createTerminal = (props) => {
  const { label, left, top, width, height, colour, cwd } = props;
  return new XTerm({
    shell: process.env.SHELL || 'sh',
    args: [],
    env: process.env,
    cwd: cwd || process.cwd(),
    cursorType: 'block',
    border: 'line',
    scrollback: 1000,
    style: {
      fg: 'default',
      bg: 'default',
      border: { fg: colour },
      focus: { border: { fg: 'default' } },
      scrolling: { border: { fg: colour } }
    },
    left,
    top,
    width,
    height,
    label
  });
};

terminals.forEach((t) => {
  if (t.disabled) {
    const disabledPanel = blessed.box({
      parent: screen,
      top: t.top,
      left: t.left,
      width: t.width,
      height: t.height,
      border: 'line',
      tags: true,
      hoverText: 'This panel is disabled',
      keys: false,
      mouse: false,
      label: t.label,
      style: {
        fg: 'white',
        bg: '#111',
        border: { fg: 'default' }
      },
      content: t.content || '{center}This panel is disabled{/center}'
    });
    return screen.append(disabledPanel);
  }
  const terminal = createTerminal(t);
  if (t.message) terminal.write(t.message);
  if (t.yarnCmd) {
    terminal.spawn('yarn', [t.yarnCmd], t.cwd || process.cwd(), process.env);
  }

  if (t.initialFocus) terminal.focus();

  terminal.on('click', () => {
    terminal.focus();
    screen.render();
  });
  terminal.on('wheelup', () => {
    terminal.scroll(-5);
  });
  terminal.on('wheeldown', () => {
    terminal.scroll(5);
  });
  terminal.on('keypress', (ch, key) => {
    if (key.full === 'C-r') {
      terminal.terminate();
      if (t.yarnCmd) {
        terminal.spawn('yarn', [t.yarnCmd], process.cwd(), process.env);
      }
    }
  });

  terminal.on('exit', () => {
    terminated++;
    if (terminated === t.length) terminate();
  });

  screen.append(terminal);
});

screen.append(intro);

const terminate = () => {
  screen.destroy();
  process.exit(0);
};

screen.render();
