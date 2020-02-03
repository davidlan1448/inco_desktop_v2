import styled from "styled-components";
import { Button, Card } from "semantic-ui-react";

export const Content = styled.div`
    padding: 10px;
`;

export const CardHeader = styled(Card)`
    padding: 5px 10px !important;
    width: 100% !important;
    margin: 0 !important;
`;

export const Header = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    h2 {
        margin: 0;
    }
`;

export const Empty = styled.h3`
    text-align: center;
`;
