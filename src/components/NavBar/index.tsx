import React, { Fragment, useState, useEffect } from "react";
import { Nav, BtnSideBar, Content, Children, LogOut } from "./Styles";
import { Sidebar, Segment, Menu, Icon, Header } from "semantic-ui-react";
import { ipcRenderer } from "electron";
import { useHistory } from 'react-router-dom';

export const Navbar = (props: any) => {
  const { children, isLoggued, logout } = props;
  const [visible, setVisible] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const history = useHistory();
  const maxWidth = 740;

  useEffect(() => {
    ipcRenderer.removeAllListeners("Authorization");

    ipcRenderer.on("Authorization", (evt, args) => {
      console.log(args)
      logout(history);
    });
  }, [isLoggued])

  const logoutSession = () => {
    logout(history);
  };

  window.addEventListener("resize", () => {
    setHeight(window.innerHeight);
    setWidth(window.innerWidth);

    if (window.innerWidth > maxWidth) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });
  // 740
  const onShowSideBar = () => {
    setVisible(!visible);
  };

  const onHideBar = () => {
    if (width > maxWidth) setVisible(true);
  };

  return (
    <Fragment>
      <Sidebar.Pushable>
        <Sidebar
          as={Menu}
          animation={width > 740 ? "push" : "overlay"}
          icon="labeled"
          inverted
          onHide={onHideBar}
          vertical
          visible={visible && isLoggued}
          width="thin"
        >
          {/* Nav */}
          <Menu.Item as="a" onClick={() => history.push("/")}>
            <Icon name="home" />
            Home
          </Menu.Item>
          <LogOut onClick={logoutSession} >
            <Icon name="log out" />
            Salir
          </LogOut>
        </Sidebar>

        <Sidebar.Pusher>
          <Content
            maxWidth={((width > maxWidth) && isLoggued ) ? width - 150 + "px" : 100 + "%"}
            width={((width > maxWidth) && isLoggued ) ? width - 150 : 100}
          >
            <Children height={ (height - 21)+"px" } >
              {children}
            </Children>
          </Content>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
      {!visible && (
        <BtnSideBar circular icon="sidebar" onClick={onShowSideBar} />
      )}
    </Fragment>
  );
};
