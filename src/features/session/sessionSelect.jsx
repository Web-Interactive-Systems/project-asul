import { useEffect, useState, useCallback } from 'react';
import { Button, Flex, Separator, Box, Text, Card, Heading, IconButton, ScrollArea } from '@radix-ui/themes';
import { MultipleDatePicker } from '../../components/MultiDatePicker';
import { getSessions } from '@/actions/getSessions';
import { addSession } from '@/actions/addSession';
import { deleteSession } from '@/actions/deleteSession'
import { format } from 'date-fns';
import { TrashIcon } from '@radix-ui/react-icons';

export function SessionSelector() {
  const [selectedDates, onDatesChange] = useState([]);
  const [sessions, setSessions] = useState([]);

  const handleFetch = useCallback(
    async () => {
      await getSessions().then(
        (values) => {
          setSessions(values);
        }
      );
    },
    [],
  )


  useEffect(() => {
    handleFetch()
  }, [])

  const handleUnselectDate = (index) => {
    const newDates = selectedDates.filter((_, i) => i !== index);
    onDatesChange(newDates);
  };
  const handleAddSessions = async (sessions) => {
    sessions = sessions.map(session_date => ({ session_date: format(session_date, 'yyyy-MM-dd', { local: { code: 'fr-FR' } }) }));
    const { data, error } = await addSession({ sessions });
    if (error) {
      console.error(error);
    }
    onDatesChange([]);
  }
  const handleDeleteSession = async (session_id) => {
    const { data, error } = await deleteSession({ session_id });
    if (error) {
      console.error(error);
    } else console.info(data);
    await handleFetch();
  }

  return (
    <Flex direction={{ initial: "column", sm: "row" }} align="center" justify="center" gap="8" style={{ position: "relative", height: 450 }}>
      <Flex direction="column" gap="4" width="max-content" style={{ position: "sticky", top: "0" }}>
        <MultipleDatePicker
          selectedDates={selectedDates}
          onDatesChange={onDatesChange}
          handleSupprClick={handleUnselectDate}
        />
        <Button disabled={selectedDates.length === 0} onClick={() => handleAddSessions(selectedDates)}>
          Créer les sessions
        </Button>
      </Flex>
      <Separator orientation="vertical" size="4" />
      <ScrollArea type='auto' scrollbars="vertical">
        <Flex direction="column" gap="2">
          <Heading size="3" style={{ marginBottom: ".5rem" }}>Sessions à venir</Heading>
          {sessions.length > 0 ? sessions
            .sort((a, b) => {
              return a.session_date > b.session_date ? 1 : -1;
            })
            .map((el, key) => {
              return (
                <Card key={key} style={{ maxWidth: 240 }}>
                  <Flex gap="3" justify="center" align="center">
                    <Text size="2">{format(new Date(el.session_date), 'dd MMM. yyyy')}</Text>
                    <IconButton radius='large' color="crimson" size="1" onClick={() => handleDeleteSession(el.id)}>
                      <TrashIcon />
                    </IconButton>
                  </Flex>
                </Card>
              )
            }) : <Text size="1">Aucune session à venir</Text>}
        </Flex>
      </ScrollArea>
    </Flex>
  );
}
