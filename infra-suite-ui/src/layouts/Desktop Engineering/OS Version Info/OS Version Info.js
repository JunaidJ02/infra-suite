import React from 'react';

import { Col, Card, CardTitle, CardHeader, CardBody, Button } from 'reactstrap';
import { Container } from 'reactstrap';
import { Row } from 'reactstrap';
import PieChart from '../Device Monitoring/Device Monitoring Chart';

import PuffLoader from 'react-spinners/PuffLoader';

import Collapsible from 'react-collapsible';

import TableUI from '../../../components/TableUI/TableUI';
import UnderConstruction from "../../../components/UnderConstruction/UnderConstruction";

import axios from 'axios';


import '../../../assets/scss/layout.scss';
import '../../../assets/scss/card.scss';
import { HelpOutline, ThreeSixtyOutlined } from '@material-ui/icons';

const options = [
    { label: "All Devices", value: 3 },
    { label: "Desktops", value: 2 },
    { label: "Laptops", value: 1 }
  ];

const allDevicesData = [
    { name: "OptiPlex 7050", value: 8525 },
    { name: "OptiPlex 5070", value: 3876 },
    { name: "OptiPlex 7040",value: 2559},
    { name: "OptiPlex 5060",value: 2386 },
    { name: "Latitude 7490", value: 2208 },
    { name: "Latitude 5400", value: 1944 },
    { name: "Latitude 7480", value: 1397 },
    { name: "Latitude 5410", value: 1090 },
    { name: "OptiPlex 9020", value: 1005 },
    { name: "OptiPlex 3080", value: 756 },
    { name: "Latitude 7290", value: 389 },
    { name: "Latitude E7470", value: 337 },
    { name: "Latitude 7280", value: 142 },
    { name: "OptiPlex 9020M", value: 141 },
    { name: "Latitude E7450", value: 81 },
    { name: "OptiPlex 7010", value: 80 },
    { name: "Latitude 5290 2-in-1", value: 64 },
    { name: "Latitude 7200 2-in-1", value: 43 },
    { name: "Latitude 5420", value: 33 },
    { name: "Latitude E7270", value: 20 },
    { name: "OptiPlex 5080", value: 15 },
    { name: "Latitude 7414", value: 12 },
    { name: "Latitude E7250", value: 8 },
    { name: "OptiPlex 790", value: 7 },
    { name: "Latitude E7440", value: 5 },
    { name: "OptiPlex 780", value: 2 },
    { name: "OptiPlex 7050-China HDD Protection", value: 1 },
    { name: "OptiPlex 760", value: 1 },
    { name: "Latitude E7240", value: 1 },
    { name: "OptiPlex 3060", value: 1 }
   ];
  
   const desktopDevicesData = [
    { name: "OptiPlex 7050", value: 8525 },
    { name: "OptiPlex 5070", value: 3876 },
    { name: "OptiPlex 7040",value: 2559},
    { name: "OptiPlex 5060",value: 2386 },
    { name: "OptiPlex 9020", value: 1005 },
    { name: "OptiPlex 3080", value: 756 },
    { name: "OptiPlex 9020M", value: 141 },
    { name: "OptiPlex 7010", value: 80 },
    { name: "OptiPlex 5080", value: 15 },
    { name: "OptiPlex 790", value: 7 },
    { name: "OptiPlex 780", value: 2 },
    { name: "OptiPlex 7050-China HDD Protection", value: 1 },
    { name: "OptiPlex 760", value: 1 },
    { name: "OptiPlex 3060", value: 1 }
   ];
  
   const laptopDevicesData = [
    { name: "Latitude 7490", value: 2208 },
    { name: "Latitude 5400", value: 1944 },
    { name: "Latitude 7480", value: 1397 },
    { name: "Latitude 5410", value: 1090 },
    { name: "Latitude 7290", value: 389 },
    { name: "Latitude E7470", value: 337 },
    { name: "Latitude 7280", value: 142 },
    { name: "Latitude E7450", value: 81 },
    { name: "Latitude 5290 2-in-1", value: 64 },
    { name: "Latitude 7200 2-in-1", value: 43 },
    { name: "Latitude 5420", value: 33 },
    { name: "Latitude E7270", value: 20 },
    { name: "Latitude 7414", value: 12 },
    { name: "Latitude E7250", value: 8 },
    { name: "Latitude E7440", value: 5 },
    { name: "Latitude E7240", value: 1 },
   ];

    function timeout(delay: number) {
        return new Promise( res => setTimeout(res, delay) );
    }


