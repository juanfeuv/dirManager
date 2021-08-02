import _ from 'lodash';

import { toast } from 'react-toastify';

import React from 'react';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';

import { setPermission } from './inicioHelper';

const PermissionsModal = ({
    currentPermissions, smShow, setSmShow, getPermissions, currentPathOp,
}) => {
    const changePermission = async ({
        permission, role, value,
    }) => {
        const newPermissionsData = _.cloneDeep(currentPermissions);

        newPermissionsData[role][permission] = value;

        try {
            await setPermission({
                path: currentPathOp,
                permission: newPermissionsData,
            });

            await getPermissions({
                path: currentPathOp,
            });

            toast.success('Permiso actualizado exitosamente', {
                position: toast.POSITION.BOTTOM_LEFT,
            });
        } catch (error) {
            console.error(error);

            toast.error('Error actualizando permiso', {
                position: toast.POSITION.BOTTOM_LEFT,
            });
        }
    };

    return (
        <Modal
            size="sm"
            show={smShow}
            onHide={() => setSmShow(false)}
            aria-labelledby="example-modal-sizes-title-sm"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-sm">
                    Permisos
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ul>
                    {
                        Object                     
                            .keys(currentPermissions)
                            .map((role) => (
                                <li key={role}>
                                    <b>{role}</b>
                                    <Form>
                                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                            {
                                                Object
                                                    .keys(currentPermissions[role])
                                                    .map((permission) => (
                                                        <Form.Check
                                                            key={permission}
                                                            type="checkbox"
                                                            label={permission}
                                                            checked={currentPermissions[role][permission] || false}
                                                            onChange={() => changePermission({
                                                                role,
                                                                permission,
                                                                value: !currentPermissions[role][permission],
                                                            })}
                                                        />            
                                                    ))
                                            }
                                        </Form.Group>
                                    </Form>                                    
                                </li>
                            ))
                    }           
                </ul>                
            </Modal.Body>
        </Modal>
    );
};

export default PermissionsModal;
