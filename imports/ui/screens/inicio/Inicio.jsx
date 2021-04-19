import {
  BsTrash, BsPencil, BsFileEarmark, BsFolder,
} from "react-icons/bs";
import React, { useState, useEffect } from 'react';

import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Row from 'react-bootstrap/Row';
import Tooltip from 'react-bootstrap/Tooltip';

import { readFiles, createFile, removeFile, createDirectory } from './inicioHelper';

const Inicio = ({ location }) => {
  const [directoryItems, setDirectoryItems] = useState([]);
  const [fileName, setFileName] = useState('');
  const [formType, setFormType] = useState('archivo');

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
        await createFile({ path: `${location.pathname}/${fileName}` });
      } else {
        await createDirectory({ path: `${location.pathname}/${fileName}` });
      }

      getFilesFromBe();

      setFileName('');
    } catch (error) {
      console.error(error);
    }
  };

  const removeFileInBe = async ({ path }) => {
    try {
      await removeFile({ path });
      getFilesFromBe();
    } catch (error) {
      console.error(error);
    }
  };

  const getFilesFromBe = async () => {
    const beFiles = await readFilesFromBe({ path: location.pathname });

    setDirectoryItems(beFiles);
  };

  const getAllPaths = () => {
    const routes = location.pathname
      .split('/');


    return routes
      .map((route, key) => ({
        name: route,
        path: routes
          .slice(0, key)
          .join('/'),
      }));
  };

  useEffect(() => {
    getFilesFromBe();
  }, []);

  return (
    <div>
      <Container fluid>
        <Row>
          <Col xs={12}>
            <h1 style={{ textAlign: 'center' }}>Archivos</h1>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <Form onSubmit={createItemInBe}>
              <Form.Group>
                <Form.Label>Nombre del archivo</Form.Label>
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
                <Button type="submit" variant="dark">Crear archivo</Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Breadcrumb>
              {
                getAllPaths()
                  .map((route, key) => (
                    <Breadcrumb.Item href={route.path} key={`${route.name}-${key}`}>
                      {route.name}
                    </Breadcrumb.Item>
                  ))
              }
            </Breadcrumb>
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
                                overlay={<Tooltip id="tooltip-disabled">Cambiar Nombre</Tooltip>}
                                placement="right"
                              >
                                <Button variant="light" size="sm">
                                  <BsPencil />
                                </Button>
                              </OverlayTrigger>
                              {' '}
                              <OverlayTrigger
                                overlay={<Tooltip id="tooltip-disabled">Eliminar Carpeta</Tooltip>}
                                placement="right"
                              >
                                <Button
                                  variant="light" size="sm"
                                  onClick={() => removeFileInBe({ path: `${location.pathname}${file.name}` })}
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
                                  overlay={<Tooltip id="tooltip-disabled">Cambiar Nombre</Tooltip>}
                                  placement="right"
                                >
                                  <Button variant="light" size="sm">
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
                                    onClick={() => removeFileInBe({ path: `${location.pathname}${file.name}` })}
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
    </div>
  );
};

export default Inicio;
