import styled from "styled-components";
import { Card } from "semantic-ui-react"

export const CardHeader = styled(Card)`
    padding: 5px 10px !important;
    width: 100% !important;
    margin: 0 !important;
`;

export const HeaderComponent = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    h2 {
        margin: 0;
    }
`;

export const Back = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
