import axios from 'axios'

const API_URL = `${process.env.SERVER_BACKEND_URL}/api/v1/subtype/list`

// get all assignments
const getAllAssignments = async () => {
  const response = await axios.get(API_URL)
  return response.data
}

const assignmentService = {
  getAllAssignments,
}

export default assignmentService
