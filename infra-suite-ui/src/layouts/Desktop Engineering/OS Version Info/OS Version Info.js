import React from 'react';

import { Col, Card, CardTitle, CardHeader, CardBody } from 'reactstrap';
import { Container } from 'reactstrap';
import { Row } from 'reactstrap';
import PuffLoader from 'react-spinners/PuffLoader';

import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";
import PieChart from './OS Version Info Chart'

import TableUI from '../../../components/TableUI/TableUI';
import UnderConstruction from "../../../components/UnderConstruction/UnderConstruction";

import axios from 'axios';

import '../../../assets/scss/layout.scss';
import '../../../assets/scss/card.scss';
import { MicNone, SmsOutlined, ThumbDownSharp } from '@material-ui/icons';

import Select from 'react-dropdown-select';
import styled from '@emotion/styled';
import { keyframes, css } from '@emotion/core';

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
    height: 150px;
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

const OSName = [
  {
    value: "Windows 7 Enterprise",
    label: "Windows 7 Enterprise",
  },
  {
    value: "Windows 10, Version 1607",
    label: "Windows 10, Version 1607",
  },
  {
    value: "Windows 10, Version 1803",
    label: "Windows 10, Version 1803",
  },
  {
    value: "Windows 10, Version 1909",
    label: "Windows 10, Version 1909",
  },
  {
    value: "Windows 10, Version 20H2",
    label: "Windows 10, Version 20H2",
  },
];

const OSVersion = [
  {
    value: "6.1 (7601)",
    label: "6.1 (7601)",
  },
  {
    value: "10.0 (14393)",
    label: "10.0 (14393)",
  },
  {
    value: "10.0 (17134)",
    label: "10.0 (17134)",
  },
  {
    value: "10.0 (18363)",
    label: "10.0 (18363)",
  },
  {
    value: "10.0 (19042)",
    label: "10.0 (19042)",
  },
]

const OSNameCount = [
  {
    name: "Windows 7 Enterprise",
    value: 2010,
  },
  {
    name: "Windows 10, Version 1607",
    value: 999,
  },
  {
    name: "Windows 10, Version 1803",
    value: 4075,
  },
  {
    name: "Windows 10, Version 1909",
    value: 2907,
  },
  {
    name: "Windows 10, Version 20H2",
    value: 796,
  },
]

const OSVersionCount = [
  {
    name: "6.1 (7601)",
    value: 2010,
  },
  {
    name: "10.0 (14393)",
    value: 999,
  },
  {
    name: "10.0 (17134)",
    value: 4075,
  },
  {
    name: "10.0 (18363)",
    value: 2907,
  },
  {
    name: "10.0 (19042)",
    value: 796,
  },
]

