import {
  BsTrash, BsPencil, BsFileEarmark, BsFolder, BsArrowsFullscreen
} from "react-icons/bs";
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover'
import Row from 'react-bootstrap/Row';
import Tooltip from 'react-bootstrap/Tooltip';

import { readFiles, createFile, removeFile, createDirectory, removeDirectory, renameElement } from './inicioHelper';

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
