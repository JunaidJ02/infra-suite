import React from 'react';

import { Col, Card, CardTitle, CardHeader, CardBody } from 'reactstrap';
import { Container } from 'reactstrap';
import { Row } from 'reactstrap';
import PuffLoader from 'react-spinners/PuffLoader';

import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";
import PieChart from './Patch Compliance Chart';

import TableUI from '../../../components/TableUI/TableUI';
import UnderConstruction from "../../../components/UnderConstruction/UnderConstruction";

import axios from 'axios';

import '../../../assets/scss/layout.scss';
import '../../../assets/scss/card.scss';
import { MicNone, SmsOutlined, ThumbDownSharp } from '@material-ui/icons';

import Select from 'react-dropdown-select';
import styled from '@emotion/styled';
import { keyframes, css } from '@emotion/core';

const patchComplianceData = [
    {
        TotalClients: 29546,
        Title: "Office - April 2021",
        CI_UniqueID: "ScopeId_FB3B3D41-37BF-4D8D-B313-EF6A2924E8B4\/AuthList_80BDD145-7B72-4B84-9544-8AA0EB59FA3D",
        name: "Workstations | Active",
       Installed_Not_Applicable: 28078,
        Required: 1358,
        Unknown: 110,
        Compliant: 95.03,
        NotCompliant: 4.97
    },
    {
        TotalClients: 29546,
        Title: "Office - February 2021",
        CI_UniqueID: "ScopeId_FB3B3D41-37BF-4D8D-B313-EF6A2924E8B4\/AuthList_6D01FBD7-B725-4FF7-834B-B2277EC9E0D6",
        name: "Workstations | Active",
        Installed_Not_Applicable: 28631,
        Required: 819,
        Unknown: 96,
        Compliant: 96.9,
        NotCompliant: 3.1
    },
    {
        TotalClients: 29546,
        Title: "Office - January 2021",
        CI_UniqueID: "ScopeId_FB3B3D41-37BF-4D8D-B313-EF6A2924E8B4\/AuthList_60019EE0-A194-4A3A-B45B-8BE1A5869784",
        name: "Workstations | Active",
        Installed_Not_Applicable: 29144,
        Required: 308,
        Unknown: 94,
        Compliant: 98.64,
        NotCompliant: 1.36
    },
    {
        TotalClients: 29546,
        Title: "Office - June 2021",
        CI_UniqueID: "ScopeId_FB3B3D41-37BF-4D8D-B313-EF6A2924E8B4\/AuthList_9A51E0EF-9D67-4783-B051-608FCD1C787C",
        name: "Workstations | Active",
        Installed_Not_Applicable: 11204,
        Required: 18106,
        Unknown: 236,
        Compliant: 37.92,
        NotCompliant: 62.08
    },
    {
        TotalClients: 29546,
        Title: "Office - March 2021",
        CI_UniqueID: "ScopeId_FB3B3D41-37BF-4D8D-B313-EF6A2924E8B4\/AuthList_D4048138-6A50-433D-8A61-58056BC323A8",
        name: "Workstations | Active",
        Installed_Not_Applicable: 28345,
        Required: 1106,
        Unknown: 95,
        Compliant: 95.94,
        NotCompliant: 4.06
    },
    {
        TotalClients: 29546,
        Title: "Office - May 2021",
        CI_UniqueID: "ScopeId_FB3B3D41-37BF-4D8D-B313-EF6A2924E8B4\/AuthList_3047C369-55C7-4AAD-BF45-1AD22F255722",
        name: "Workstations | Active",
        Installed_Not_Applicable: 27824,
        Required: 1581,
        Unknown: 141,
        Compliant: 94.17,
        NotCompliant: 5.83
    },
    {
        TotalClients: 29546,
        Title: "Servicing Windows 10 1909 - V3",
        CI_UniqueID: "ScopeId_FB3B3D41-37BF-4D8D-B313-EF6A2924E8B4\/AuthList_1766B3E5-197B-448B-80A1-E64B35853DBA",
        name: "Workstations | Active",
        Installed_Not_Applicable: 29065,
        Required: 410,
        Unknown: 71,
        Compliant: 98.37,
        NotCompliant: 1.63
    },
    {
        TotalClients: 29546,
        Title: "Servicing Windows 10 20H2 - V1",
        CI_UniqueID: "ScopeId_FB3B3D41-37BF-4D8D-B313-EF6A2924E8B4\/AuthList_1CF4A025-FAC8-4584-903E-8A6A214EF695",
        name: "Workstations | Active",
        Installed_Not_Applicable: 1221,
        Required: 28242,
        Unknown: 83,
        Compliant: 4.13,
        NotCompliant: 95.87
    },
    {
        TotalClients: 29546,
        Title: "Win7 ESU Prereq",
        CI_UniqueID: "ScopeId_FB3B3D41-37BF-4D8D-B313-EF6A2924E8B4\/AuthList_3BD789E4-741C-437B-B249-3508A735AAC7",
        name: "Workstations | Active",
        Installed_Not_Applicable: 29418,
        Required: 29,
        Unknown: 99,
        Compliant: 99.57,
        NotCompliant: 0.43
    },
    {
        TotalClients: 29546,
        Title: "Windows 10 - April 2021",
        CI_UniqueID: "ScopeId_FB3B3D41-37BF-4D8D-B313-EF6A2924E8B4\/AuthList_D27E0F1A-6A63-470C-8D6E-33BAEFBAE10E",
        name: "Workstations | Active",
        Installed_Not_Applicable: 27872,
        Required: 1562,
        Unknown: 112,
        Compliant: 94.33,
        NotCompliant: 5.67
    },
    {
        TotalClients: 29546,
        Title: "Windows 10 - February 2021",
        CI_UniqueID: "ScopeId_FB3B3D41-37BF-4D8D-B313-EF6A2924E8B4\/AuthList_6436B037-05C6-4F17-9C78-7D48862C1C4F",
        name: "Workstations | Active",
        Installed_Not_Applicable: 28304,
        Required: 1148,
        Unknown: 94,
        Compliant: 95.8,
        NotCompliant: 4.2
    },
    {
        TotalClients: 29546,
        Title: "Windows 10 - January 2021",
        CI_UniqueID: "ScopeId_FB3B3D41-37BF-4D8D-B313-EF6A2924E8B4\/AuthList_AC0AE7ED-C9A9-4400-B413-F446AD582E32",
        name: "Workstations | Active",
        Installed_Not_Applicable: 28475,
        Required: 977,
        Unknown: 94,
        Compliant: 96.38,
        NotCompliant: 3.62
    },
    {
        TotalClients: 29546,
        Title: "Windows 10 - June 2021",
        CI_UniqueID: "ScopeId_FB3B3D41-37BF-4D8D-B313-EF6A2924E8B4\/AuthList_21645E87-42EF-4A05-8E3D-D8E683DECC52",
        name: "Workstations | Active",
        Installed_Not_Applicable: 1421,
        Required: 27786,
        Unknown: 339,
        Compliant: 4.81,
        NotCompliant: 95.19
    },
    {
        TotalClients: 29546,
        Title: "Windows 10 - March 2021",
        CI_UniqueID: "ScopeId_FB3B3D41-37BF-4D8D-B313-EF6A2924E8B4\/AuthList_49CA318A-FFB5-4879-91F3-423898549BDB",
        name: "Workstations | Active",
        Installed_Not_Applicable: 28330,
        Required: 1121,
        Unknown: 95,
        Compliant: 95.88,
        NotCompliant: 4.12
    },
    {
        TotalClients: 29546,
        Title: "Windows 10 - May 2021",
        CI_UniqueID: "ScopeId_FB3B3D41-37BF-4D8D-B313-EF6A2924E8B4\/AuthList_E62F6F34-403F-4BA3-A69B-02F8FF03A2A6",
        name: "Workstations | Active",
        Installed_Not_Applicable: 26532,
        Required: 2888,
        Unknown: 126,
        Compliant: 89.8,
        NotCompliant: 10.2
    },
    {
        TotalClients: 29546,
        Title: "Windows 10 (1803) - April 2021",
        CI_UniqueID: "ScopeId_FB3B3D41-37BF-4D8D-B313-EF6A2924E8B4\/AuthList_98EFC548-B780-49C8-8F89-6775F393F67F",
        name: "Workstations | Active",
        Installed_Not_Applicable: 29097,
        Required: 332,
        Unknown: 117,
        Compliant: 98.48,
        NotCompliant: 1.52
    },
    {
        TotalClients: 29546,
        Title: "Windows 10 (20H2) - April 2021",
        CI_UniqueID: "ScopeId_FB3B3D41-37BF-4D8D-B313-EF6A2924E8B4\/AuthList_340790C9-7A34-4BFB-9691-3EFDD0F48DD3",
        name: "Workstations | Active",
        Installed_Not_Applicable: 29406,
        Required: 20,
        Unknown: 120,
        Compliant: 99.53,
        NotCompliant: 0.47
    },
    {
        TotalClients: 29546,
        Title: "Windows 10 (20H2) - May 2021",
        CI_UniqueID: "ScopeId_FB3B3D41-37BF-4D8D-B313-EF6A2924E8B4\/AuthList_14E8327F-03BC-4390-B743-A51C2854E7C1",
        name: "Workstations | Active",
        Installed_Not_Applicable: 29359,
        Required: 25,
        Unknown: 162,
        Compliant: 99.37,
        NotCompliant: 0.63
    },
    {
        TotalClients: 29546,
        Title: "Windows 10 1607 - December 2020",
        CI_UniqueID: "ScopeId_FB3B3D41-37BF-4D8D-B313-EF6A2924E8B4\/AuthList_0C0571C3-E209-445C-9840-55F79238A6C6",
        name: "Workstations | Active",
        Installed_Not_Applicable: 29441,
        Required: 11,
        Unknown: 94,
        Compliant: 99.64,
        NotCompliant: 0.36
    },
    {
        TotalClients: 29546,
        Title: "Windows 10 1607 - February 2021",
        CI_UniqueID: "ScopeId_FB3B3D41-37BF-4D8D-B313-EF6A2924E8B4\/AuthList_C86B182E-C570-49CE-A964-EEF71FDAC1C1",
        name: "Workstations | Active",
        Installed_Not_Applicable: 29440,
        Required: 9,
        Unknown: 97,
        Compliant: 99.64,
        NotCompliant: 0.36
    },
    {
        TotalClients: 29546,
        Title: "Windows 10 1607 - January 2021",
        CI_UniqueID: "ScopeId_FB3B3D41-37BF-4D8D-B313-EF6A2924E8B4\/AuthList_75AC6A6B-727D-4F4E-849E-965190BFADBD",
        name: "Workstations | Active",
        Installed_Not_Applicable: 28615,
        Required: 835,
        Unknown: 96,
        Compliant: 96.85,
        NotCompliant: 3.15
    },
    {
        TotalClients: 29546,
        Title: "Windows 10 1607 - June 2021",
        CI_UniqueID: "ScopeId_FB3B3D41-37BF-4D8D-B313-EF6A2924E8B4\/AuthList_6A2FD801-A82B-4872-8BBC-AD90200F5897",
        name: "Workstations | Active",
        Installed_Not_Applicable: 28284,
        Required: 835,
        Unknown: 427,
        Compliant: 95.73,
        NotCompliant: 4.27
    },
    {
        TotalClients: 29546,
        Title: "Windows 10 20H2 - June 2021",
        CI_UniqueID: "ScopeId_FB3B3D41-37BF-4D8D-B313-EF6A2924E8B4\/AuthList_7F098EEE-38F7-41CD-B6C8-EACF45B284BE",
        name: "Workstations | Active",
        Installed_Not_Applicable: 29101,
        Required: 18,
        Unknown: 427,
        Compliant: 98.49,
        NotCompliant: 1.51
    },
    {
        TotalClients: 29546,
        Title: "Windows 10 x86 - December 2020",
        CI_UniqueID: "ScopeId_FB3B3D41-37BF-4D8D-B313-EF6A2924E8B4\/AuthList_CB976F96-E0DA-453D-9E3B-3249A61089C3",
        name: "Workstations | Active",
        Installed_Not_Applicable: 29435,
        Required: 37,
        Unknown: 74,
        Compliant: 99.62,
        NotCompliant: 0.38
    },
    {
        TotalClients: 29546,
        Title: "Windows 10 x86 - February 2021",
        CI_UniqueID: "ScopeId_FB3B3D41-37BF-4D8D-B313-EF6A2924E8B4\/AuthList_C165B261-BD23-4BD6-8237-76DD8805B37F",
        name: "Workstations | Active",
        Installed_Not_Applicable: 29407,
        Required: 42,
        Unknown: 97,
        Compliant: 99.53,
        NotCompliant: 0.47
    },
    {
        TotalClients: 29546,
        Title: "Windows 7 ESU ADR",
        CI_UniqueID: "ScopeId_FB3B3D41-37BF-4D8D-B313-EF6A2924E8B4\/AuthList_144906c5-6b24-4519-acb9-e0f9124149aa",
        name: "Workstations | Active",
        Installed_Not_Applicable: 29364,
        Required: 30,
        Unknown: 152,
        Compliant: 99.38,
        NotCompliant: 0.62
    }
]

