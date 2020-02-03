import React, { Fragment } from "react";
import { HeadBar, Icon } from "./Styles";
import { MdClose, MdRemove, MdFilterNone } from "react-icons/md";
import { IconContext } from "react-icons";

const Bar = (props: any) => {
  const closeWindow = () => {
    window.close();
  };

  return (
    <Fragment>
      <HeadBar>
        <Icon cursor="pointer" size="1.2em">
          <MdRemove color="white" onClick={closeWindow} />
        </Icon>
        <Icon cursor="pointer" size="1.2em">
          <MdFilterNone color="white" onClick={closeWindow} />
        </Icon>
        <Icon cursor="pointer" colorHover="red" size="1.2em">
          <MdClose color="white" onClick={closeWindow} />
        </Icon>
      </HeadBar>
    </Fragment>
  );
};

export default Bar;
