import React, { Component } from "react"

import { connect } from "react-redux"
import { getStudentById } from "../redux/reducers"

class StudentById extends Component {
  state = {
    studentId:
      this.props.studentId === undefined ? undefined : this.props.studentId,
  }

  // needed to render student on visiting .../singleStudent/id
  componentDidMount = async () => {
    if (this.state.studentId !== undefined) {
      await this.props.getStudentById(this.state.studentId)
    }
  }

  // FORM FUNCTIONS NOT NEEDED
  // handleChange = (e) => {
  //   this.setState({
  //     [e.target.name]: e.target.value,
  //   })

  //   setTimeout(() => {
  //     console.log(this.state.studentId)
  //   }, 100)
  // }

  // submitForm = async (e) => {
  //   e.preventDefault()
  //   await this.fetchStudentById(this.state.studentId)
  // }

  // fetchStudentById = async (studentId) => {
  //   await this.props.getStudentById(studentId)

  //   setTimeout(() => {
  //     console.log(this.props.student)
  //   }, 100)
  // }

  //
  //
  // THIS COMPONENT IS NO LONGER NECESSARY. DELETE LATER *******************
  //
  //

  render() {
    console.log(
      "current state of studentId in studentById:",
      this.state.studentId
    )
    return (
      <div>
        {/* <Link to="/">Return Home</Link>
        <br /> */}

        {/* <p>Search for a student by ID</p> */}
        {/* FORM NOT NEEDED <form onSubmit={(e) => this.submitForm(e)}>
          <label>
            <input
              type="number"
              name="studentId"
              placeholder="e.g. 1"
              onChange={(e) => this.handleChange(e)}
            />
          </label>

          <input type="submit" value="Submit" />
        </form> */}

        {/* {this.props.student !== undefined && this.props.student != "" ? (
          <Student
            id={this.props.student.id}
            studentname={this.props.student.studentname}
            email={this.props.student.email}
            image={this.props.student.image}
            gpa={this.props.student.gpa}
            CampusId={this.props.student.CampusId}
          />
        ) : (
          <span></span>
        )} */}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    student: state.student,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getStudentById: (searchStudentId) =>
      dispatch(getStudentById(searchStudentId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentById)
