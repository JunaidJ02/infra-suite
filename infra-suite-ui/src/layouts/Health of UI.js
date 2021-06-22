import React from 'react';

import { Col, Card, CardTitle, CardHeader, CardBody } from 'reactstrap';
import { Container } from 'reactstrap';
import { Row } from 'reactstrap';

import TableUI from '../components/TableUI/TableUI';
import UnderConstruction from "../components/UnderConstruction/UnderConstruction";

import axios from 'axios';

import '../assets/scss/layout.scss';
import '../assets/scss/card.scss';

class HealthOfUI extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="mainSection">
                <Container>
                    <Row className="row-2">
                        <Col className="col-12">
                            <Card className="contact-block">
                                <CardHeader>
                                <UnderConstruction/>
                                    <CardTitle>
                                        Health of UI
                                    </CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <div className="half-card">
                                        <b>Nothing Here :(</b>
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

export default HealthOfUI;