const OSData =
  [
     {
         ComputerName: "EO1-46J4JG2",
         Model: "OptiPlex 7040",
         last_logged_on_user: "e1931",
         AD_Site: "MIAMX",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"64-bit",
         version:"7601",
         OS_Install_Date_delayed:"2019-02-08T16:08:24.000Z",
         Manufacturer:"Dell Inc.",
         policy:"2021-06-22T23:46:22.000Z",
         last_hw:"2021-06-21T22:16:14.000Z",
         name_zero:"C:",
         free_GB:141
     },
     {
         ComputerName: "FLLGOPS-GV02X01",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_FLLPOSOP01",
         AD_Site: "FLL",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2017-05-04T15:05:48.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-09T08:22:27.000Z",
         last_hw:"2021-06-05T22:48:41.000Z",
         name_zero:"C:",
         free_GB:30
     },
     {
         ComputerName: "MKEGOGR-GV01X01",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_MKEGR02",
         AD_Site: "MKE",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2019-01-28T20:24:07.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T22:48:55.000Z",
         last_hw:"2021-06-21T03:38:55.000Z",
         name_zero:"C:",
         free_GB:28
     },
     {
         ComputerName: "MKEGOGR-GV02X01",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_MKEGR02",
         AD_Site: "MKE",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2019-01-28T20:20:23.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T23:14:50.000Z",
         last_hw:"2021-06-22T02:29:33.000Z",
         name_zero:"C:",
         free_GB:32
     },
     {
         ComputerName: "MKEGOPS-GV01X01",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_MKEPOSOP02",
         AD_Site: "MKE",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2019-01-28T20:23:55.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T23:41:44.000Z",
         last_hw:"2021-06-21T16:08:17.000Z",
         name_zero:"C:",
         free_GB:32
     },
     {
         ComputerName: "NASGOPS-GV01X01",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_NASPOSOP01",
         AD_Site: "NAS",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2015-09-05T01:00:37.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T23:31:50.000Z",
         last_hw:"2021-06-21T22:55:48.000Z",
         name_zero:"C:",
         free_GB:16
     },
     {
         ComputerName: "NASGOPS-GV01X02",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_NASPOSOP01",
         AD_Site: "NAS",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2015-09-01T23:04:54.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T23:49:41.000Z",
         last_hw:"2021-06-22T01:52:21.000Z",
         name_zero:"C:",
         free_GB:28
     },
     {
         ComputerName: "NASGOPS-GV02X01",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_NASPOSOP01",
         AD_Site: "NAS",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2015-09-02T22:47:36.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-23T00:04:06.000Z",
         last_hw:"2021-06-21T21:03:42.000Z",
         name_zero:"C:",
         free_GB:33
     },
     {
         ComputerName: "NASGOPS-GV02X02",
         Model: "VMware Virtual Platform",
         last_logged_on_user: null,
         AD_Site: "NAS",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2015-09-02T23:39:39.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T23:00:32.000Z",
         last_hw:"2021-06-21T21:23:25.000Z",
         name_zero:"C:",
         free_GB:29
     },
     {
         ComputerName: "NASGOPS-GV02X03",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_NASPOSOP01",
         AD_Site: "NAS",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2015-09-02T23:35:47.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-23T00:05:27.000Z",
         last_hw:"2021-06-22T02:32:00.000Z",
         name_zero:"C:",
         free_GB:31
     },
     {
         ComputerName: "NASGOPS-GV03X02",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_NASPOSOP01",
         AD_Site: "NAS",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2015-09-02T23:52:24.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T23:21:21.000Z",
         last_hw:"2021-06-22T03:32:56.000Z",
         name_zero:"C:",
         free_GB:33
     },
     {
         ComputerName: "NASGOPS-GV03X03",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_NASPOSOP01",
         AD_Site: "NAS",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2015-09-02T23:45:33.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T23:41:03.000Z",
         last_hw:"2021-06-21T22:01:38.000Z",
         name_zero:"C:",
         free_GB:33
     },
     {
         ComputerName: "OAKGOGR-GV01X01",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_OAKGR02",
         AD_Site: "OAK",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2016-04-07T12:21:00.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T23:29:41.000Z",
         last_hw:"2021-06-22T01:51:21.000Z",
         name_zero:"C:",
         free_GB:20
     },
     {
         ComputerName: "OAKGOGR-GV02X01",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_OAKGR02",
         AD_Site: "OAK",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2016-04-08T10:41:13.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T23:16:03.000Z",
         last_hw:"2021-06-22T05:25:14.000Z",
         name_zero:"C:",
         free_GB:21
     },
     {
         ComputerName: "OAKGOGR-GV03X01",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_OAKGR02",
         AD_Site: "OAK",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2016-04-12T11:45:44.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-23T00:02:55.000Z",
         last_hw:"2021-06-22T00:48:09.000Z",
         name_zero:"C:",
         free_GB:23
     },
     {
         ComputerName: "OAKGOGR-GV05X01",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_OAKGR02",
         AD_Site: "OAK",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2016-04-12T17:10:36.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-23T00:13:45.000Z",
         last_hw:"2021-06-21T23:54:01.000Z",
         name_zero:"C:",
         free_GB:20
     },
     {
         ComputerName: "OAKGOPS-GV01X01",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_OAKPOSOP02",
         AD_Site: "OAK",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2016-12-13T19:30:00.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-23T00:08:53.000Z",
         last_hw:"2021-06-22T03:26:22.000Z",
         name_zero:"C:",
         free_GB:24
     },
     {
         ComputerName: "OAKGOPS-GV01X02",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_OAKPOSOP02",
         AD_Site: "OAK",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2016-12-13T20:14:33.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T23:36:58.000Z",
         last_hw:"2021-06-22T02:22:31.000Z",
         name_zero:"C:",
         free_GB:24
     },
     {
         ComputerName: "OAKGOPS-GV02X01",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_OAKPOSOP02",
         AD_Site: "OAK",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2016-04-07T12:24:04.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T23:14:42.000Z",
         last_hw:"2021-06-22T00:42:31.000Z",
         name_zero:"C:",
         free_GB:23
     },
     {
         ComputerName: "OAKGOPS-GV02X02",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_OAKPOSOP02",
         AD_Site: "OAK",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2016-04-08T16:19:00.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T22:40:36.000Z",
         last_hw:"2021-06-22T02:28:03.000Z",
         name_zero:"C:",
         free_GB:23
     },
     {
         ComputerName: "OAKGOPS-GV03X01",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_OAKPOSOP02",
         AD_Site: "OAK",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2016-04-12T17:12:14.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T22:21:37.000Z",
         last_hw:"2021-06-22T01:42:41.000Z",
         name_zero:"C:",
         free_GB:23
     },
     {
         ComputerName: "OAKGOPS-GV03X02",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_OAKPOSOP02",
         AD_Site: "OAK",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2016-04-08T11:11:34.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T22:58:42.000Z",
         last_hw:"2021-06-22T02:30:48.000Z",
         name_zero:"C:",
         free_GB:21
     },
     {
         ComputerName: "OAKGOPS-GV05X01",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_OAKPOSOP02",
         AD_Site: "OAK",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2016-04-12T17:12:42.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T22:56:59.000Z",
         last_hw:"2021-06-22T00:03:34.000Z",
         name_zero:"C:",
         free_GB:21
     },
     {
         ComputerName: "OAKGOPS-GV05X02",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_OAKPOSOP02",
         AD_Site: "OAK",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2016-04-12T17:12:35.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T23:31:57.000Z",
         last_hw:"2021-06-21T21:19:09.000Z",
         name_zero:"C:",
         free_GB:17
     },
     {
         ComputerName: "PLSGOGR-GV01X01",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_PLSGR02",
         AD_Site: "PLS",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2017-10-04T15:33:38.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T23:08:55.000Z",
         last_hw:"2021-06-22T03:00:52.000Z",
         name_zero:"C:",
         free_GB:28
     },
     {
         ComputerName: "PLSGOGR-GV02X01",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_PLSGR02",
         AD_Site: "PLS",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2017-10-06T19:08:19.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-23T00:05:54.000Z",
         last_hw:"2021-06-22T03:38:12.000Z",
         name_zero:"C:",
         free_GB:24
     },
     {
         ComputerName: "PLSGOPS-TV01X01",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_PLSPOSOP02",
         AD_Site: "PLS",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2017-09-13T15:51:19.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T23:23:18.000Z",
         last_hw:"2021-06-22T01:00:47.000Z",
         name_zero:"C:",
         free_GB:23
     },
     {
         ComputerName: "PLSGOPS-TV01X02",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_PLSPOSOP02",
         AD_Site: "PLS",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2017-09-14T17:11:04.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T22:43:05.000Z",
         last_hw:"2021-06-21T01:28:22.000Z",
         name_zero:"C:",
         free_GB:27
     },
     {
         ComputerName: "PLSGOPS-TV02X01",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_PLSPOSOP02",
         AD_Site: "PLS",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2017-09-13T15:51:00.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T23:39:46.000Z",
         last_hw:"2021-06-21T03:36:41.000Z",
         name_zero:"C:",
         free_GB:26
     },
     {
         ComputerName: "PLSGOPS-TV02X02",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_PLSPOSOP02",
         AD_Site: "PLS",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2017-09-13T15:54:58.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T22:49:57.000Z",
         last_hw:"2021-06-22T00:19:23.000Z",
         name_zero:"C:",
         free_GB:26
     },
     {
         ComputerName: "PLSGOPS-TV03X01",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_PLSPOSOP02",
         AD_Site: "PLS",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2017-09-13T15:56:27.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T23:48:13.000Z",
         last_hw:"2021-06-21T02:39:57.000Z",
         name_zero:"C:",
         free_GB:28
     },
     {
         ComputerName: "PLSGOPS-TV03X02",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_PLSPOSOP02",
         AD_Site: "PLS",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2017-09-13T15:52:17.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T22:47:44.000Z",
         last_hw:"2021-06-22T00:48:53.000Z",
         name_zero:"C:",
         free_GB:26
     },
     {
         ComputerName: "PLSGOPS-TV04X01",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_PLSPOSOP02",
         AD_Site: "PLS",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2017-09-13T15:54:50.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T22:45:39.000Z",
         last_hw:"2021-06-21T03:53:52.000Z",
         name_zero:"C:",
         free_GB:26
     },
     {
         ComputerName: "PWMGOGR-GV01X01",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_PWMGR02",
         AD_Site: "PWM",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2015-04-21T21:24:51.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-23T00:07:33.000Z",
         last_hw:"2021-06-22T09:19:01.000Z",
         name_zero:"C:",
         free_GB:24
     },
     {
         ComputerName: "PWMGOPS-GV01X01",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_PWMPOSOP02",
         AD_Site: "PWM",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2015-04-22T20:39:37.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T23:33:31.000Z",
         last_hw:"2021-06-22T04:45:01.000Z",
         name_zero:"C:",
         free_GB:10
     },
     {
         ComputerName: "SJCGOGR-GV02X01",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SJCGR02",
         AD_Site: "SJC",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2018-01-15T16:58:19.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-23T00:15:17.000Z",
         last_hw:"2021-06-21T02:45:55.000Z",
         name_zero:"C:",
         free_GB:28
     },
     {
         ComputerName: "SJCGOPS-GV01X01",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SJCPOSOP02",
         AD_Site: "SJC",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2015-07-30T14:02:19.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T23:50:16.000Z",
         last_hw:"2021-06-21T02:54:12.000Z",
         name_zero:"C:",
         free_GB:68
     },
     {
         ComputerName: "SJCGOPS-GV01X02",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SJCPOSOP02",
         AD_Site: "SJC",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2015-07-30T13:30:44.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T23:15:59.000Z",
         last_hw:"2021-06-22T04:35:23.000Z",
         name_zero:"C:",
         free_GB:32
     },
     {
         ComputerName: "SJCGOPS-GV02X01",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SJCPOSOP02",
         AD_Site: "SJC",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2018-01-15T16:53:12.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T23:43:46.000Z",
         last_hw:"2021-06-22T03:11:10.000Z",
         name_zero:"C:",
         free_GB:30
     },
     {
         ComputerName: "SJCGOPS-GV05X01",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SJCPOSOP02",
         AD_Site: "SJC",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2018-01-16T13:50:34.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T22:57:25.000Z",
         last_hw:"2021-06-22T03:39:17.000Z",
         name_zero:"C:",
         free_GB:29
     },
     {
         ComputerName: "SJUGOGR-GV01X01",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SJUGR02",
         AD_Site: "SJU",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2019-06-14T19:57:49.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T22:59:26.000Z",
         last_hw:"2021-06-22T00:59:49.000Z",
         name_zero:"C:",
         free_GB:30
     },
     {
         ComputerName: "SJUGOGR-GV02X01",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SJUGR02",
         AD_Site: "SJU",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2019-06-14T19:16:13.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T23:10:59.000Z",
         last_hw:"2021-06-22T00:06:05.000Z",
         name_zero:"C:",
         free_GB:26
     },
     {
         ComputerName: "SJUGOGR-GV03X01",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SJUGR02",
         AD_Site: "SJU",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2019-06-14T21:40:39.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T23:23:05.000Z",
         last_hw:"2021-06-22T01:00:53.000Z",
         name_zero:"C:",
         free_GB:32
     },
     {
         ComputerName: "SJUGOGR-GV04X01",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SJUGR02",
         AD_Site: "SJU",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2019-06-14T19:35:29.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T23:03:02.000Z",
         last_hw:"2021-06-22T04:42:53.000Z",
         name_zero:"C:",
         free_GB:31
     },
     {
         ComputerName: "SJUGOPS-GV01X01",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SJUPOSOP02",
         AD_Site: "SJU",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2019-06-14T19:52:29.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-23T00:06:10.000Z",
         last_hw:"2021-06-21T23:21:45.000Z",
         name_zero:"C:",
         free_GB:29
     },
     {
         ComputerName: "SJUGOPS-GV01X02",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SJUPOSOP02",
         AD_Site: "SJU",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2019-06-18T22:02:31.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T23:56:55.000Z",
         last_hw:"2021-06-22T04:09:36.000Z",
         name_zero:"C:",
         free_GB:31
     },
     {
         ComputerName: "SJUGOPS-GV02X01",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SJUPOSOP02",
         AD_Site: "SJU",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2019-06-14T20:12:49.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T22:52:40.000Z",
         last_hw:"2021-06-21T19:58:25.000Z",
         name_zero:"C:",
         free_GB:33
     },
     {
         ComputerName: "SJUGOPS-GV02X02",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SJUPOSOP02",
         AD_Site: "SJU",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2019-06-14T20:13:18.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-23T00:07:55.000Z",
         last_hw:"2021-06-21T19:40:16.000Z",
         name_zero:"C:",
         free_GB:30
     },
     {
         ComputerName: "SJUGOPS-GV03X01",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SJUPOSOP02",
         AD_Site: "SJU",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2019-06-14T20:27:29.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T22:53:48.000Z",
         last_hw:"2021-06-22T02:29:38.000Z",
         name_zero:"C:",
         free_GB:32
     },
     {
         ComputerName: "SJUGOPS-GV03X02",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SJUPOSOP02",
         AD_Site: "SJU",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2019-06-14T19:30:42.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T23:20:28.000Z",
         last_hw:"2021-06-22T01:48:31.000Z",
         name_zero:"C:",
         free_GB:31
     },
     {
         ComputerName: "SJUGOPS-GV04X01",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SJUPOSOP02",
         AD_Site: "SJU",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2019-06-17T13:44:31.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T23:17:39.000Z",
         last_hw:"2021-06-22T05:29:50.000Z",
         name_zero:"C:",
         free_GB:32
     },
     {
         ComputerName: "SJUGOPS-GV04X02",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SJUPOSOP02",
         AD_Site: "SJU",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2019-06-14T19:37:52.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-23T00:04:53.000Z",
         last_hw:"2021-06-22T04:49:44.000Z",
         name_zero:"C:",
         free_GB:32
     },
     {
         ComputerName: "SMFGOGR-GB12X01",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SMFGR02",
         AD_Site: "SMF",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2014-07-02T17:37:38.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-23T00:04:05.000Z",
         last_hw:"2021-06-22T00:10:22.000Z",
         name_zero:"C:",
         free_GB:10
     },
     {
         ComputerName: "SMFGOGR-GB14X01",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SMFGR02",
         AD_Site: "SMF",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2014-03-03T15:54:08.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-23T00:04:18.000Z",
         last_hw:"2021-06-21T21:52:59.000Z",
         name_zero:"C:",
         free_GB:14
     },
     {
         ComputerName: "SMFGOGR-GB16X01",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SMFGR02",
         AD_Site: "SMF",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2014-02-27T16:42:32.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-23T00:14:48.000Z",
         last_hw:"2021-06-21T23:19:24.000Z",
         name_zero:"C:",
         free_GB:13
     },
     {
         ComputerName: "SMFGOGR-GB17X01",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SMFGR02",
         AD_Site: "SMF",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2015-03-05T18:59:22.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T23:51:40.000Z",
         last_hw:"2021-06-22T00:51:12.000Z",
         name_zero:"C:",
         free_GB:16
     },
     {
         ComputerName: "SMFGOGR-GB18X01",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SMFGR02",
         AD_Site: "SMF",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2014-02-27T16:04:35.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T22:30:59.000Z",
         last_hw:"2021-06-21T23:33:26.000Z",
         name_zero:"C:",
         free_GB:16
     },
     {
         ComputerName: "SMFGOGR-GB19X01",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SMFGR02",
         AD_Site: "SMF",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2014-02-27T17:48:15.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T22:48:33.000Z",
         last_hw:"2021-06-21T23:50:42.000Z",
         name_zero:"C:",
         free_GB:18
     },
     {
         ComputerName: "SMFGOGR-GB20X01",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SMFGR02",
         AD_Site: "SMF",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2014-07-07T13:54:49.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-23T00:03:10.000Z",
         last_hw:"2021-06-21T21:28:13.000Z",
         name_zero:"C:",
         free_GB:16
     },
     {
         ComputerName: "SMFGOGR-GB21X01",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SMFGR02",
         AD_Site: "SMF",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2012-08-01T11:49:48.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T23:45:42.000Z",
         last_hw:"2021-06-22T00:44:25.000Z",
         name_zero:"C:",
         free_GB:10
     },
     {
         ComputerName: "SMFGOGR-GB22X01",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SMFGR02",
         AD_Site: "SMF",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2014-02-27T15:44:08.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T23:28:49.000Z",
         last_hw:"2021-06-21T21:25:48.000Z",
         name_zero:"C:",
         free_GB:22
     },
     {
         ComputerName: "SMFGOGR-GB23X01",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SMFGR02",
         AD_Site: "SMF",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2014-02-27T17:46:33.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T23:25:17.000Z",
         last_hw:"2021-06-21T23:55:59.000Z",
         name_zero:"C:",
         free_GB:19
     },
     {
         ComputerName: "SMFGOGR-GV10X01",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SMFGR02",
         AD_Site: "SMF",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2018-01-17T13:44:34.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T23:02:47.000Z",
         last_hw:"2021-06-21T23:40:58.000Z",
         name_zero:"C:",
         free_GB:26
     },
     {
         ComputerName: "SMFGOGR-GV11X01",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SMFGR02",
         AD_Site: "SMF",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2018-01-17T13:46:41.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-23T00:14:16.000Z",
         last_hw:"2021-06-22T03:05:26.000Z",
         name_zero:"C:",
         free_GB:24
     },
     {
         ComputerName: "SMFGOPS-GB12X01",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SMFPOSOP02",
         AD_Site: "SMF",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2014-03-03T20:05:29.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T23:54:46.000Z",
         last_hw:"2021-06-22T00:59:22.000Z",
         name_zero:"C:",
         free_GB:17
     },
     {
         ComputerName: "SMFGOPS-GB12X02",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SMFPOSOP02",
         AD_Site: "SMF",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2014-07-02T19:16:13.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T23:38:55.000Z",
         last_hw:"2021-06-21T21:34:02.000Z",
         name_zero:"C:",
         free_GB:11
     },
     {
         ComputerName: "SMFGOPS-GB14X01",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SMFPOSOP02",
         AD_Site: "SMF",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2014-07-02T18:02:32.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T22:33:23.000Z",
         last_hw:"2021-06-21T23:43:32.000Z",
         name_zero:"C:",
         free_GB:6
     },
     {
         ComputerName: "SMFGOPS-GB14X02",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SMFPOSOP02",
         AD_Site: "SMF",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2014-03-03T20:10:28.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-23T00:10:07.000Z",
         last_hw:"2021-06-21T21:58:22.000Z",
         name_zero:"C:",
         free_GB:17
     },
     {
         ComputerName: "SMFGOPS-GB16X01",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SMFPOSOP02",
         AD_Site: "SMF",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2014-03-03T20:48:07.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T23:25:10.000Z",
         last_hw:"2021-06-21T23:35:41.000Z",
         name_zero:"C:",
         free_GB:15
     },
     {
         ComputerName: "SMFGOPS-GB16X02",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SMFPOSOP02",
         AD_Site: "SMF",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2014-03-03T20:48:58.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T23:18:30.000Z",
         last_hw:"2021-06-21T22:31:13.000Z",
         name_zero:"C:",
         free_GB:18
     },
     {
         ComputerName: "SMFGOPS-GB17X01",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SMFPOSOP02",
         AD_Site: "SMF",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2014-03-04T12:06:01.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T22:58:59.000Z",
         last_hw:"2021-06-22T00:25:48.000Z",
         name_zero:"C:",
         free_GB:17
     },
     {
         ComputerName: "SMFGOPS-GB17X02",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SMFPOSOP02",
         AD_Site: "SMF",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2014-03-04T12:13:22.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T23:43:30.000Z",
         last_hw:"2021-06-21T21:42:21.000Z",
         name_zero:"C:",
         free_GB:16
     },
     {
         ComputerName: "SMFGOPS-GB18X01",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SMFPOSOP02",
         AD_Site: "SMF",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2016-11-10T16:19:41.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T22:48:18.000Z",
         last_hw:"2021-06-22T03:28:44.000Z",
         name_zero:"C:",
         free_GB:22
     },
     {
         ComputerName: "SMFGOPS-GB18X02",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SMFPOSOP02",
         AD_Site: "SMF",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2016-11-09T14:43:01.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-23T00:13:06.000Z",
         last_hw:"2021-06-21T21:07:18.000Z",
         name_zero:"C:",
         free_GB:20
     },
     {
         ComputerName: "SMFGOPS-GB19X01",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SMFPOSOP02",
         AD_Site: "SMF",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2014-03-04T20:00:41.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T23:21:22.000Z",
         last_hw:"2021-06-22T02:19:03.000Z",
         name_zero:"C:",
         free_GB:17
     },
     {
         ComputerName: "SMFGOPS-GB19X02",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SMFPOSOP02",
         AD_Site: "SMF",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2014-03-04T19:54:54.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T23:45:00.000Z",
         last_hw:"2021-06-21T21:22:57.000Z",
         name_zero:"C:",
         free_GB:17
     },
     {
         ComputerName: "SMFGOPS-GB20X01",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SMFPOSOP02",
         AD_Site: "SMF",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2014-03-04T19:44:48.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-23T00:06:29.000Z",
         last_hw:"2021-06-21T23:29:54.000Z",
         name_zero:"C:",
         free_GB:13
     },
     {
         ComputerName: "SMFGOPS-GB20X02",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SMFPOSOP02",
         AD_Site: "SMF",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2014-03-04T19:43:17.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-23T00:03:44.000Z",
         last_hw:"2021-06-21T23:56:08.000Z",
         name_zero:"C:",
         free_GB:21
     },
     {
         ComputerName: "SMFGOPS-GB21X01",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SMFPOSOP02",
         AD_Site: "SMF",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2014-03-04T20:01:14.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T23:36:16.000Z",
         last_hw:"2021-06-21T22:05:56.000Z",
         name_zero:"C:",
         free_GB:16
     },
     {
         ComputerName: "SMFGOPS-GB21X02",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SMFPOSOP02",
         AD_Site: "SMF",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2014-03-05T17:57:57.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T23:22:03.000Z",
         last_hw:"2021-06-21T21:20:58.000Z",
         name_zero:"C:",
         free_GB:12
     },
     {
         ComputerName: "SMFGOPS-GB22X01",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SMFPOSOP02",
         AD_Site: "SMF",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2014-03-04T19:19:32.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T23:19:05.000Z",
         last_hw:"2021-06-22T01:25:00.000Z",
         name_zero:"C:",
         free_GB:23
     },
     {
         ComputerName: "SMFGOPS-GB23X01",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SMFPOSOP02",
         AD_Site: "SMF",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2014-03-04T19:21:05.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-23T00:04:54.000Z",
         last_hw:"2021-06-21T23:26:36.000Z",
         name_zero:"C:",
         free_GB:21
     },
     {
         ComputerName: "SMFGOPS-GV10X01",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SMFPOSOP02",
         AD_Site: "SMF",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2018-01-17T13:39:14.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T23:10:11.000Z",
         last_hw:"2021-06-21T22:11:25.000Z",
         name_zero:"C:",
         free_GB:22
     },
     {
         ComputerName: "SMFGOPS-GV11X02",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SMFPOSOP02",
         AD_Site: "SMF",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2018-01-17T13:45:50.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T22:59:17.000Z",
         last_hw:"2021-06-21T13:34:41.000Z",
         name_zero:"C:",
         free_GB:34
     },
     {
         ComputerName: "SMFGOPS-IB00X01",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SMFPOSOP02",
         AD_Site: "SMF",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2015-03-03T16:16:48.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T22:45:22.000Z",
         last_hw:"2021-06-22T00:13:46.000Z",
         name_zero:"C:",
         free_GB:17
     },
     {
         ComputerName: "SMFGOPS-IB00X02",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SMFPOSOP02",
         AD_Site: "SMF",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2014-03-05T22:11:26.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T23:50:16.000Z",
         last_hw:"2021-06-21T21:47:38.000Z",
         name_zero:"C:",
         free_GB:15
     },
     {
         ComputerName: "SMFGOPS-IB00X03",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SMFPOSOP02",
         AD_Site: "SMF",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2014-03-05T22:08:30.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T23:13:22.000Z",
         last_hw:"2021-06-21T23:35:35.000Z",
         name_zero:"C:",
         free_GB:18
     },
     {
         ComputerName: "SMFGOPS-IB00X04",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SMFPOSOP02",
         AD_Site: "SMF",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2014-03-05T21:47:21.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-23T00:14:47.000Z",
         last_hw:"2021-06-21T15:28:07.000Z",
         name_zero:"C:",
         free_GB:17
     },
     {
         ComputerName: "SMFGOPS-IB00X05",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SMFPOSOP02",
         AD_Site: "SMF",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2014-03-05T21:50:59.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T23:20:04.000Z",
         last_hw:"2021-06-21T22:57:49.000Z",
         name_zero:"C:",
         free_GB:14
     },
     {
         ComputerName: "SMFGOPS-IB00X06",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SMFPOSOP02",
         AD_Site: "SMF",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2014-03-05T22:03:47.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T23:07:03.000Z",
         last_hw:"2021-06-21T22:34:57.000Z",
         name_zero:"C:",
         free_GB:16
     },
     {
         ComputerName: "SMFGOPS-IB00X07",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SMFPOSOP02",
         AD_Site: "SMF",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2014-07-07T14:14:18.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T23:40:40.000Z",
         last_hw:"2021-06-21T23:42:26.000Z",
         name_zero:"C:",
         free_GB:19
     },
     {
         ComputerName: "SMFGOPS-IB00X08",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SMFPOSOP02",
         AD_Site: "SMF",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2016-11-09T13:26:21.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-23T00:05:03.000Z",
         last_hw:"2021-06-21T22:13:10.000Z",
         name_zero:"C:",
         free_GB:20
     },
     {
         ComputerName: "SMFGOPS-IB00X09",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SMFPOSOP02",
         AD_Site: "SMF",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2014-03-05T21:22:26.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T23:15:30.000Z",
         last_hw:"2021-06-21T23:07:35.000Z",
         name_zero:"C:",
         free_GB:17
     },
     {
         ComputerName: "SMFGOPS-IB00X10",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SMFPOSOP02",
         AD_Site: "SMF",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2014-03-06T20:37:03.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T23:13:01.000Z",
         last_hw:"2021-06-22T01:44:23.000Z",
         name_zero:"C:",
         free_GB:21
     },
     {
         ComputerName: "SMFGOPS-IB00X11",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SMFPOSOP02",
         AD_Site: "SMF",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2014-03-06T20:18:42.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T23:07:01.000Z",
         last_hw:"2021-06-21T22:33:00.000Z",
         name_zero:"C:",
         free_GB:17
     },
     {
         ComputerName: "SMFGOPS-IB00X12",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SMFPOSOP02",
         AD_Site: "SMF",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2014-03-06T20:20:36.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T23:49:21.000Z",
         last_hw:"2021-06-22T00:35:35.000Z",
         name_zero:"C:",
         free_GB:19
     },
     {
         ComputerName: "SMFGOPS-TB00X13",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SMFPOSOP02",
         AD_Site: "SMF",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2018-10-30T16:32:29.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T23:50:21.000Z",
         last_hw:"2021-06-21T13:32:24.000Z",
         name_zero:"C:",
         free_GB:28
     },
     {
         ComputerName: "SMFGOPS-TB00X15",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SMFPOSOP02",
         AD_Site: "SMF",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2015-10-30T19:07:10.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T23:15:30.000Z",
         last_hw:"2021-06-21T21:08:05.000Z",
         name_zero:"C:",
         free_GB:18
     },
     {
         ComputerName: "SMFGOPS-TB00X18",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SMFPOSOP02",
         AD_Site: "SMF",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2014-03-07T17:04:36.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T22:27:12.000Z",
         last_hw:"2021-06-22T00:28:02.000Z",
         name_zero:"C:",
         free_GB:20
     },
     {
         ComputerName: "SMFGOPS-TB00X19",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SMFPOSOP02",
         AD_Site: "SMF",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2014-03-06T20:06:12.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T23:54:41.000Z",
         last_hw:"2021-06-21T22:11:12.000Z",
         name_zero:"C:",
         free_GB:18
     },
     {
         ComputerName: "SMFGOPS-TB00X20",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SMFPOSOP02",
         AD_Site: "SMF",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2014-03-07T03:28:29.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-23T00:07:36.000Z",
         last_hw:"2021-06-21T16:50:29.000Z",
         name_zero:"C:",
         free_GB:22
     },
     {
         ComputerName: "SMFGOPS-TB00X21",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SMFPOSOP02",
         AD_Site: "SMF",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2014-03-07T17:02:59.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T23:14:59.000Z",
         last_hw:"2021-06-21T23:46:00.000Z",
         name_zero:"C:",
         free_GB:22
     },
     {
         ComputerName: "SMFGOPS-TV01X16",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SMFPOSOP02",
         AD_Site: "SMF",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2015-07-27T21:07:15.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T23:23:41.000Z",
         last_hw:"2021-06-21T22:33:50.000Z",
         name_zero:"C:",
         free_GB:17
     },
     {
         ComputerName: "SMFGOPS-TV01X17",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SMFPOSOP02",
         AD_Site: "SMF",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2015-07-28T19:07:12.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T23:54:35.000Z",
         last_hw:"2021-06-22T00:19:11.000Z",
         name_zero:"C:",
         free_GB:18
     },
     {
         ComputerName: "SMFGOSC-CB00X01",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SMFSKY02",
         AD_Site: "SMF",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2014-03-07T16:54:24.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-23T00:01:12.000Z",
         last_hw:"2021-06-21T14:44:48.000Z",
         name_zero:"C:",
         free_GB:22
     },
     {
         ComputerName: "SMFGOSC-CB00X03",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SMFSKY02",
         AD_Site: "SMF",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2014-03-07T17:07:53.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T23:49:06.000Z",
         last_hw:"2021-06-21T19:19:04.000Z",
         name_zero:"C:",
         free_GB:33
     },
     {
         ComputerName: "SMFGOSC-CB00X04",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SMFSKY02",
         AD_Site: "SMF",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2014-03-07T17:07:55.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-22T23:56:43.000Z",
         last_hw:"2021-06-22T00:14:21.000Z",
         name_zero:"C:",
         free_GB:31
     },
     {
         ComputerName: "SMFGOSC-CB00X05",
         Model: "VMware Virtual Platform",
         last_logged_on_user: "AL_SMFSKY02",
         AD_Site: "SMF",
         operatingSystem0:"Windows 7 Enterprise",
         operatingSystemVersion0:"6.1 (7601)",
         os_rchitecture:"32-bit",
         version:"7601",
         OS_Install_Date_delayed:"2014-03-07T16:36:06.000Z",
         Manufacturer:"VMware, Inc.",
         policy:"2021-06-23T00:09:41.000Z",
         last_hw:"2021-06-22T02:04:20.000Z",
         name_zero:"C:",
         free_GB:13
     }
 ];

