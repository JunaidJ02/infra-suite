import React from 'react';

import { Col, Card, CardTitle, CardHeader, CardBody } from 'reactstrap';
import { Container } from 'reactstrap';
import { Row } from 'reactstrap';

import '../assets/scss/layout.scss';
import '../assets/scss/card.scss';

class Release extends React.Component {
    render() {
        return (
            <div className="mainSection">
                <Container>
                    <Row>
                        <Col className="col-12">
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        Release Notes - The Beginning
                                    </CardTitle>
                                </CardHeader>
                                <CardBody className="card-body-1">
                                    <div className="notes">
                                        <h3>What’s New</h3>
                                        <ul>                                            
                                            <li>Created Basic Version of Site</li>
                                        </ul>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Release;
