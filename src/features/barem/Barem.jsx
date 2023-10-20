import { Table, TextFieldInput } from '@radix-ui/themes';
import { getGrades } from '@/actions/getGrades';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export function Barem() {
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await getGrades();
      setGrades(res.data);
    })();
  }, []);

  return (
    <Table.Root>
      <Table.Header>
        <Table.ColumnHeaderCell>
          Points d'écart entre victoire et défaite (divisés par 10)
        </Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell>Coef applicable</Table.ColumnHeaderCell>
      </Table.Header>

      <Table.Body>
        {grades.map((e) => (
          <Table.Row key={e.id}>
            <Table.RowHeaderCell>
              Pour {e.min} à {e.max}
            </Table.RowHeaderCell>
            <Table.RowHeaderCell>
              <TextFieldInput size="1" placeholder={e.coef} type="number" step="0.1" />
            </Table.RowHeaderCell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}
