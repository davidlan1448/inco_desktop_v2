import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Form,
  Input,
  Message,
  Image,
  Label
} from "semantic-ui-react";
import { useForm } from "react-hook-form";

import { registerInventory } from "../../../../redux/actions/inventoryActions";
// @ts-ignore
import product_default from "../../../../assets/product_default.svg";
// @ts-ignore
import { Toast } from "hooks/Toast";
import { connect } from "react-redux";
import { SelectImage, InputImage } from "./Styles";
import { remote } from "electron";

function ModalRegister(props: any) {
  const {
    open,
    onCloseModal,
    inventoryReducer: { responseRegister, loadingRegister, errorRegister },
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
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (responseRegister) {
      onCloseModal(false);
      show("Se realizo el registro", "success");
      return;
    }

    if (errorRegister) {
      switch (errorRegister.error_code) {
        case 50200:
          onCloseModal(false);
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
    const {
      userReducer: {
        user: { idUser }
      }
    } = props;
    console.log(idUser);
    registerInventory(data, idUser);
  };

  const showFileDialog = () => {
    const file = remote.dialog.showOpenDialogSync({
      title: "Select image",
      properties: ["openFile"],
      filters: [
        { name: 'Images', extensions: ['jpg', 'png', 'gif'] }
      ]
    });

    if (file) {
      console.log(file[0].split('\\'))
      setImage(file[0]);
    } else {
      setImage(null);
    }
  };

  return (
    <Modal size="tiny" open={open}>
      <Modal.Header>Crear inventarios</Modal.Header>
      <Modal.Content scrolling>
        <Form>
          <InputImage>
            <Label>
              {/* {
                image ? 
              } */}
              Image del producto (opcional)
            </Label>
            <SelectImage>
              <div>
                <Image src={product_default} size="tiny" rounded />
                <Button onClick={ showFileDialog } circular icon="file image" />
              </div>
            </SelectImage>
          </InputImage>

          <Form.Input
            control={Input}
            label="Nombre del producto"
            placeholder="Nombre del producto"
            name="name"
            onChange={setValueInputs}
            error={showError(errors.name)}
          />

          <Form.Input
            control={Input}
            label="Precio de el producto en Bolivar"
            placeholder="Precio de el producto en Bolivar"
            name="priceProduct"
            onChange={setValueInputs}
            error={showError(errors.name)}
          />

          <Form.Input
            control={Input}
            label="Cantidad del producto"
            placeholder="Cantidad"
            name="quantity"
            onChange={setValueInputs}
            error={showError(errors.name)}
          />

          <Form.Input
            control={Input}
            label="Ganancia"
            placeholder="Ganancia"
            name="inventoryName"
            onChange={setValueInputs}
            error={showError(errors.name)}
          />

          <Form.Input
            control={Input}
            label="Precio de venta por unidad"
            placeholder="Precio de venta por unidad"
            name="price"
            onChange={setValueInputs}
            error={showError(errors.name)}
          />
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
}

const mapStateToProps = ({ userReducer, inventoryReducer }: any) => {
  return { userReducer, inventoryReducer };
};

const mapDispathToProps = {
  registerInventory
};

export default connect(mapStateToProps, mapDispathToProps)(ModalRegister);
