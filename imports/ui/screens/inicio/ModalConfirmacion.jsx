import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import PropTypes from 'prop-types';
import React from 'react';

const ModalConfirmacion = ({
    show, handleClose, removeFilePointer, pathToRemove, isFileToRemove, removeDirectoryPointer
}) => {
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>¿Desea eliminar el elemento?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="danger" onClick={() => isFileToRemove
                        ? removeFilePointer({ path: pathToRemove })
                        : removeDirectoryPointer({ path: pathToRemove })}>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

ModalConfirmacion.defaultProps = {
    removeFilePointer: () => { },
    removeDirectoryPointer: () => { },
    PropTypes: '',
};

ModalConfirmacion.propTypes = {
    handleClose: PropTypes.func.isRequired,
    removeFilePointer: PropTypes.func,
    show: PropTypes.bool.isRequired,
    pathToRemove: PropTypes.string,
    isFileToRemove: PropTypes.bool.isRequired,
    removeDirectoryPointer: PropTypes.func,
};

export default ModalConfirmacion;
