import React, { Fragment, FC, useEffect } from 'react'
import { FormStyle, BtnLogin } from './Styles';
import { Form, Card, Label } from 'semantic-ui-react';
import { useForm } from "react-hook-form";
import { Link } from './Styles';

// @ts-ignore
import InputField from 'components/inputField';
// @ts-ignore
import { Toast } from 'hooks/Toast';

const LoginForm: FC<any> = ({ onLogin, userReducer, router }) => {
    const { show } = Toast();
    const { loading, error, user } = userReducer;

    const { register, errors, handleSubmit }: any = useForm({
        defaultValues: {
            username: '',
            password: ''
        }
    });

    useEffect(()=>{
        if (user) {
            router.push("/");
            return;
        }

        if (error) {
            switch (error.error_code) {
                case 1:
                    show("El usuario ingresado no existe", "error");
                    break;
                case 2:
                    show("Usuario o contraseña incorrectos", "error");
                    break;
                case 50200:
                    show("Error de conexión", "error");
                    break;
                default:
                    show("Ocurrio un problema al iniciar sesión", "error");
                    break;
            }
        }
    }, [userReducer]);

    const onSubmit = (data: any) => {
        onLogin(data)
    };

    return (
    <Fragment>
        <Card.Content>
            <FormStyle>
                <InputField 
                    title="Nombre de usuario" 
                    inputData={{
                        type: "text",
                        placeholder:"Username",
                        name:"username",
                        ref: register({required: true})
                    }}
                    errors={errors.username} 
                >
                    { errors.username && "Campo requerido" }
                </InputField>

                <InputField
                    title="Contraseña" 
                    inputData={{
                        type: "password",
                        placeholder:"contraseña",
                        name:"password",
                        ref: register({required: true})
                    }}
                    errors={errors.password} 
                >
                    { errors.password && "Campo requerido" }
                </InputField>
            </FormStyle>
        </Card.Content>
        
        <Link to="/register">No tienes una cuenta?</Link>

        <BtnLogin loading={loading} onClick={handleSubmit(onSubmit)}>Login</BtnLogin>
    </Fragment>
    )
};

export default LoginForm;