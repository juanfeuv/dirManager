import { BsTrash, BsPencil } from "react-icons/bs";
import React, { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Row from 'react-bootstrap/Row';
import Tooltip from 'react-bootstrap/Tooltip';

import { readFiles, createFile, removeFile } from './inicioHelper';



const Inicio = () => {
  const [files, setFiles] = useState([]);
  const [fileName, setFileName] = useState('');

  const readFilesFromBe = async ({ path }) => {
    try {
      const response = await readFiles({ path });

      return response;
    } catch (error) {
      console.error(error);

      return [];
    }
  };

  const createFileInBe = async (event) => {
    event.preventDefault();

    try {
      await createFile({ path: fileName });
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
    const beFiles = await readFilesFromBe({ path: '' });

    setFiles(beFiles);
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
            <Form onSubmit={createFileInBe}>
              <Form.Group>
                <Form.Label>Nombre del archivo</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Diligencie nombre"
                  value={fileName}
                  onChange={e => setFileName(e.target.value)}
                />
                <br />
                <Button type="submit" variant="dark">Crear archivo</Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Row>
          {
            files && files.length
              ? files
                .map((file) => (
                  <Col xs={12} md={4} key={file}>
                    <ul>
                      <li>
                        {file}
                        {' '}
                        <OverlayTrigger
                          overlay={<Tooltip id="tooltip-disabled">Editar Archivo</Tooltip>}
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
                            onClick={() => removeFileInBe({ path: file })}
                          >
                            <BsTrash />
                          </Button>
                        </OverlayTrigger>
                      </li>
                    </ul>
                  </Col>
                ))
              : (
                <Col xs={12}>
                  <span style={{ textAlign: 'center' }}>No se encontraron archivos</span>
                </Col>
              )
          }
        </Row>
      </Container>
    </div>
  );
};

export default Inicio;
