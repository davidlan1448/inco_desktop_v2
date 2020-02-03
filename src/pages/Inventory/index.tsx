import React, { Component, Fragment } from "react";
// @ts-ignore
import { getInventories, updateInventoriesSocket } from "reduxPath/actions/inventoryActions";

import { connect } from "react-redux";
import { socket } from "../../socket";
import { Inventories } from "./components/Inventories";

class Inventory extends Component<any> {

  componentDidMount() {
    const { getInventories, updateInventoriesSocket } = this.props;

    getInventories();

    socket.removeListener("getNewInventories");
    socket.on("getNewInventories", (inventories: any) => {
      updateInventoriesSocket(inventories);
    });
  }

  render() {
    const { inventoryReducer } = this.props;
    return (
      <Fragment>
        <Inventories {...inventoryReducer} />
        {/* <Content {...this.props} /> */}
      </Fragment>
    );
  }
}

const mapStateToProps = ({
  inventoryReducer
}: any) => {
  return {
    inventoryReducer
  };
};

const mapDispathToProps = {
  getInventories,
  updateInventoriesSocket
};

export default connect(mapStateToProps, mapDispathToProps)(Inventory);
