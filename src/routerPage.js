import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import PageMain from "./page/index"
class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={PageMain}/>
                </Switch>
            </Router>
        );
    }
}

export default App;