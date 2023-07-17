import React, { useState } from 'react'
import { Box, Button, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';


function Form({ onSubmit }: { onSubmit: (filterValue: string, filterBy: string) => void }) {
  const [filterValue, setFilterValue] = useState('');
  const [filterBy, setFilterBy] = useState('name');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(filterValue, filterBy);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <TextField
          label="Filtro"
          rows={3}
          variant="outlined"
          autoComplete='off'
          fullWidth
          value={filterValue}
          onChange={(event) => setFilterValue(event.target.value)}
        />

        <FormControl variant="outlined" sx={{ minWidth: 120, ml: 2 }}>
          <InputLabel>Filtrar por</InputLabel>
          <Select
            label="Filtrar por"
            value={filterBy}
            onChange={(event) => setFilterBy(event.target.value as string)}
          >
            <MenuItem value="name">Nome</MenuItem>
            <MenuItem value="surname">Sobrenome</MenuItem>
            <MenuItem value="age">Idade</MenuItem>
          </Select>
        </FormControl>

        <Button type="submit" variant="contained" color="primary" sx={{ height: 56, ml: 2, px: 3 }}>Aplicar</Button>
      </Box>
    </form>
  );
}

export default Form;
