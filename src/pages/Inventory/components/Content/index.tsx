import React, { useState, Fragment } from "react";
import { Tabs, Elememt } from "./Styles";
import { MdAssignment, MdGroup } from "react-icons/md";
import { Tab } from "../Tab";
import { Inventories } from "../Inventories";
import { Groups } from "../Groups";

export const Content = ({ inventoryReducer }: any) => {

  return (
    <Fragment>
        <Inventories { ...inventoryReducer } />
    </Fragment>
  );
};
