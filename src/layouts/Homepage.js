import React from 'react';

import { Col, Card, CardTitle, CardHeader, CardBody } from 'reactstrap';
import { Container } from 'reactstrap';
import { Row } from 'reactstrap';

import TableUI from '../components/TableUI/TableUI';

import axios from 'axios';

import '../assets/scss/layout.scss';
import '../assets/scss/card.scss';

class Homepage extends React.Component {
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
                                    <CardTitle>
                                        End User Suite Team
                                    </CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <div className="half-card">
                                        <br />
                                        <b>Arevik Benavidez Torosyan</b>
                                        <p>Cyber Secruity / Analyst</p>
                                        <br></br>
                                        <b>Junaid Javed</b>
                                        <p>Front-End Developer</p>
                                        <br></br>
                                        <b>Madeline Hulcy</b>
                                        <p>Back-End Developer</p>
                                        <br></br>
                                        <b>Noah Kalinowski</b>
                                        <p>Back-End Developer</p>
                                        <br></br>
                                        <b>Sally Ben</b>
                                        <p>Front-End Developer</p>
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

export default Homepage;
