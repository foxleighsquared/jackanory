import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

// Import component files
import Calendar, { CalendarEvent } from './index';

const events = [
  {
    id: 'f4d4d4d4-d4d4-d4d4-d4d4-d4d4d4d4d4d0',
    title: 'Breakfast',
    start: new Date('2022-10-05T06:00:00'),
    end: new Date('2022-10-05T06:15:00'),
    description: 'Breakfast meeting with the team'
  },
  {
    id: 'f4d4d4d4-d4d4-d4d4-d4d4-d4d4d4d4d4d1',
    title: 'Coffee',
    start: new Date('2022-10-05T06:15:00'),
    end: new Date('2022-10-05T06:30:00')
  },
  {
    id: 'f4d4d4d4-d4d4-d4d4-d4d4-d4d4d4d4d4d2',
    title: 'Flight to Paris',
    start: new Date('2022-10-05T07:30:00'),
    end: new Date('2022-10-05T10:00:00'),
    description: "Don't forget your passport!"
  },
  {
    id: 'f4d4d4d4-d4d4-d4d4-d4d4-d4d4d4d4d4d3',
    title: 'Meeting with design team',
    start: new Date('2022-10-05T10:00:00'),
    end: new Date('2022-10-05T12:00:00')
  },
  {
    id: 'f4d4d4d4-d4d4-d4d4-d4d4-d4d4d4d4d4d4',
    title: 'Meeting with executive team',
    start: new Date('2022-10-05T12:00:00'),
    end: new Date('2022-10-05T12:30:00'),
    description: "Let's meet in the lobby"
  }
];

const meta: Meta<typeof Calendar> = {
  component: Calendar,
  tags: ['autodocs'],
  args: {
    title: 'Calendar title',
    onDateTimeSelected: (date: Date) =>
      action('calendar date selected')(date.toISOString()),
    onEventSelected: (event: CalendarEvent) =>
      action('calendar event selected')(event),
    events
  },
  argTypes: {
    startDate: {
      control: {
        type: 'date'
      }
    },
    endDate: {
      control: {
        type: 'date'
      }
    }
  }
};

export default meta;

type Story = StoryObj<typeof Calendar>;

export const Default: Story = {};

export const CustomStartAndEndDate: Story = {
  args: {
    startDate: new Date('2021-01-01T06:00:00.000Z'),
    endDate: new Date('2021-01-01T18:00:00.000Z')
  }
};

export const WithActions: Story = {
  args: {
    actions: [
      {
        label: 'Filter coffee',
        onClick: action('filter coffee'),
        variant: 'secondary'
      },
      {
        label: 'Create coffee',
        onClick: action('create coffee'),
        variant: 'primary'
      }
    ]
  }
};
