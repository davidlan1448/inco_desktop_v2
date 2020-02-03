import React, { Fragment, Component } from "react";
import { Content, CardRegister } from "./Styles";
import { Card } from "semantic-ui-react";
import { RegisterForm } from "./components/RegisterForm";
import { connect } from "react-redux";

// @ts-ignore
import * as coinActions from 'reduxPath/actions/coinActions';
// @ts-ignore
import { register } from 'reduxPath/actions/userActions';

class Register extends Component<any> {

  componentDidMount () {
    console.log(this.props)
    const { getCoins } = this.props;
    getCoins();
  }

  registerUser = (user: any) => {
    const { register } = this.props;

    delete user.Cpassword;
    register(user);
  }

  render() {
    const { coinReducer: {coin, loading}, userReducer, history } = this.props;

    return (
      <Content>
        <CardRegister>
          <Card.Content>
            <Card.Header>Formulario de registro</Card.Header>
          </Card.Content>

          <RegisterForm 
            coinsData={{coins: coin, loading}}
            onRegister={this.registerUser}
            userData={userReducer}
            router={history}
          />
        </CardRegister>
      </Content>
    );
  }
}

const mapStateToProps = ({ coinReducer, userReducer }: any) => {
  return { coinReducer, userReducer };
};

const mapDispatchToProps = { 
  register,
  ...coinActions
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
