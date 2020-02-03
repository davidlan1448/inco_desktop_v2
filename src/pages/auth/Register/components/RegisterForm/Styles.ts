import styled from "styled-components";
import { Card, Form } from "semantic-ui-react";

export const Buttons = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
`;

export const BtnRegister = styled(Form.Button)`
    button {
        color: white !important;
        background: #fca311 !important;
    }
`;
