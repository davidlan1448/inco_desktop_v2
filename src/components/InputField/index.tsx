import React, { FC } from 'react';
import { Form, Label } from 'semantic-ui-react';

type InputFieldProps = {
    title: string; 
    inputData: any;
    errors: any;
    children: any;
}

const InputField: FC<InputFieldProps> = ({ title, inputData, errors, children }: InputFieldProps) => {
    return (
        <Form.Field error={(errors !== undefined)}>
            <label>{title}</label>
            <input { ...inputData }/>
            {errors && 
                <Label basic color='red' pointing>
                    {children}
                </Label>
            }
        </Form.Field>
    );
}

export default InputField;