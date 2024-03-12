import * as React from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: 480,
  height: 320,
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: 'center',
  borderRadius: 30,

  
}));

export default DemoPaper;