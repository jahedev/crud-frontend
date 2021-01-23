import React, { Component } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import Homepage from "./components/Homepage"
import AllStudents from "./components/AllStudents"
import StudentById from "./components/StudentById"
import AllCampuses from "./components/AllCampuses"
import DeleteStudent from "./components/DeleteStudent"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route path="/allStudents" component={AllStudents} />
            <Route path="/studentById" component={StudentById} />
            <Route path="/allCampuses" component={AllCampuses} />
            <Route path="/deleteStudent" component={DeleteStudent} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App
