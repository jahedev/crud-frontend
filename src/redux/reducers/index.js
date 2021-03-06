import axios from 'axios'
import backend from '../../helper/backend'
import {
  GOT_ALL_STUDENTS,
  GOT_STUDENT_BY_ID,
  GOT_ALL_CAMPUSES,
  DELETED_STUDENT,
  CREATED_STUDENT,
  UPDATED_STUDENT,
  GOT_CAMPUS_BY_ID,
  DELETED_CAMPUS,
  CREATED_CAMPUS,
  UPDATED_CAMPUS,
} from './actionTypes'

const initialState = {
  students: [],
  student: '',
  campuses: [],
  campus: '',
}

// POST -> Create

const createdStudent = (data) => {
  return {
    type: CREATED_STUDENT,
    data,
  }
}

export const createStudent = (studentInfo) => {
  return async (dispatch) => {
    try {
      console.log('creating student with this info:', studentInfo)
      const response = await axios.post(`${backend}/api/students/`, {
        first: studentInfo.first,
        last: studentInfo.last,
        email: studentInfo.email,
        image: studentInfo.image,
        gpa: studentInfo.gpa,
        CampusId: studentInfo.CampusId,
      })
      console.log(
        '************************************************************************'
      )
      console.log('axios response after creaing student:', response)
      dispatch(createdStudent(response.data.student))
    } catch (error) {
      console.error(error)
    }
  }
}

const createdCampus = (data) => {
  return {
    type: CREATED_CAMPUS,
    data,
  }
}

export const createCampus = (campusInfo) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${backend}/api/campuses/`, {
        campusname: campusInfo.campusname,
        image: campusInfo.image,
        address: campusInfo.address,
        description: campusInfo.description,
      })
      console.log('axios response after creating campus:', response)
      dispatch(createdCampus(response.data.campus))
    } catch (error) {
      console.error(error)
    }
  }
}

// GET -> Read all

const gotAllStudents = (data) => {
  return {
    type: GOT_ALL_STUDENTS,
    data,
  }
}

export const getAllStudents = () => {
  return async (dispatch) => {
    try {
      // http:// resolves CORS error, thank you stack overflow
      const response = await axios.get(`${backend}/api/students/`)
      console.log('getAllStudents axios response:', response)
      dispatch(gotAllStudents(response.data.students))
    } catch (error) {
      console.error(error)
    }
  }
}

const gotAllCampuses = (data) => {
  return {
    type: GOT_ALL_CAMPUSES,
    data,
  }
}

export const getAllCampuses = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${backend}/api/campuses/`)
      console.log('getAllCampuses axios response', response)
      dispatch(gotAllCampuses(response.data.campuses))
    } catch (error) {
      console.error(error)
    }
  }
}

// GET -> Read by ID

const gotStudentById = (data) => {
  return {
    type: GOT_STUDENT_BY_ID,
    data,
  }
}

export const getStudentById = (searchStudentId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${backend}/api/students/${searchStudentId}`
      )
      console.log('getStudentById axios response:', response)
      dispatch(gotStudentById(response.data.student))
    } catch (error) {
      console.error(error)
    }
  }
}

const gotCampusById = (data) => {
  return {
    type: GOT_CAMPUS_BY_ID,
    data,
  }
}

export const getCampusById = (searchCampusId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${backend}/api/campuses/${searchCampusId}`
      )
      console.log('getCampusById axios response:', response)
      dispatch(gotCampusById(response.data.campus))
    } catch (error) {
      console.error(error)
    }
  }
}

// PUT -> Update
const updatedStudent = () => {
  return {
    type: UPDATED_STUDENT,
  }
}

export const updateStudent = (studentInfo) => {
  return (dispatch) => {
    try {
      console.log('student info in updateStudent function redux:', studentInfo)
      axios.put(`${backend}/api/students/${studentInfo.id}`, {
        first: studentInfo.first,
        last: studentInfo.last,
        email: studentInfo.email,
        image: studentInfo.image,
        gpa: studentInfo.gpa,
        CampusId: studentInfo.CampusId,
      })
      dispatch(updatedStudent())
    } catch (error) {
      console.error(error)
    }
  }
}

const updatedCampus = () => {
  return {
    type: UPDATED_CAMPUS,
  }
}

export const updateCampus = (campusInfo) => {
  return (dispatch) => {
    try {
      axios.put(`${backend}/api/campuses/${campusInfo.id}`, {
        campusname: campusInfo.campusname,
        image: campusInfo.image,
        address: campusInfo.address,
        description: campusInfo.description,
      })
      dispatch(updatedCampus())
    } catch (error) {
      console.error(error)
    }
  }
}

// DELETE -> Delete by Id

const deletedStudent = (data) => {
  return {
    type: DELETED_STUDENT,
  }
}

export const deleteStudent = (deleteStudentId) => {
  return (dispatch) => {
    try {
      console.log('before axios.delete call, studentId:', deleteStudentId)
      axios.delete(`${backend}/api/students/${deleteStudentId}`)
      dispatch(deletedStudent())
    } catch (error) {
      console.error(error)
    }
  }
}

const deletedCampus = () => {
  return {
    type: DELETED_CAMPUS,
  }
}

export const deleteCampus = (deleteCampusId) => {
  return (dispatch) => {
    try {
      axios.delete(`${backend}/api/campuses/${deleteCampusId}`)
      console.log('deleteCampus id redux:', deleteCampusId)
      dispatch(deletedCampus())
    } catch (error) {
      console.error(error)
    }
  }
}

const rootReducer = (state = initialState, action) => {
  console.log('action in root reducer:', action)
  switch (action.type) {
    case GOT_ALL_STUDENTS:
      return {
        ...state,
        students: action.data,
      }
    case GOT_STUDENT_BY_ID:
      return {
        ...state,
        student: action.data,
      }
    case GOT_ALL_CAMPUSES:
      return {
        ...state,
        campuses: action.data,
      }
    case DELETED_STUDENT:
      return {
        ...state,
      }
    case CREATED_STUDENT:
      return {
        ...state,
        student: action.data,
      }
    case UPDATED_STUDENT:
      return {
        ...state,
      }
    case GOT_CAMPUS_BY_ID:
      return {
        ...state,
        campus: action.data,
      }
    case DELETED_CAMPUS:
      return {
        ...state,
      }
    case CREATED_CAMPUS:
      return {
        ...state,
        campus: action.data,
      }
    case UPDATED_CAMPUS:
      return {
        ...state,
      }
    default:
      return state
  }
}

export default rootReducer
