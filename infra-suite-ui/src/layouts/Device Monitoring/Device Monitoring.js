import React from 'react';

import { Col, Card, CardTitle, CardHeader, CardBody, Button } from 'reactstrap';
import styled from '@emotion/styled';
import { Container } from 'reactstrap';
import { Row } from 'reactstrap';
import PieChart from './All Devices';
import Select from 'react-dropdown-select';

import TableUI from '../../components/TableUI/TableUI';
import UnderConstruction from "../../components/UnderConstruction/UnderConstruction";

import axios from 'axios';


import '../../assets/scss/layout.scss';
import '../../assets/scss/card.scss';
import { HelpOutline, ThreeSixtyOutlined } from '@material-ui/icons';

const options = [
    { label: "All Devices", value: 3 },
    { label: "Desktops", value: 2 },
    { label: "Laptops", value: 1 }
  ];

const StyledSelect = styled(Select)`
  background: #333;
  border: #333 !important;
  color: #fff;
  width: 500px;
  
  .react-dropdown-select-clear,
  .react-dropdown-select-dropdown-handle {
    color: #fff;
  }
  .react-dropdown-select-option {
    border: 1px solid #fff;
  }
  .react-dropdown-select-item {
    color: #333;
  }
  .react-dropdown-select-input {
    color: #fff;
  }
  .react-dropdown-select-dropdown {
    position: absolute;
    left: 0;
    border: none;
    width: 500px;
    padding: 0;
    display: flex;
    flex-direction: column;
    border-radius: 2px;
    max-height: 300px;
    overflow: auto;
    z-index: 9;
    background: #333;
    box-shadow: none;
    color: #fff !important;
  }
  .react-dropdown-select-item {
    color: #f2f2f2;
    border-bottom: 1px solid #333;
       
    :hover {
       color: #ffffff80;
    }
  }
  .react-dropdown-select-item.react-dropdown-select-item-selected,
  .react-dropdown-select-item.react-dropdown-select-item-active {
    //background: #111;
    border-bottom: 1px solid #333;
    color: #fff;
    font-weight: bold;
  }
  .react-dropdown-select-item.react-dropdown-select-item-disabled {
    background: #777;
    color: #ccc;
  }
`;


class DeviceMonitoring extends React.Component {
    state = {
        allDevicesBold: true,
        desktopsBold: false,
        laptopsBold: false,
    };

    handleAllDevicesClick = () => {
        this.setState({ allDevicesBold: true});
        this.setState({ desktopsBold: false});
        this.setState({ laptopsBold: false});
    }

    handleDesktopsClick = () => {
        this.setState({ allDevicesBold: false});
        this.setState({ desktopsBold: true});
        this.setState({ laptopsBold: false});
    }

    handleLaptopsClick = () => {
        this.setState({ allDevicesBold: false});
        this.setState({ desktopsBold: false});
        this.setState({ laptopsBold: true});
    }

    render() {
        const { allDevicesBold, desktopsBold,  laptopsBold } = this.state;
        return (
            <div className="mainSection">
                <Container>
                    <Row className="row-2">
                        <Col className="col-12">
                            <Card className="contact-block">
                            <CardHeader>
                                <h1>Device Monitoring</h1>
                                <>
                                <span style = {{
                                            fontWeight: (allDevicesBold === true ? 'bold' : 'normal'),
                                            textDecorationLine: (allDevicesBold === true ? 'underline' : 'none'),
                                            cursor:'pointer',
                                        }} 
                                        onClick={this.handleAllDevicesClick}> 
                                    {"All Devices"} 
                                </span>
                                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> 
                                <span style = {{
                                            fontWeight: (desktopsBold === true ? 'bold' : 'normal'),
                                            textDecorationLine: (desktopsBold === true ? 'underline' : 'none'),
                                            cursor:'pointer'
                                        }} 
                                        onClick={this.handleDesktopsClick}> 
                                    {"Desktops"} 
                                </span>
                                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> 
                                <span style = {{
                                            fontWeight: (laptopsBold === true ? 'bold' : 'normal'),
                                            textDecorationLine: (laptopsBold === true ? 'underline' : 'none'),
                                            cursor:'pointer'
                                        }} 
                                        onClick={this.handleLaptopsClick}> 
                                    {"Laptops"} 
                                </span>
                                </>
                            </CardHeader>
                                <PieChart/>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default DeviceMonitoring;
