import styled from 'styled-components';

export const Tabs = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`;

export const Elememt = styled.div`
    width: 50%;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    background: ${ ({ selected }) => selected ? 'white' : '#1b1c1d' };
    cursor: pointer;
    label {
        cursor: pointer;
        color: ${ ({ selected }) => selected ? '#1b1c1d' : 'white' };
        margin-left: 5px;
    }
`;