import { Table, TextArea, Box, TextFieldInput } from '@radix-ui/themes';
export function Barem() {

    return (

    <Table.Root>
  <Table.Header>
    <Table.Row>
      <Table.ColumnHeaderCell>Points d'écart entre victoire et défaite (divisés par 10)</Table.ColumnHeaderCell>
      <Table.ColumnHeaderCell>Coef applicable</Table.ColumnHeaderCell>
    </Table.Row>
  </Table.Header>

  <Table.Body>
    <Table.Row>
      <Table.RowHeaderCell>Pour -20 à -12</Table.RowHeaderCell>
      <Table.RowHeaderCell><TextFieldInput size="1" placeholder="-0.4" type='number' step='0.1' /></Table.RowHeaderCell>
    </Table.Row>

    <Table.Row>
      <Table.RowHeaderCell>Pour -11 à -7</Table.RowHeaderCell>
      <Table.RowHeaderCell><TextArea size="1" placeholder="-0.2" /></Table.RowHeaderCell>
    </Table.Row>

    <Table.Row>
      <Table.RowHeaderCell>Pour -6 à -1</Table.RowHeaderCell>
      <Table.RowHeaderCell><TextArea size="1" placeholder="0" /></Table.RowHeaderCell>
    </Table.Row>
    
    <Table.Row>
      <Table.RowHeaderCell>Pour 0 à 6</Table.RowHeaderCell>
      <Table.RowHeaderCell><TextArea size="1" placeholder="0.7" /></Table.RowHeaderCell>
    </Table.Row>
    <Table.Row>
      <Table.RowHeaderCell>Pour 7 à 11</Table.RowHeaderCell>
      <Table.RowHeaderCell><TextArea size="1" placeholder="1.3" /></Table.RowHeaderCell>
    </Table.Row>
    <Table.Row>
      <Table.RowHeaderCell>Pour 12 à 20</Table.RowHeaderCell>
      <Table.RowHeaderCell><TextArea size="1" placeholder="1.6" /></Table.RowHeaderCell>
    </Table.Row>
  </Table.Body>
</Table.Root>
    )
}