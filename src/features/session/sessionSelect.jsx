import React from "react";

import { useEffect, useState, useCallback } from 'react';
import { Button, Flex, Separator, Box, Text, Card, Heading, IconButton, ScrollArea, DropdownMenu, TextField } from '@radix-ui/themes';
import { MultipleDatePicker } from '../../components/MultiDatePicker';
import { getSessions } from '@/actions/getSessions';
import { addSession } from '@/actions/addSession';
import { deleteSession } from '@/actions/deleteSession'
import { format } from 'date-fns';
import { TrashIcon, CaretDownIcon, MagnifyingGlassIcon, CalendarIcon } from '@radix-ui/react-icons';
import { useThrottle } from '@/hooks/useThrottle';

export function SessionSelector() {
  const [selectedDates, onDatesChange] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [searchSession, setSearchSession] = useState("")

  const handleFetch = useCallback(
    async (search_param) => {
      await getSessions({ search_query: search_param }).then(
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
  const searchDebounced = useThrottle(searchSession, 300);
  useEffect(
    () => {
      handleFetch(searchSession);
    }, [searchDebounced]
  );

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
    <Flex direction={{ initial: "column", sm: "row" }} align={{ initial: "center", sm: "start" }} justify="center" gap="8">
      <Flex direction="column" gap="4" width="max-content">
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
      <ScrollArea type='auto' scrollbars="vertical" style={{ maxHeight: "100vh" }}>
        <Flex direction="column" gap="4">
          <Heading size="3" style={{ margin: ".5rem 0" }}>Sessions à venir</Heading>
          <TextField.Root style={{ maxWidth: 240 }}>
            <TextField.Input type="date" placeholder="Rechercher une session..." value={searchSession} onChange={(e) => e ? setSearchSession(e.target.value) : setSearchSession("")} />
          </TextField.Root>

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
            }) : <Text size="1">Aucun résultat</Text>}
        </Flex>
      </ScrollArea>
    </Flex>
  );
}