class OSVersionInfo extends React.Component {

  state = {
    nameBold: true,
    versionBold: false,
    currentOption: OSName,
    currentData: OSNameCount,
    currentValue: "Windows 7 Enterprise",
    currentText: "",
  };

  componentDidMount() {
    for (let index = 0; index < OSData.length; index++) {
      this.state.currentText += OSData[index].ComputerName + " - " + OSData[index].Model + " - " + OSData[index].last_logged_on_user + " - " + OSData[index].free_GB + '\n';
    }
  }


  nameClick = () => {
    this.setState({ nameBold: true });
    this.setState({ versionBold: false });
    this.setState({ currentOption: OSName });
    this.setState({ currentData: OSNameCount });
    this.setState({ currentValue: "Windows 7 Enterprise" });
  }

  versionClick = () => {
    this.setState({ nameBold: false });
    this.setState({ versionBold: true });
    this.setState({ currentOption: OSVersion });
    this.setState({ currentData: OSVersionCount });
    this.setState({ currentValue: "6.1 (7601)" });
  }

  handleValueChange = (newValue) => {
    this.state.currentText = "";
    this.setState({ currentValue: newValue[0].label});
    var num = 0;
    if (newValue[0].label == "Windows 7 Enterprise" || newValue[0].label == "6.1 (7601)") {
      num = 25;
    } else if (newValue[0].label == "Windows 10, Version 1607" || newValue[0].label == "10.0 (14393)") {
      num = 15;
    } else if (newValue[0].label == "Windows 10, Version 1803" || newValue[0].label == "10.0 (17134)") {
      num = 10;
    } else if (newValue[0].label == "Windows 10, Version 1909" || newValue[0].label == "10.0 (18363)") {
      num = 5;
    } else {
      num = 0;
    }

    for (let index = num; index < OSData.length; index++) {
      this.state.currentText += OSData[index].ComputerName + " - " + OSData[index].Model + " - " + OSData[index].last_logged_on_user + " - " + OSData[index].free_GB + '\n';
    }
  }

