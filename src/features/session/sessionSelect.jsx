import { useState } from 'react';
import { Flex } from '@radix-ui/themes';
import { MultipleDatePicker } from '../../components/MultiDatePicker';
import { getSessions } from '@/actions/getSessions';

export function SessionSelector() {
  const [selectedDates, onDatesChange] = useState([]);

  const handleSupprClick = (index) => {
    const newDates = selectedDates.filter((_, i) => i !== index);
    onDatesChange(newDates);
  };

  return (
    <MultipleDatePicker
      selectedDates={selectedDates}
      onDatesChange={onDatesChange}
      handleSupprClick={handleSupprClick}
    />
  );
}
