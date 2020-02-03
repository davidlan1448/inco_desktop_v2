import React, { Component, Fragment } from "react";
// @ts-ignore
import { getInventories, updateInventoriesSocket } from "reduxPath/actions/inventoryActions";
// @ts-ignore
import { getGroups } from "reduxPath/actions/groupActions";

import { connect } from "react-redux";
import { Content } from "./components/Content";
import { socket } from "../../socket";

class Home extends Component<any> {
  render() {
    //console.log(this.props);
    return (
      <Fragment>
        <Content />
      </Fragment>
    );
  }
}

export default (Home);
