import React, { Component } from "react";
import { PuffLoader } from "react-spinners";

import { Table } from "reactstrap";

import "./TableUI.scss";

class TableUI extends Component {
    render() {
        if (this.props.loading === true) {
            return (
                <div className="loader">
                    <PuffLoader
                        size={120}
                        color={"#1f8ef1"}
                        loading={true}
                    />
                </div>
            )
        } else {
            return (
                <div className="table">
                    <Table className="tablesorter" responsive>
                        <thead className="text-primary">
                            <tr>
                                {this.props.tableTitle.map((title, index) => (
                                    // <th onClick="sorttable(index)">{title}</th>
                                    <th key={title}>{title}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.tableBody.map((row) => (
                                <tr key={row}>
                                    {row.map((item) => (
                                        <td key={item}>{item}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            );
        }
    }
}

export default TableUI;
