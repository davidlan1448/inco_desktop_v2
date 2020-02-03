import styled from "styled-components";
import { Form, Button, Card } from 'semantic-ui-react';
import { Link as Routerlink } from 'react-router-dom'; 

export const FormStyle = styled(Form)`
`;

export const BtnLogin = styled(Button)`
  background: #fca311 !important;
  color: white !important;
  border-bottom: 4px solid #d68b10 !important;
`;

export const Link = styled(Routerlink)`
  padding: 7px 17px;
  text-align: end;
`