  render() {
    const { nameBold, versionBold, currentData, currentOption } = this.state;
    return (
      <div className="mainSection" style={{height: "160%"}}>
        <Container>
          <Row className="row-4" style={{ height: "18%"}}>
            <Col className="col-12">
              <Card className="contact-block">
                <CardHeader>
                  <h1>OS Versions</h1>
                  <span style={{
                    fontWeight: (nameBold === true ? 'bold' : 'normal'),
                    textDecorationLine: (nameBold === true ? 'underline' : 'none'),
                    cursor: 'pointer',
                  }}
                    onClick={this.nameClick}>
                    {"Operating System Name"}
                  </span>
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <span style={{
                    fontWeight: (versionBold === true ? 'bold' : 'normal'),
                    textDecorationLine: (versionBold === true ? 'underline' : 'none'),
                    cursor: 'pointer'
                  }}
                    onClick={this.versionClick}>
                    {"Operating System Version"}
                  </span>
                </CardHeader>
              </Card>
            </Col>
          </Row>
          <Row className="row-4" style={{ height: "60%" }}>
            <Col className="col-12">
              <Card className="contact-block">
                <CardHeader>
                  <PieChart data={currentData}/>
                </CardHeader>
              </Card>
            </Col>
          </Row>

          <Row className="row-2" style={{ height: "13%" }}>
            <Col className="col-12">
              <Card className="contact-block" style={{ width: "54%" }}>
                <CardHeader>
                  
                  <StyledSelect
                    options={currentOption}
                    values={[currentOption[0]]}
                    onChange={(value) => this.handleValueChange(value)}
                  />
                </CardHeader>
              </Card>
            </Col>
          </Row>
          
          <Row className="row-2">
            <Col className="col-12" style={{overflow: "hidden", height: "130%"}}>
              <Card className="contact-block" style={{overflow: "auto", height: "130%"}}>
                <CardHeader>
                  <h1>
                    {this.state.currentValue}
                  </h1>
                  {this.state.currentText.split('\n').map(str => <p style={{color: "#CCCCCC"}}>{str}</p>)}
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
