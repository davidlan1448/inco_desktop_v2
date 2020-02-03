import React, { Fragment, useState } from "react";
import { Header, Content, CardHeader, Empty } from "./Styles";
import { Button } from "semantic-ui-react";

export const Groups = ({ errorGetGroups, groups, loadingGetGroups }: any) => {
  return (
    <Fragment>
      <Content>
        <CardHeader>
          <Header>
            <h2>Grupos</h2>

            <div>
              <Button circular icon="search" />
              <Button circular icon="add" />
            </div>
          </Header>
        </CardHeader>

        {
          groups.length === 0 && <Empty>No se encontro ningun grupo</Empty>
        }
      </Content>
    </Fragment>
  );
};
