import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Input, Message } from "semantic-ui-react";
import { useForm } from "react-hook-form";

import { registerInventory } from "../../../../redux/actions/inventoryActions";
// @ts-ignore
import { Toast } from "hooks/Toast";
import { connect } from "react-redux";

function ModalInventory (props: any) {
  const {
    open,
    onCloseModal,
    inventoryReducer: {
      responseRegister,
      loadingRegister,
      errorRegister
    },
    registerInventory
  } = props;

  const {
    register,
    setValue,
    triggerValidation,
    handleSubmit,
    errors
  } = useForm({
    reValidateMode: "onChange",
    defaultValues: {}
  });
  const { show } = Toast();

  useEffect(() => {
    if (responseRegister) {
      onCloseModal(false);
      show("Se realizo el registro", "success");
      return;
    }

    if (errorRegister) {
      switch (errorRegister.error_code) {
        case 50200:
          show("Se registro de forma local", "info");
          break;
        default:
          break;
      }
    }
  }, [responseRegister, errorRegister]);

  useEffect(() => {
    register({ name: "inventoryName" }, { required: true });
  }, []);

  const setValueInputs = async (e: any, { name, value }: any) => {
    setValue(name, value);
    await triggerValidation(name);
  };

  const showError = (err: any) => {
    let message: string;

    if (err === undefined) return false;

    switch (err.type) {
      case "required":
        message = "Campo requerido";
        break;
      case "pattern":
        message = "Sin caracteres especiales";
      default:
        message = "Campo invalido";
        break;
    }

    return {
      content: message
    };
  };

  const onSubmit = (data: any) => {
    const { userReducer: { user: { idUser } } } = props;
    console.log(idUser)
    registerInventory(data, idUser);
  };

  return (
    <Modal size="tiny" open={open}>
      <Modal.Header>Crear inventarios</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Input
            control={Input}
            label="Nombre del inventario"
            placeholder="Nombre del inventario"
            name="inventoryName"
            onChange={setValueInputs}
            error={showError(errors.name)}
          />
          {
            errorRegister && (
              <Message negative>
                <Message.Header>We're sorry we can't apply that discount</Message.Header>
                <p>That offer has expired</p>
              </Message>
            )
          }
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button
          negative
          onClick={() => {
            onCloseModal(false);
          }}
        >
          Cerrar
        </Button>
        <Button
          loading={loadingRegister}
          disabled={loadingRegister}
          onClick={handleSubmit(onSubmit)}
        >
          Aceptar
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

const mapStateToProps = ({ userReducer, inventoryReducer }: any) => {
  return { userReducer, inventoryReducer };
};

const mapDispathToProps = {
  registerInventory
}

export default connect(mapStateToProps, mapDispathToProps) (ModalInventory);
