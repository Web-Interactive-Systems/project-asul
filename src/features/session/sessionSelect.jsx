import { useState } from 'react';
import { Button, Flex } from '@radix-ui/themes';
import { MultipleDatePicker } from '../../components/MultiDatePicker';
import { getSessions } from '@/actions/getSessions';
import { addSession } from '@/actions/addSession';
import { format } from 'date-fns';

export function SessionSelector() {
  const [selectedDates, onDatesChange] = useState([]);

  const handleSupprClick = (index) => {
    const newDates = selectedDates.filter((_, i) => i !== index);
    onDatesChange(newDates);
  };
  const handleAddSessions = async (sessions) => {
    sessions = sessions.map(session_date => ({ session_date: format(session_date, 'yyyy-MM-dd', { local: { code: 'fr-FR' } }) }));
    const { data, error } = await addSession({ sessions });
    console.log(error)
    onDatesChange([]);
  }

  return (
    <Flex justify="center">
      <Flex direction="column" gap="4" width="max-content">
        <MultipleDatePicker
          selectedDates={selectedDates}
          onDatesChange={onDatesChange}
          handleSupprClick={handleSupprClick}
        />
        <Button disabled={selectedDates.length === 0} onClick={() => handleAddSessions(selectedDates)}>
          Créer les sessions
        </Button>
      </Flex>
    </Flex>
  );
}
