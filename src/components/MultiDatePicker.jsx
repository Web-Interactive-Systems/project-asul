import { useState } from 'react';
import {
  DatePickerStateProvider,
  useContextDaysPropGetters,
  useContextCalendars,
  useContextDatePickerOffsetPropGetters,
} from '@rehookify/datepicker';
import { Flex, Button, Grid, Box } from '@radix-ui/themes';
import clsx from 'clsx';
import './Multiple.css';

const getDayClassName = (className, { selected }) => clsx('dayNumber', { 'active-date': selected });

const DatePicker = ({ prevButton, nextButton, calendar }) => {
  const { weekDays } = useContextCalendars();
  const { dayButton } = useContextDaysPropGetters();
  const { month, year, days } = calendar;
  return (
    <section>
      <Flex
        direction="column"
        gap="3"
        style={{ maxWidth: 300, height: 300 }}
        className="calendarPopup"
        align="center"
        justify="center"
      >
        <Flex className="datePickerHeader">
          <Box className="changeMonth">{prevButton}</Box>
          <Box className="monthDisplay">
            {month} {year}
          </Box>
          <Box className="changeMonth">{nextButton}</Box>
        </Flex>
        <Grid columns="7" gap="1">
          {weekDays.map((day) => (
            <Flex key={`${month}-${day}`} className="dateLibelle" align="center" justify="center">
              {day}
            </Flex>
          ))}
          {days.map((dpDay) => {
            return (
              <Flex
                align="center"
                justify="center"
                key={dpDay.$date.toDateString()}
                className={getDayClassName('dateCase', dpDay)}
                {...dayButton(dpDay)}
              >
                {dpDay.day}
              </Flex>
            );
          })}
        </Grid>
      </Flex>
    </section>
  );
};

const Root = () => {
  const { subtractOffset, addOffset } = useContextDatePickerOffsetPropGetters();
  const { calendars } = useContextCalendars();
  return (
    <section>
      <DatePicker
        prevButton={
          <Button className="monthBtn" {...subtractOffset({ months: 1 })}>
            ‹
          </Button>
        }
        nextButton={
          <Button className="monthBtn" {...addOffset({ months: 1 })}>
            ›
          </Button>
        }
        calendar={calendars[0]}
      />
    </section>
  );
};

const MultipleDatePicker = () => {
  const [selectedDates, onDatesChange] = useState([]);
  return (
    <DatePickerStateProvider
      config={{
        selectedDates,
        onDatesChange,
        dates: { mode: 'multiple', toggle: true },
      }}
    >
      <Root />
    </DatePickerStateProvider>
  );
};

export default MultipleDatePicker;