var installedData = [];
var compliantData = [];
var nonCompliantData = []

    const hide = keyframes`
    from {
      transition: height 310ms ease;
    }
    to {
      transition: height 310ms ease;
      height: 0;
      opacity: 0;
    }
  `;
  const show = keyframes`
    from {
      transition: height 310ms ease;
      height: 0;
      opacity: 0;
    }
    to {
      transition: height 310ms ease;
    }
  `;

const StyledSelect = styled(Select)`
  transition: all 0.3s ease-out;
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
    transition: all 0.3s ease-out;
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
    height: 310px;
    ${({ isOpen }) =>
      isOpen
        ? css`
            animation: ${hide} 310ms ease-in-out;
          `
        : css`
            animation: ${show} 310ms ease-in-out;
          `};
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

var patchData = [
    {
        name: "Office - April 2021",
        value: "95.03",
        description: " Compliant",
    },
    {
        name: "Office - April 2021",
        value: "4.97",
        description: " Non Compliant",
    },
]


class PatchCompliance extends React.Component {

    state = {
        installedBold: true,
        compliantBold: false,
        nonCompliantBold: false,
        currentOption: patchComplianceData.find((element) => { return element.Title == "Office - April 2021"}),
        currentData: installedData,
        doneLoading: true,
        color: "#CA0B00"
    };

    componentDidMount() {
        // this.handleChange(patchData);
    }

    handleChange = (newOption) => {
        this.setState({currentOption: patchComplianceData.find((element) => { return element.Title == newOption[0].value})}, this.makeList);
        console.log(this.state.currentOption);
    }

    makeList = () => {
        patchData = [
            {
                name: "",
                value: "",
                description: " Compliant",
            },
            {
                name: "",
                value: "",
                description: " Non Compliant",
            },
        ];
        patchData[0].name = this.state.currentOption.Title;
        patchData[0].value = this.state.currentOption.Compliant;
        patchData[1].name = this.state.currentOption.Title;
        patchData[1].value = this.state.currentOption.NotCompliant;
        this.setState({currentOption: patchData}, this.handleColor);
    }

    handleColor = () => {
        if (this.state.currentOption[1].value > this.state.currentOption[0].value) {
            this.setState({ color: "#CA0B00"}, this.doneChange)
        } else {
            this.setState({ color: "#008000"}, this.doneChange)
        }
    }

    doneChange = () => {
        console.log(this.state.currentOption);
    }

    render() {
        const titles = patchComplianceData.map((item) => ({value: item.Title, label: item.Title})); 
        const { installedBold, compliantBold,  nonCompliantBold, currentOption, currentData, doneLoading} = this.state;
        return (
            <div className="mainSection">
                <Container>
                    <Row className="row-4" style={{height: "15%"}}>
                        <Col className="col-12">
                            <Card className="contact-block">
                                <CardHeader>
                                    <h1>Patch Compliance</h1>
                                </CardHeader>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="row-2" style={{height: "13%"}}>
                        <Col className="col-12">
                            <Card className="contact-block" style={{width: "54%"}}>
                                <CardHeader>
                                    <StyledSelect
                                        options={titles}
                                        values={[]}
                                        onChange={(value) => this.handleChange(value)}
                                    />
                                </CardHeader>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="row-2">
                        <Col className="col-12">
                            <Card className="contact-block">
                                <CardHeader>
                                    <PieChart data={this.state.currentOption} color={this.state.color}/>
                                </CardHeader>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default PatchCompliance;
