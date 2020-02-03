import React, { useState } from "react";
import { Inventory } from "../../../../electron/entitys/Inventory";
import { Accordion, Menu, Card, Feed, Image } from "semantic-ui-react";
import {
  CardInventory,
  Grid,
  ImageContent,
  ArrowIcon,
  CardContent,
  CardNav,
  RotateArrow,
  LinkRouter
} from "./Style";
// @ts-ignore
import photo_profile from "../../../../assets/photo_profile.svg";
import { MdList, MdPieChart, MdSettings } from "react-icons/md";
import { GiChart } from "react-icons/gi";
import { FiPieChart } from "react-icons/fi";
import { Link } from "react-router-dom";

export const ListOfInventaries = ({ inventories }: any) => {
  const [activate, setActivate] = useState({
    activeIndex: inventories.length === 1 ? inventories[0].idInventory : 0
  });

  const openCard = (inventory: Inventory) => {
    const index =
      activate.activeIndex === inventory.idInventory
        ? 0
        : inventory.idInventory;
    setActivate({ activeIndex: index });
  };

  const content = (inventory: Inventory) => {
    const { idInventory, inventoryName, dateRegister } = inventory;
    const { activeIndex } = activate;
    
    const date = new Date(dateRegister);
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();
    
    return (
      <CardInventory
        key={idInventory}
        open={activeIndex === idInventory}
      >
        <ImageContent
          onClick={() => {
            openCard(inventory);
          }}
        >
          <Image src={photo_profile} avatar />
          <div>
            <span>{inventoryName}</span>
            <span>{dd + '/' + mm + '/' + yyyy}</span>
          </div>
          <RotateArrow rotatediv={ activeIndex === idInventory }>
            <ArrowIcon />
          </RotateArrow>
        </ImageContent>
        <CardContent>
          <LinkRouter to={`/product/${idInventory}`}>
            <CardNav colorborder={"#14213d"}>
              <MdList />
              <span>Productos</span>
            </CardNav>
          </LinkRouter>
          <CardNav colorborder={"green"}>
            <GiChart />
            <span>Ventas</span>
          </CardNav>
          <CardNav colorborder={"#fca311"}>
            <FiPieChart />
            <span>Estadisticas</span>
          </CardNav>
          <CardNav colorborder={"#e5e5e5"}>
            <MdSettings />
            <span>Configuraciones</span>
          </CardNav>
        </CardContent>
      </CardInventory>
    );
  };

  const getList = () => {
    return (
      <Grid>
        {inventories.map((inventory: Inventory) => {
          return content(inventory);
        })}
      </Grid>
    );
  };

  return getList();
};
