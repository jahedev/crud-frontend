import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Homepage from './components/Homepage'
import AllStudents from './components/AllStudents'
import AllCampuses from './components/AllCampuses'
import SingleStudent from './components/SingleStudent'
import CreateStudent from './components/CreateStudent'
import SingleCampus from './components/SingleCampus'
import CreateCampus from './components/CreateCampus'
import Navbar from './components/Navbar'

import './css/basestyle.css'

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Router basename={process.env.PUBLIC_URL}>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Homepage} />
            <Route path='/allStudents' component={AllStudents} />
            <Route path='/allCampuses' component={AllCampuses} />
            <Route path='/singleStudent/:id' component={SingleStudent} />
            <Route path='/createStudent' component={CreateStudent} />
            <Route path='/singleCampus/:id' component={SingleCampus} />
            <Route path='/createCampus' component={CreateCampus} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App
