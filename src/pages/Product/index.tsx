import React, { Component, Fragment } from "react";
import { Content } from "./components/Content";

class Product extends Component {
  render() {
    console.log(this.props);
    return <Fragment>
        <Content />
    </Fragment>;
  }
}

export default (Product);
