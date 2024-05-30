import classNames from 'classnames';
import {
  addMinutes,
  areIntervalsOverlapping,
  differenceInMinutes,
  eachHourOfInterval,
  endOfDay,
  format,
  hoursToMinutes,
  startOfDay
} from 'date-fns';
import React, { Fragment, useEffect, useRef } from 'react';

import { Button, buttonVariants } from 'components/data-input/button';
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

export type CalendarAction = {
  /**
   * The type of action to display.
   */
  variant: (typeof buttonVariants)[number];
  /**
   * The label for the action.
   */
  label: string;
  /**
   * The click handler for the button.
   */
  onClick: () => void;
};

export type CalendarEvent = {
  /**
   * The unique id of the event.
   */
  id: string;
  /**
   * The title of the event.
   */
  title: string;
  /**
   * The optional description of the event.
   */
  description?: string;
  /**
   * The start time of the event.
   */
  start: Date;
  /**
   * The end time of the event.
   */
  end: Date;
};

export type Props = {
  /**
   * The title of the calendar.
   */
  title: string;
  /**
   * Called when the user selects a time slot.
   * @param date The date of the selected time slot.
   */
  onDateTimeSelected: (date: Date) => void;
  /**
   * The calendar events to display.
   */
  events: CalendarEvent[];
  /**
   * The actions to display.
   */
  actions?: CalendarAction[];
  /**
   * The start date time of the calendar.
   * Defaults to today at 00:00.
   */
  startDate?: Date;
  /**
   * The end date time of the calendar.
   * Defaults to today at 24:00.
   */
  endDate?: Date;
  /**
   * Called when the user selects an event.
   * @param event The event that was selected.
   */
  onEventSelected?: (event: CalendarEvent) => void;
};

const EventButton = ({
  event,
  onEventSelected,
  children
}: {
  event: CalendarEvent;
  onEventSelected?: (event: CalendarEvent) => void;
  children: React.ReactNode;
}) => (
  <button
    className={styles['calendar-event-button']}
    onClick={() => onEventSelected?.(event)}
    title={event.title}
  >
    <EventTitle event={event} />
    {children}
  </button>
);

const EventTitle = ({ event }: { event: CalendarEvent }) => (
  <p className={styles['calendar-event-title']}>{event.title}</p>
);

/**
 * The calendar component displays a list of events in a calendar format.
 */
const Calendar: React.FC<Props> = ({
  title,
  onDateTimeSelected,
  onEventSelected,
  events,
  actions,
  startDate = startOfDay(new Date()),
  endDate = endOfDay(new Date())
}) => {
  const container = useRef<HTMLDivElement>(null);
  const containerOffset = useRef<HTMLDivElement>(null);
  const times = eachHourOfInterval({
    start: startOfDay(startDate),
    end: endOfDay(startDate)
  });

  useEffect(() => {
    if (container.current && containerOffset.current) {
      // Set the container scroll position based on the current time.
      const currentMinute = new Date().getHours() * 60;
      container.current.scrollTop =
        ((container.current.scrollHeight -
          containerOffset.current.offsetHeight) *
          currentMinute) /
        1440;
    }
  }, []);

  const renderShortEvent = (event: CalendarEvent, gridRow: string) => {
    const classes = cx(
      styles['calendar-event'],
      styles['calendar-event--short']
    );
    return (
      <li
        key={event.id}
        className={classes}
        style={{
          gridRow
        }}
      >
        <EventButton event={event} onEventSelected={onEventSelected}>
          <span>,&nbsp;</span>
          <p>
            <time dateTime={event.start.toISOString()}>
              {format(event.start, 'h:mmaaa')}
            </time>
          </p>
          {event.description && (
            <>
              <p className={styles['overflow-ellipsis']}>
                , {event.description}
              </p>
            </>
          )}
        </EventButton>
      </li>
    );
  };

  const renderMidEvent = (event: CalendarEvent, gridRow: string) => {
    return (
      <li
        key={event.id}
        className={styles['calendar-event']}
        style={{
          gridRow
        }}
      >
        <EventButton event={event} onEventSelected={onEventSelected}>
          <p className={styles['overflow-ellipsis']}>
            <time dateTime={event.start.toISOString()}>
              {format(event.start, 'hh:mmaaa')}
            </time>
            {event.description && <>, {event.description}</>}
          </p>
        </EventButton>
      </li>
    );
  };

  const renderEvent = (event: CalendarEvent, gridRow: string) => {
    return (
      <li
        key={event.id}
        className={styles['calendar-event']}
        style={{ gridRow }}
      >
        <EventButton event={event} onEventSelected={onEventSelected}>
          <p>
            <time dateTime={event.start.toISOString()}>
              {format(event.start, 'h:mm')} - {format(event.end, 'h:mmaaa')}
            </time>
          </p>
          {event.description && (
            <p className={styles['overflow-ellipsis']}>{event.description}</p>
          )}
        </EventButton>
      </li>
    );
  };

  return (
    <>
      <div className={styles['container']}>
        <header className={styles['header']}>
          <h2 title={title}>{title}</h2>
          <div className={styles['header-seperator']} />
          {actions?.map((action) => (
            <Button
              className={styles['header-action']}
              key={action.label}
              variant={action.variant}
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          ))}
        </header>
        <div ref={container} className={styles['calendar-content-container']}>
          <div className={styles['calendar-content']}>
            <div className={styles['calendar-times-container']}>
              <div className={styles['calendar-times-left-bar']} />
              <div className={styles['calendar-times-inner']}>
                <div
                  className={styles['calendar-times']}
                  style={{
                    gridTemplateRows: `repeat(${
                      times.length * 2
                    }, minmax(6rem, 1fr))`
                  }}
                >
                  <h3 className={styles['sr-only']}>{events.length} events</h3>
                  <div
                    ref={containerOffset}
                    className={styles['calendar-times-offset']}
                  />
                  {times.map((time, i) => {
                    const disabled = !areIntervalsOverlapping(
                      {
                        start: startDate,
                        end: endDate
                      },
                      { start: time, end: time },
                      { inclusive: true }
                    );
                    return (
                      <Fragment key={i}>
                        <div
                          onClick={() => !disabled && onDateTimeSelected(time)}
                          className={cx({
                            [styles['disabled']]: disabled
                          })}
                        >
                          <div className={styles['calendar-time']}>
                            {format(time, 'h a')}
                          </div>
                        </div>
                        <div
                          className={cx({
                            [styles['disabled']]: disabled
                          })}
                          onClick={() =>
                            !disabled &&
                            onDateTimeSelected(addMinutes(time, 30))
                          }
                        />
                      </Fragment>
                    );
                  })}
                </div>
                <ol className={styles['calendar-events-container']}>
                  {events.map((event) => {
                    const { start, end } = event;
                    const difference = differenceInMinutes(end, start);
                    const eventLessThan30Minutes = difference < 30;
                    const eventLessThan45Minutes = difference < 45;
                    const minutes =
                      hoursToMinutes(start.getHours()) + start.getMinutes();
                    const gridRow = `${Math.round(minutes / 5 + 2)} / span ${
                      difference / 5
                    }`;

                    if (eventLessThan30Minutes)
                      return renderShortEvent(event, gridRow);

                    if (eventLessThan45Minutes) {
                      return renderMidEvent(event, gridRow);
                    }

                    return renderEvent(event, gridRow);
                  })}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Calendar.displayName = 'Calendar';

export default Calendar;
