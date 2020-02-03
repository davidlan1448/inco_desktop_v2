import React, { Fragment, useState } from "react";
import { Button, Icon, Divider, Card } from "semantic-ui-react";
import { Header, BtnAdd, Content, Empty, CardHeader } from "./Styles";
import { ListOfInventaries } from "../ListOfInventaries";
import ModalInventory from "../ModalInventory";

export const Inventories = (props: any) => {
  const {
    inventories
  } = props;
  const [modal, setModal] = useState({ open: false });

  const openModal = () => {
    setModal({
      ...modal,
      open: true
    });
  };

  return (
    <Fragment>
      <Content>
        <CardHeader>
          <Header>
            <h2>Inventarios</h2>

            <div>
              <BtnAdd circular icon="search" />
              <BtnAdd circular icon="add" onClick={openModal} />
            </div>
          </Header>
        </CardHeader>

        {inventories.length === 0 ? (
          <Empty>No se encontraron Inventarios</Empty>
        ) : (
          <ListOfInventaries inventories={inventories} />
        )}
      </Content>

      <ModalInventory
        open={modal.open}
        onCloseModal={(state: boolean) =>
          setModal({
            ...modal,
            open: false
          })
        }
      />
    </Fragment>
  );
};
