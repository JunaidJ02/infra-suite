import React, { Component } from 'react'

import './UnderConstruction.scss'
import '../../assets/img/underConstruction.png'

class UnderConstruction extends Component { 

    render() {
      return (
        <div className="construction">
           <img
                src={require("../../assets/img/underConstruction.png")}
                alt="img of PO"
                height="100px"
            />
        </div>
      )
    }
}

export default UnderConstruction;