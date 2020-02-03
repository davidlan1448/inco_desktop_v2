import React, { Fragment, useEffect } from "react";
import { Card, Form, Input } from "semantic-ui-react";
import { Buttons, BtnRegister } from "./Styles";
// @ts-ignore
import { Toast } from "hooks/Toast";

import { useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import { Link } from "react-router-dom";

export const RegisterForm = ({
  onRegister,
  userData,
  coinsData,
  router
}: any) => {
  const {
    register,
    errors,
    handleSubmit,
    setValue,
    setError,
    clearError,
    watch,
    triggerValidation
  }: any = useForm({
    defaultValues: {
      password: "",
      Cpassword: ""
    }
  });

  const { show } = Toast();

  useEffect(() => {
    const { responseRegister, registerError } = userData;

    if (responseRegister) {
      router.push("/");
      show("Se realizo el registro", "success");
      return;
    }

    if (registerError) {
      switch (registerError.error_code) {
        case 1:
          show("El username ya esta en uso", "error");
          break;
        case 2:
          show("El correo ya esta en uso", "error");
          break;
        case 50200:
          show("Error de conexión", "error");
          break;
        default:
          show("Ocurrio un error al registrar", "error");
          break;
      }
    }
  }, [userData]);

  useEffect(() => {
    register({ name: "name" }, { required: true });
    register({ name: "lastName" }, { required: true });
    register(
      { name: "email" },
      {
        required: true,
        pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      }
    );
    register({ name: "username" }, { required: true });
    register({ name: "password" }, { required: true, minLength: 6 });
    register({ name: "Cpassword" }, { required: true });
    register({ name: "idCoin" }, { required: true });
  }, []);

  const onSubmit = (data: any) => {
    onRegister(data);
  };

  const setValueInputs = async (e: any, { name, value }: any) => {
    setValue(name, value);
    await triggerValidation({ name });
  };

  const validateRepeatPassword = (e: any) => {
    const Cpassword: string = watch("Cpassword");
    const password: string = watch("password");

    if (Cpassword.trim() === "") {
      return;
    }

    if (Cpassword !== password) {
      setError("Cpassword", "repeatPassword", "error");
    } else clearError("Cpassword");
  };

  const showError = (err: any) => {
    let message: string;

    if (err === undefined) return false;

    switch (err.type) {
      case "required":
        message = "Campo requerido";
        break;
      case "pattern":
        message = "Correo inválido";
        break;
      case "repeatPassword":
        message = "Las contraseñas no coinciden";
        break;
      case "minLength":
        message = "Minimo 6 caracteres";
        break;
      default:
        message = "Campo invalido";
        break;
    }

    return {
      content: message
    };
  };

  return (
    <Card.Content>
      <Form>
        <Form.Group widths="equal">
          <Form.Input
            control={Input}
            label="Nombre"
            placeholder="Nombre"
            name="name"
            onChange={setValueInputs}
            error={showError(errors.name)}
          />

          <Form.Input
            control={Input}
            label="Apellido"
            placeholder="Apellido"
            name="lastName"
            onChange={setValueInputs}
            error={showError(errors.lastName)}
          />
        </Form.Group>

        <Form.Group widths="equal">
          <Form.Input
            control={Input}
            label="Correo"
            placeholder="Correo"
            name="email"
            onChange={setValueInputs}
            error={showError(errors.email)}
          />

          <Form.Input
            control={Input}
            label="Nombre de usuario"
            placeholder="Nombre de usuario"
            name="username"
            onChange={setValueInputs}
            error={showError(errors.username)}
          />
        </Form.Group>

        <Form.Group widths="equal">
          <Form.Input
            control={Input}
            label="Contraseña"
            placeholder="Contraseña"
            name="password"
            type="password"
            onChange={(e, { name, value }) => {
              setValueInputs(e, { name, value });
              validateRepeatPassword(e);
            }}
            error={showError(errors.password)}
          />

          <Form.Input
            control={Input}
            label="Confirmar contraseña"
            placeholder="Confirmar contraseña"
            name="Cpassword"
            type="password"
            onChange={(e, { name, value }) => {
              setValueInputs(e, { name, value });
              validateRepeatPassword(e);
            }}
            error={showError(errors.Cpassword)}
          />
        </Form.Group>

        <Form.Select
          loading={coinsData.loading}
          label="Moneda"
          name="idCoin"
          options={coinsData.coins.map((coin: any) => ({
            key: coin.id_coin,
            text: coin.name,
            value: coin.id_coin
          }))}
          placeholder="Seleccionar moneda..."
          onChange={setValueInputs}
          error={showError(errors.idCoin)}
        />
      </Form>

      <Buttons>
        <Link to="/">
          <Form.Button>Cancel</Form.Button>
        </Link>
        <BtnRegister
          loading={userData.registerLoading}
          disabled={userData.registerLoading}
          onClick={handleSubmit(onSubmit)}
        >
          Registrar
        </BtnRegister>
      </Buttons>
    </Card.Content>
  );
};
