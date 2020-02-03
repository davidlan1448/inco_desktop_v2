import styled from "styled-components";

export const HeadBar = styled.div`
  position: fixed;
  display: flex;
  justify-content: flex-end;
  -webkit-app-region: drag;
  align-items: center;
  background: #14213d;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
`;

export const Icon = styled.div`
  display: flex;
  padding: 2px 8px;
  font-size: ${ props => props.size ? props.size : '1em' };
  align-items: center;
  transition: .5s;
  -webkit-app-region: no-drag;
  :hover {
    background: ${ props => props.colorHover ? props.colorHover : "none" };
    cursor: ${ props => props.cursor ? props.cursor : "none" };
  }
`;
