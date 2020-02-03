import React, { useState } from 'react';
import { CardHeader, HeaderComponent, Back } from './Styles';
import ModalRegister from "../ModalRegister/index";
import { Button } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

export const Header = () => {
    const history = useHistory();
    const [modal, setModal] = useState({ open: false });

    const openModal = () => {
        setModal({
        ...modal,
        open: true
        });
    };

    const goBack = () => {
        history.goBack();
    }

    return (
        <CardHeader>
          <HeaderComponent>
            <Back>
                <Button circular icon="arrow left" onClick={goBack} />
                <h2>Inventarios</h2>
            </Back>

            <div>
              <Button circular icon="search" />
              <Button circular icon="add" onClick={ openModal } />
            </div>
          </HeaderComponent>

          <ModalRegister 
            open={ modal.open }
            onCloseModal={(state: boolean) =>
                setModal({
                    ...modal,
                    open: false
                })
            }
          />
        </CardHeader>
    );
}
