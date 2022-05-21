import axios from 'axios'

const API_URL = 'http://localhost:5000/subtype/list'

// get all assignments
const getAllAssignments = async () => {
  const response = await axios.get(API_URL)
  return response.data
}

const assignmentService = {
  getAllAssignments,
}

export default assignmentService
