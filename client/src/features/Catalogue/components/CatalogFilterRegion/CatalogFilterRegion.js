import React, { useState } from 'react';
import { Box, Checkbox, FormControlLabel } from '@mui/material';
import { FilterAccordion } from '..';

const regions = ['region1', 'region2', 'region3', 'region4'];

const CatalogFilterRegion = () => {
  const [checked, setChecked] = useState(Array(regions.length).fill(false));

  const isAllChecked = checked.every((el) => el === true);

  const handleChangeAll = () => {
    setChecked((current) => {
      const newChecked = [...current];
      if (!isAllChecked) {
        newChecked.fill(true);
      } else {
        newChecked.fill(false);
      }

      return newChecked;
    });
  };

  const handleChange = (event) => {
    const index = regions.indexOf(event.target.id);
    setChecked((current) => {
      const newChecked = [...current];
      newChecked[index] = !newChecked[index];
      return newChecked;
    });
  };

  const children = (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
      {regions.map((el) => (
        <FormControlLabel
          key={el}
          label={el}
          control={<Checkbox id={el} checked={checked[regions.indexOf(el)]} onChange={handleChange} />}
        />
      ))}
    </Box>
  );

  return (
    <FilterAccordion title="Region">
      <FormControlLabel label="All regions" control={<Checkbox checked={isAllChecked} onChange={handleChangeAll} />} />
      {children}
    </FilterAccordion>
  );
};

export default CatalogFilterRegion;
