import React, { Component } from 'react';

import { Collapse } from '@material-ui/core';
import { ExpandLess } from '@material-ui/icons';
import { ExpandMore } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { List } from '@material-ui/core';
import { ListItem } from '@material-ui/core';
import { ListItemText } from '@material-ui/core';
import { withStyles } from '@material-ui/core';

import networkingItems from './networkingItems.json';

import './Sidebar.scss';

const styles = {
    list: {
        width: 250,
    },
    links: {
        textDecoration: "none",
        color: "white",
    },
    listText: {
        paddingLeft: 0,
    },
    primaryTools: {
        paddingLeft: 0,
        paddingBottom: 0,
    },
};

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleClick(item) {
        this.setState((prevState) => ({ [item]: !prevState[item] }));
    }

    handler(children) {
        const { classes } = this.props;
        const { state } = this;

        return children.map((subOption) => {
            if (subOption.noChildren) {
                return (
                    <div key={subOption.name}>
                        <ListItem button key={subOption.name}>
                            <Link to={subOption.url} className={classes.links}>
                                <ListItemText primary={subOption.name} />
                            </Link>
                        </ListItem>
                    </div>
                );
            } else if (!subOption.children) {
                return (
                    <div key={subOption.name}>
                        <ListItem button key={subOption.name}>
                            <Link to={subOption.url} className={classes.links}>
                                <ListItemText primary={subOption.name} />
                            </Link>
                        </ListItem>
                    </div>
                );
            } else {
                return (
                    <div key={subOption.name}>
                        <ListItem
                            button
                            onClick={() => this.handleClick(subOption.name)}
                        >
                            <ListItemText
                                inset
                                classes={{ root: classes.listText }}
                                primary={subOption.name}
                            />
                            {state[subOption.name] ? (
                                <ExpandLess style={{ fill: "white" }} />
                            ) : (
                                <ExpandMore style={{ fill: "white" }} />
                            )}
                        </ListItem>
                        <Collapse
                            in={state[subOption.name]}
                            timeout="auto"
                            unmountOnExit
                        >
                            {this.handler(subOption.children)}
                        </Collapse>
                    </div>
                );
            }
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <div className="Sidebar">
                <Link to="/homepage" className={classes.links}>
                    <h1 className="Sidebar-title">
                        End User Suite
                    </h1>
                </Link>
                <Link to="/release" className={classes.links}>
                    <h5 className="Sidebar-release">
                        v.1.0 The Beginning 
                    </h5>
                </Link>
                <hr />
                <div className={classes.list}>
                    <div>
                        <List>{this.handler(networkingItems.data)}</List>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Sidebar);
