import React, { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

import { readFiles, createFile } from './inicioHelper';



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
                      <li>{file}</li>
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
