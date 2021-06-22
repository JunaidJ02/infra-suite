import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';

import Homepage from './layouts/Homepage';
import Release from './layouts/Release'

// All of the layouts used in the dashbaord
import HealthOfCollectors from './layouts/Health of Collectors';
import HealthOfUI from './layouts/Health of UI';
import HealthOfDatabaseCollectorServers from './layouts/Health of Database Collector Servers';
import HealthOfEndUserMonitoring from './layouts/Health of End User Monitoring';
import HealthOfInfrastructure from './layouts/Health of Infrastructure';
import DeviceMonitoring from './layouts/Device Monitoring/Device Monitoring';

import './assets/scss/App.scss';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Sidebar/>

          <Switch>
            {/* Add the paths that correspond to each of the layours */}

            <Route exact path="/"><Redirect to="/homepage"/></Route>
            <Route path="/homepage" component={Homepage} />
            <Route path="/release" component={Release} />
            <Route path="/em/sl/hc" component={HealthOfCollectors}/>
            <Route path="/em/sl/hui" component={HealthOfUI}/>
            <Route path="/em/ad/hdcs" component={HealthOfDatabaseCollectorServers}/>
            <Route path="/em/ad/heum" component={HealthOfEndUserMonitoring}/>
            <Route path="/em/gr/hi" component={HealthOfInfrastructure}/>
            <Route path="/de/dm/" component={DeviceMonitoring}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;