import React, { Component } from 'react'

import { Link, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'
import { getCampusById, updateCampus, deleteCampus } from '../redux/reducers'

import Student from './Student'
import CreateStudent from './CreateStudent'
import HalfHeaderBG from './HalfHeaderBG'

class SingleCampus extends Component {
  state = {
    redirect: false,
    editing: false,
    addingStudent: false,
    campusInfo: {
      id: this.props.match.params.id, // id from url
      campusname: this.props.campus.campusname,
      image: this.props.campus.image,
      address: this.props.campus.address,
      description: this.props.campus.description,
    },
  }

  componentDidMount = async () => {
    await this.props.getCampusById(this.props.match.params.id)
  }

  handleDelete = () => {
    this.props.deleteCampus(this.props.match.params.id)

    setTimeout(() => {
      this.setState({
        redirect: true,
      })
    }, 500)
  }

  handleEditChange = (e) => {
    this.setState({
      campusInfo: {
        ...this.state.campusInfo,
        [e.target.name]: e.target.value,
      },
    })
  }

  handleEditSubmit = (e) => {
    e.preventDefault()

    this.props.updateCampus(this.state.campusInfo)

    setTimeout(() => {
      this.props.getCampusById(this.props.match.params.id)
    }, 300)

    setTimeout(() => {
      this.setState({
        editing: false,
      })
    }, 600)
  }

  render() {
    console.log('Students of campus:', this.props.campus.Students)
    if (this.state.redirect === true) {
      return <Redirect to='/allCampuses' />
    }
    if (!this.state.editing) {
      return (
        <div>
          <HalfHeaderBG
            imgdiv='half-bg-campuses'
            title={this.props.campus.campusname}
          />
          <div className='content'>
            <div>
              <button onClick={() => this.handleDelete()}>Delete Campus</button>
            </div>
            {this.props.campus !== undefined ? (
              <div>
                <img src={this.props.campus.image} className='campusImages' />
                <p>Name: {this.props.campus.campusname}</p>
                <p>Address: {this.props.campus.address}</p>
                <p>Description: {this.props.campus.description}</p>
                <div>
                  <button onClick={() => this.setState({ editing: true })}>
                    Edit Campus
                  </button>
                </div>
                <div>
                  <button
                    className='green-btn'
                    onClick={() =>
                      this.setState({
                        addingStudent: !this.state.addingStudent,
                      })
                    }
                  >
                    Add Student
                  </button>
                </div>
                {this.state.addingStudent === true ? (
                  <div>
                    <div>
                      <CreateStudent showHeader={false} />
                    </div>
                    <div>
                      <button
                        onClick={() => this.setState({ addingStudent: false })}
                      >
                        Cancel Addition
                      </button>
                    </div>
                  </div>
                ) : (
                  <span />
                )}
                <div>
                  <div>
                    {this.props.campus.Students !== undefined ? (
                      this.props.campus.Students.length === 0 ? (
                        <div>
                          <p>
                            This campus does not have any students enrolled at
                            the moment.
                          </p>
                        </div>
                      ) : (
                        this.props.campus.Students.map((student, index) => (
                          <div key={index}>
                            <Student
                              id={student.id}
                              first={student.first}
                              last={student.last}
                              email={student.email}
                              image={student.image}
                              gpa={student.gpa}
                              CampusId={student.CampusId}
                            />
                          </div>
                        ))
                      )
                    ) : (
                      <br />
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <br />
            )}

            {/* <div>
            <button onClick={() => this.setState({ editing: true })}>
            Edit
            </button>
          </div> */}
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <HalfHeaderBG imgdiv='half-bg-campuses' title='Edit Campus' />
          <form
            className='createForm'
            onSubmit={(e) => this.handleEditSubmit(e)}
          >
            <div>
              <label>Name:</label>
              <input
                type='text'
                name='campusname'
                placeholder={this.props.campus.campusname}
                onChange={(e) => this.handleEditChange(e)}
              />
            </div>

            <div>
              <label>Image:</label>
              <input
                type='text'
                name='image'
                placeholder={this.props.campus.image}
                onChange={(e) => this.handleEditChange(e)}
              />
            </div>

            <div>
              <label>Address:</label>
              <input
                type='text'
                name='address'
                placeholder={this.props.campus.address}
                onChange={(e) => this.handleEditChange(e)}
              />
            </div>

            <div>
              <label>Description:</label>
              <input
                type='text'
                name='description'
                placeholder={this.props.campus.description}
                onChange={(e) => this.handleEditChange(e)}
              />
            </div>

            <div>
              <button
                className='normal-btn'
                onClick={() => this.setState({ editing: false })}
              >
                Cancel
              </button>
              <input className='normal-btn' type='submit' value='Submit' />
            </div>
          </form>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    campus: state.campus,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCampusById: (searchCampusId) => dispatch(getCampusById(searchCampusId)),
    updateCampus: (campusInfo) => dispatch(updateCampus(campusInfo)),
    deleteCampus: (deleteCampusId) => dispatch(deleteCampus(deleteCampusId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleCampus)
