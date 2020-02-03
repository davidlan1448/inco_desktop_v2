import React, { useState, Fragment } from "react";
import { Tab } from "../Tab";
import Inventory from "../../../Inventory";

export const Content = () => {
    const [currentIndex, setIndex] = useState(0);
    
    const switchComponent = () => {
        switch (currentIndex) {
            case 0:
            return (<Inventory />)
            case 1:
            return (<p>Page</p>)
            default:
                break;
        }
    }

  return (
    <Fragment>
        <Tab defaultIndex={currentIndex} onSelectedIndex={(index: number) => {setIndex(index)}} />
        {
            switchComponent()
        }
    </Fragment>
  );
};
