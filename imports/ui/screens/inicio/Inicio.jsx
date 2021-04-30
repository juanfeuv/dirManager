import {
  BsTrash, BsPencil, BsFileEarmark, BsFolder, BsArrowsFullscreen, BsThreeDotsVertical
} from "react-icons/bs";
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover'
import Row from 'react-bootstrap/Row';
import Tooltip from 'react-bootstrap/Tooltip';

import {
  readFiles, createFile, removeFile, createDirectory, removeDirectory, renameElement, copyElement as copyElementAny,
  moveElement as moveElementAny,
} from './inicioHelper';

import CustomBreadcrumb from './CustomBreadcrumb';
import ModalConfirmacion from './ModalConfirmacion';

const validatePath = (path) => `${path}${path && path[path.length - 1] !== '/'
  ? '/'
  : ''}`

const Inicio = ({ location }) => {
  const [directoryItems, setDirectoryItems] = useState([]);
  const [fileName, setFileName] = useState('');
  const [formType, setFormType] = useState('archivo');
  const [show, setShow] = useState(false);
  const [pathToRemove, setPathToRemove] = useState('');
  const [isFileToRemove, setIsFileToRemove] = useState(false);
  const [fileNameToEdit, setFileNameToEdit] = useState('');
  const [currentOriginalNameToEdit, setCurrentOriginalNameToEdit] = useState('');
  const [smShow, setSmShow] = useState(false);
  const [currentPathOp, setCurrentPathOp] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = ({ path, isFile }) => {
    setShow(true);
    setIsFileToRemove(isFile);
    setPathToRemove(path);
  };

  const changeFormType = (event) => {
    setFormType(event.target.value);
  };

  const readFilesFromBe = async ({ path }) => {
    try {
      const response = await readFiles({ path });

      return response;
    } catch (error) {
      console.error(error);

      return [];
    }
  };

  const createItemInBe = async (event) => {
    event.preventDefault();

    try {
      if (formType === 'archivo') {
        await createFile({ path: `${validatePath(location.pathname)}${fileName}` });
      } else {
        await createDirectory({ path: `${validatePath(location.pathname)}${fileName}` });
      }

      await getFilesFromBe();

      setFileName('');

      toast.success('Elemento creado exitosamente', {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    } catch (error) {
      console.error(error);

      toast.error('Error creando elemento', {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }
  };

  const removeFileInBe = async ({ path }) => {
    try {
      await removeFile({ path });
      await getFilesFromBe();

      handleClose();

      toast.success('Archivo eliminado exitosamente', {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    } catch (error) {
      console.error(error);

      toast.error('Error eliminando archivo', {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }
  };

  const removeDirectoryInBe = async ({ path }) => {
    try {
      await removeDirectory({ path });

      await getFilesFromBe();

      handleClose();

      toast.success('Directorio eliminado exitosamente', {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    } catch (error) {
      console.error(error);

      toast.error('Error eliminando directorio', {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }
  };

  const getFilesFromBe = async () => {
    const beFiles = await readFilesFromBe({ path: location.pathname });

    setDirectoryItems(beFiles);
  };

  const renameElementInBe = async ({ oldPath, newPath }) => {
    try {
      await renameElement({ oldPath, newPath })

      await getFilesFromBe();

      toast.success('Nombre cambiado exitosamete', {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    } catch (error) {
      console.error(error);

      toast.error('Error renombrando elemento', {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }
  };

  const copyElement = () => {
    const currentOp = JSON.stringify({
      type: 'copy',
      path: currentPathOp,
    });

    localStorage.setItem('currentOp', currentOp);

    toast.success('Elemento copiado exitosamente', {
      position: toast.POSITION.BOTTOM_LEFT,
    });

    setSmShow(false);
  };

  const moveElement = () => {
    const currentOp = JSON.stringify({
      type: 'move',
      path: currentPathOp,
    });

    localStorage.setItem('currentOp', currentOp);

    toast.success('Elemento listo para mover', {
      position: toast.POSITION.BOTTOM_LEFT,
    });

    setSmShow(false);
  };

  const setModalOptions = ({ path }) => {
    setSmShow(true);

    setCurrentPathOp(path);
  };

  const currentOpType = localStorage.getItem('currentOp') && JSON.parse(localStorage.getItem('currentOp'))
    ? JSON.parse(localStorage.getItem('currentOp')).type
    : '';

  const pasteElement = async () => {
    const { path } = JSON.parse(localStorage.getItem('currentOp'));

    try {
      await copyElementAny({
        src: path,
        dest: validatePath(location.pathname),
      });

      await getFilesFromBe();

      localStorage.setItem('currentOp', null);

      toast.success('Elemento pegado exitosamente', {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    } catch (error) {
      console.error(error);

      toast.error('Error pegando elemento', {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }
  };

  const moveElementInBe = async () => {
    const { path } = JSON.parse(localStorage.getItem('currentOp'));

    try {
      await moveElementAny({
        src: path,
        dest: validatePath(location.pathname),
      });

      await getFilesFromBe();

      localStorage.setItem('currentOp', null);

      toast.success('Elemento movido exitosamente', {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    } catch (error) {
      console.error(error);

      toast.error('Error moviendo elemento', {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }
  };

  const popoverEdicion = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Cambiar nombre</Popover.Title>
      <Popover.Content>
        <Container>
          <Row>
            <Col xs={12}>
              <Form.Control
                type="text"
                placeholder="Cambiar nombre"
                value={fileNameToEdit}
                onChange={e => setFileNameToEdit(e.target.value)}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col xs={12}>
              <div style={{ float: 'right' }}>
                <Button variant="success" onClick={() => renameElementInBe({
                  oldPath: `${validatePath(location.pathname)}${currentOriginalNameToEdit}`,
                  newPath: `${validatePath(location.pathname)}${fileNameToEdit}`,
                })}>
                  Renombrar
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </Popover.Content>
    </Popover>
  );

  useEffect(() => {
    getFilesFromBe();
  }, []);

  return (
    <>
      <ModalConfirmacion
        show={show}
        handleClose={handleClose}
        removeFilePointer={removeFileInBe}
        removeDirectoryPointer={removeDirectoryInBe}
        pathToRemove={pathToRemove}
        isFileToRemove={isFileToRemove}
      />
      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Más opciones
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: 'center' }}>
          <Button
            variant="primary"
            size="sm"
            onClick={copyElement}
          >
            Copiar
          </Button>
          {' '}
          <Button
            variant="info"
            size="sm"
            onClick={moveElement}
          >
            Mover
          </Button>
        </Modal.Body>
      </Modal>
      <Container fluid>
        <Row>
          <Col xs={12}>
            <h1 style={{ textAlign: 'center' }}>Explorador de archivos</h1>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <Form onSubmit={createItemInBe}>
              <Form.Group>
                <Form.Label>Nombre del elemento</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Diligencie nombre"
                  value={fileName}
                  onChange={e => setFileName(e.target.value)}
                />
                <Form.Check
                  inline
                  name="type"
                  type="radio"
                  id="archivo"
                  label="Archivo"
                  onChange={changeFormType}
                  value="archivo"
                  checked={formType === 'archivo'}
                />
                <Form.Check
                  inline
                  name="type"
                  type="radio"
                  id="carpeta"
                  label="Carpeta"
                  onChange={changeFormType}
                  value="carpeta"
                  checked={formType === 'carpeta'}
                />
                <br />
                <Button type="submit" variant="dark">{formType === 'carpeta' ? 'Crear carpeta' : 'Crear archivo'}</Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <CustomBreadcrumb />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <DropdownButton as={ButtonGroup} title="Opciones" id="bg-nested-dropdown">
              <Dropdown.Item
                eventKey="1"
                disabled={currentOpType !== 'copy'}
                onClick={pasteElement}
              >
                Pegar
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="2"
                disabled={currentOpType !== 'move'}
                onClick={moveElementInBe}
              >
                Mover aquí
              </Dropdown.Item>
            </DropdownButton>
          </Col>
        </Row>
        <Row>
          {
            directoryItems && directoryItems.length
              ? directoryItems
                .map((file) => (
                  <Col xs={12} sm={6} md={3} key={file.name} className="p-2">
                    <Card style={{ width: '18rem' }}>
                      {
                        file.isDirectory
                          ? (
                            <Card.Body>
                              <Card.Title><BsFolder /> {file.name}</Card.Title>
                              <OverlayTrigger
                                overlay={popoverEdicion}
                                placement="right"
                                trigger="click"
                              >
                                <Button variant="light" size="sm" onClick={() => {
                                  setFileNameToEdit(file.name);
                                  setCurrentOriginalNameToEdit(file.name);
                                }}>
                                  <BsPencil />
                                </Button>
                              </OverlayTrigger>
                              {' '}
                              <OverlayTrigger
                                overlay={<Tooltip id="tooltip-disabled">Ir a carpeta</Tooltip>}
                                placement="right"
                              >
                                <Button
                                  variant="light"
                                  size="sm"
                                  href={`${validatePath(location.pathname)}${file.name}`}
                                >
                                  <BsArrowsFullscreen />
                                </Button>
                              </OverlayTrigger>
                              {' '}
                              <OverlayTrigger
                                overlay={<Tooltip id="tooltip-disabled">Eliminar Carpeta</Tooltip>}
                                placement="right"
                              >
                                <Button
                                  variant="light" size="sm"
                                  onClick={() => handleShow({
                                    path: `${validatePath(location.pathname)}${file.name}`,
                                    isFile: false,
                                  })}
                                >
                                  <BsTrash />
                                </Button>
                              </OverlayTrigger>
                              {' '}
                              <OverlayTrigger
                                overlay={<Tooltip id="tooltip-disabled">Más opciones</Tooltip>}
                                placement="right"
                              >
                                <Button
                                  variant="light"
                                  size="sm"
                                  onClick={() => setModalOptions({
                                    path: `${validatePath(location.pathname)}${file.name}`,
                                  })}
                                >
                                  <BsThreeDotsVertical />
                                </Button>
                              </OverlayTrigger>
                            </Card.Body>
                          )
                          : (
                            <>
                              <Card.Body>
                                <Card.Title><BsFileEarmark /> {file.name}</Card.Title>
                                <OverlayTrigger
                                  overlay={popoverEdicion}
                                  placement="right"
                                  trigger="click"
                                >
                                  <Button variant="light" size="sm" onClick={() => {
                                    setFileNameToEdit(file.name);
                                    setCurrentOriginalNameToEdit(file.name);
                                  }}>
                                    <BsPencil />
                                  </Button>
                                </OverlayTrigger>
                                {' '}
                                <OverlayTrigger
                                  overlay={<Tooltip id="tooltip-disabled">Eliminar Archivo</Tooltip>}
                                  placement="right"
                                >
                                  <Button
                                    variant="light" size="sm"
                                    onClick={() => handleShow({
                                      path: `${validatePath(location.pathname)}${file.name}`,
                                      isFile: true,
                                    })}
                                  >
                                    <BsTrash />
                                  </Button>
                                </OverlayTrigger>
                                {' '}
                                <OverlayTrigger
                                  overlay={<Tooltip id="tooltip-disabled">Más opciones</Tooltip>}
                                  placement="right"
                                >
                                  <Button
                                    variant="light"
                                    size="sm"
                                    onClick={() => setModalOptions({
                                      path: `${validatePath(location.pathname)}${file.name}`,
                                    })}
                                  >
                                    <BsThreeDotsVertical />
                                  </Button>
                                </OverlayTrigger>
                              </Card.Body>
                            </>
                          )
                      }
                    </Card>
                  </Col>
                ))
              : (
                <Col xs={12}>
                  <span style={{ textAlign: 'center' }}>No se encontraron archivos/carpetas</span>
                </Col>
              )
          }
        </Row>
      </Container>
    </>
  );
};

export default Inicio;
