import React, { useState } from "react";
import { Tabs, Elememt } from "./Styles";
import { MdAssignment, MdGroup } from "react-icons/md";

export const Tab = ({ onSelectedIndex, defaultIndex }: any) => {
  const [currentIndex, setIndex] = useState(defaultIndex);

  const selectIndex = (index: number) => {
    setIndex(index);
    onSelectedIndex(index);
  };

  return (
    <Tabs>
      <Elememt onClick={() => selectIndex(0)} selected={currentIndex === 0}>
        <MdAssignment
          size="20"
          color={currentIndex === 0 ? "#1b1c1d" : "white"}
        />
        <label>Inventarios</label>
      </Elememt>
      <Elememt onClick={() => selectIndex(1)} selected={currentIndex === 1}>
        <MdGroup size="20" color={currentIndex === 1 ? "#1b1c1d" : "white"} />
        <label>Grupos</label>
      </Elememt>
    </Tabs>
  );
};