class OSVersionInfo extends React.Component {
    state = {
        allDevicesBold: true,
        desktopsBold: false,
        laptopsBold: false,
        currentDisplay: allDevicesData,
        currentDisplayName: "",
        currentDataText: " ",
        doneLoading: false,
    };

    componentDidMount() {
        this.setState({ currentDisplay: allDevicesData});
        this.setState({ allDevicesBold: true});
        this.setState({ desktopsBold: false});
        this.setState({ laptopsBold: false});
        this.setState({ currentDataText: ""});
        this.setState({ currentDisplayName: "All Devices"}, this.handleUpdate);
    }

    handleAllDevicesClick = () => {
        this.setState({ currentDisplay: allDevicesData});
        this.setState({ allDevicesBold: true});
        this.setState({ desktopsBold: false});
        this.setState({ laptopsBold: false});
        this.setState({ currentDataText: ""});
        this.setState({ currentDisplayName: "All Devices"}, this.handleUpdate);
    }

    handleDesktopsClick = () => {
        this.setState({ currentDisplay: desktopDevicesData});
        this.setState({ allDevicesBold: false});
        this.setState({ desktopsBold: true});
        this.setState({ laptopsBold: false});
        this.setState({ currentDataText: ""});
        this.setState({ currentDisplayName: "Desktops"}, this.handleUpdate);
    }

    handleLaptopsClick = () => {
        this.setState({ currentDisplay: laptopDevicesData});
        this.setState({ allDevicesBold: false});
        this.setState({ desktopsBold: false});
        this.setState({ laptopsBold: true});
        this.setState({ currentDataText: ""});
        this.setState({ currentDisplayName: "Laptops"}, this.handleUpdate);
    }

    handleUpdate = () => {
        console.log("Loading");
        this.setState({doneLoading: false});
        switch (this.state.currentDisplayName) {
            case "All Devices":
                console.log("All Devices");
                for (let index = 0; index < allDevicesData.length; index++) {
                    this.state.currentDataText += allDevicesData[index].name + " - " + allDevicesData[index].value + '\n';
                }
                break;
            case "Desktops":
                console.log("Desktops");
                for (let index = 0; index < desktopDevicesData.length; index++) {
                    this.state.currentDataText += desktopDevicesData[index].name + " - " + desktopDevicesData[index].value + '\n';
                }
                break;
            case "Laptops":
                console.log("Laptops");
                for (let index = 0; index < laptopDevicesData.length; index++) {
                    this.state.currentDataText += laptopDevicesData[index].name + " - " + laptopDevicesData[index].value + '\n';
                }
            break;
        
            default:
                console.log("oops");
                break;
        }
        console.log("Done");
        this.setState({doneLoading: true});
    }


    render() {
        const { allDevicesBold, desktopsBold,  laptopsBold } = this.state;
        return (
            <div className="mainSection" style={{overflow: "hidden"}}>
                <Container>
                    <Row className="row-3" style={{height: "30%"}}>
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
                            </Card>
                        </Col>
                    </Row>
                    <Row className="row-2">
                        <Col className="col-8">
                            <Card className="contact-block" style={{height: "35%"}}>
                                <CardHeader>
                                    <PieChart data={this.state.currentDisplay}/>
                                </CardHeader>
                            </Card>
                        </Col>
                        <Col className="col-4" style={{overflow: "hidden", height: "350%"}}>
                            <Card className="contact-block" style={{overflow: "auto", height: "35%"}}>
                                <CardHeader>
                                    <h1>{this.state.currentDisplayName}</h1>
                                    {this.state.currentDataText.split('\n').map(str => <p style={{color: "#CCCCCC"}}>{str}</p>)}
                                </CardHeader>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default OSVersionInfo;
