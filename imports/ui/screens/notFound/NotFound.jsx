import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image'
import React from 'react';
import Row from 'react-bootstrap/Row';

const NotFound = () => (
    <Container fluid>
        <Row>
            <Col xs={12}>
                <h1 style={{ textAlign: 'center' }}>
                    404
                </h1>
            </Col>
        </Row>
        <Row>
            <Col xs={12}>
                <h2 style={{ textAlign: 'center' }}>
                    Page Not Found
                </h2>
            </Col>
        </Row>
        <br />
        <Row >
            <Col xs={12}>
                <Image
                    src="file.png"
                    roundedCircle
                    rounded
                    style={{
                        width: '300px',
                        height: '300px',
                        display: 'block',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                    }}
                />
            </Col>
        </Row>
    </Container>
);

export default NotFound;