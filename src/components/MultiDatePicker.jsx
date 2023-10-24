import { format } from 'date-fns';
import {
  DatePickerStateProvider,
  useContextDaysPropGetters,
  useContextCalendars,
  useContextDatePickerOffsetPropGetters,
} from '@rehookify/datepicker';
import { Flex, Button, Grid, Box, Dialog, Badge, DropdownMenu, IconButton } from '@radix-ui/themes';
import { Cross1Icon, EyeOpenIcon, TrashIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import './Multiple.css';

const getDayClassName = (className, { selected }) => clsx('dayNumber', { 'active-date': selected });

const DatePicker = ({ prevButton, nextButton, calendar }) => {
  const { weekDays } = useContextCalendars();
  const { dayButton } = useContextDaysPropGetters();
  const { month, year, days } = calendar;

  weekDays.forEach((element, index) => {
    switch (element) {
      case 'Sun':
        weekDays[index] = 'Dim';
        break;
      case 'Mon':
        weekDays[index] = 'Lun';
        break;
      case 'Tue':
        weekDays[index] = 'Mar';
        break;
      case 'Wed':
        weekDays[index] = 'Mer';
        break;
      case 'Thu':
        weekDays[index] = 'Jeu';
        break;
      case 'Fri':
        weekDays[index] = 'Ven';
        break;
      case 'Sat':
        weekDays[index] = 'Sam';
        break;
    }
  });

  return (
    <Flex
      direction="column"
      gap="3"
      p="2"
      style={{
        maxWidth: 400,
        height: 300,
        border: '1px solid #eee',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
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
  );
};

const Root = () => {
  const { subtractOffset, addOffset } = useContextDatePickerOffsetPropGetters();
  const { calendars } = useContextCalendars();

  return (
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
  );
};

export const MultipleDatePicker = ({ selectedDates, onDatesChange, handleSupprClick }) => {
  return (
    <DatePickerStateProvider
      config={{
        selectedDates,
        onDatesChange,
        dates: { mode: 'multiple', toggle: true },
      }}
    >
      <Flex direction="column" gap="4" width="max-content">
        <Root />

        <Dialog.Root>
          <Dialog.Trigger>
            <Button size="2" variant='outline'><EyeOpenIcon /> Date(s) sélectionnée(s) </Button>
          </Dialog.Trigger>

          <Dialog.Content style={{ maxWidth: 450, position: "relative" }}>
            <Flex justify="between">
              <Dialog.Title>Date(s) sélectionnée(s)</Dialog.Title>
              <Dialog.Close>
                <IconButton variant='ghost' color='gray'>
                  <Cross1Icon />
                </IconButton>
              </Dialog.Close>
            </Flex>

            <Flex direction="column" gap="3" style={{ maxHeight: 450 }}>
              {selectedDates
                .sort((a, b) => {
                  return a - b;
                })
                .map((date, index) => (
                  <Button
                    style={{ position: "relative" }}
                    color="indigo"
                    variant="soft"
                    key={index}
                    onClick={() => {
                      handleSupprClick(index);
                    }}
                  >
                    {format(date, 'dd MMM. yyyy')}
                    <IconButton color="crimson" size="1" style={{ position: "absolute", right: "5px" }}>{<TrashIcon />}</IconButton>
                  </Button>
                ))}
            </Flex>

          </Dialog.Content>
        </Dialog.Root>
      </Flex>
    </DatePickerStateProvider>
  );
};
