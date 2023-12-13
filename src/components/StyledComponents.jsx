import styled from '@emotion/styled';
import { Card } from '@mui/material';

export const ButtonCard = styled(Card)(({ theme }) => ({
    color: theme.palette.primary,
    backgroundColor: theme.palette.primary,
    padding: 0,
    borderRadius: theme.shape.borderRadius,
    width: "280px",
    height: "250px",
    boxShadow: "0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)",
    marginBottom: "5%"
  }));
