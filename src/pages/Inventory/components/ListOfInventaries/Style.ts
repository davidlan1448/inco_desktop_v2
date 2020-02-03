import styled from "styled-components";
import { Card } from "semantic-ui-react";
import { MdArrowDropDown } from "react-icons/md";
import { Link } from "react-router-dom";

export const Grid = styled.div`
    margin-top: 10px;
    display: grid;
    grid-gap: 15px;
    grid-template-columns: repeat(auto-fill, 307px);
    justify-content: space-evenly;
`;

export const CardInventory = styled(Card)`
    width: 100% !important;
    padding: 10px !important;
    margin: 0 !important;
    overflow: hidden;
    height: ${({ open }) => open ? "auto" : "57px" };
`;
// 58px he
export const ImageContent = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    span:first-child {
        font-weight: bold;
    }
    div {
        display: flex;
        flex-direction: column;
    }
`;

export const RotateArrow = styled.div`
    transition: .5s;
    position: absolute;
    right: 11px;
    transform: ${ ({ rotatediv }) => rotatediv ? "rotate(180deg)" : "rotate(0deg)" };
`;

export const ArrowIcon = styled(MdArrowDropDown)`
    font-size: 20px;
`;


export const CardContent = styled.div`
    margin-top: 10px;
    display: grid;
    grid-gap: 8px;
    grid-template-columns: repeat(auto-fill, 136px);
    justify-content: space-evenly;
`;

export const LinkRouter = styled(Link)`
    color: black;
    :hover {
        color: black;
    }
`;

export const CardNav = styled(Card)`
    cursor: pointer;
    margin: 0 !important;
    border-bottom: 2px solid ${({ colorborder }) => colorborder || "gray" } !important;
    padding: 10px !important;
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    font-weight: bold;
    svg {
        width: 100%;
        font-size: 40px;
    }
`;
