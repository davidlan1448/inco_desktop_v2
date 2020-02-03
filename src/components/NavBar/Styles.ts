import styled from "styled-components";
import { Button, Menu } from "semantic-ui-react";

export const Nav = styled.nav`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    span {
        padding: 3px 10px;
        background: greenyellow;
    }
`;

export const BtnSideBar = styled(Button)`
    position: absolute;
    top: 5px;
    left: 10px;
    z-index: 100;
    color: white !important;
    background: #fca311 !important;
`;

export const LogOut = styled(Menu.Item)`
    position: absolute !important;
    width: 100%;
    bottom: 0;
`;

export const Content = styled.div`
    width: ${ props => props.width || 100 }%;
    max-width: ${ props => props.maxWidth };
    position: relative;
`;

export const Children = styled.div`
    height: ${ ({ height }) => height };
    overflow: auto;
`;
