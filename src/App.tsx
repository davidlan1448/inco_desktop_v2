import React, { Suspense, useEffect, Fragment } from 'react';
import { GlobalStyle, Content } from "./styles/GlobalStyle";
import Router from "./Router";
import Bar from "./components/Bar/Bar";

import 'semantic-ui-css/semantic.min.css'
import { connect } from 'react-redux';
import { Navbar } from './components/NavBar';
import { ipcRenderer } from 'electron';
import { connect as connectSocket } from './socket';
import { Toast } from './hooks/Toast';

function App(props: any) {
  const { isLoggued, user } = props.userReducer;
  const { show } = Toast();

  useEffect(() => {
    ipcRenderer.on("onInit", (evt: any, args: any) => {
      // anything
      //console.log(args)
    });
  
    ipcRenderer.send("init");
  }, []);

  useEffect(() => {
    if (isLoggued) {
      connectSocket(user.idUser);
    }
  }, [isLoggued]);

  return (
    <Fragment>
      <Content>
        <GlobalStyle />

        <Bar />
        
        <Router>
        </Router>
      </Content>
    </Fragment>
  );
}

const mapStateToProps = ({ userReducer }: any) => {
  return {
    userReducer
  }
}

export default connect(mapStateToProps) (App);
