import React, { Component, Fragment } from "react";
import { Cardlogin, Content } from "./Styles";
import { Card } from "semantic-ui-react";
import { connect } from "react-redux";
import * as usersActions from "../../../redux/actions/userActions";
import { MdPerson, MdLock } from "react-icons/md";
import LoginForm from "./components/LoginForm/LoaginForm";

class Login extends Component<any> {
  render() {
    const { userReducer, login, history } = this.props;
    
    return (
      <Content>
        <Cardlogin>
          <Card.Content>
            <Card.Header>Inicio de sesión</Card.Header>
          </Card.Content>

          <LoginForm
            router={history}
            userReducer={userReducer}
            onLogin={(values: any) => {
              login(values);
            }}
          />
        </Cardlogin>
      </Content>
    );
  }
}

const mapStateToProps = ({ userReducer }: any) => {
  return { userReducer };
};

export default connect(mapStateToProps, usersActions)(Login);
