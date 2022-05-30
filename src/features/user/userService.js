import axios from 'axios'
import FormData from 'form-data'

const API_URL = `${process.env.SERVER_BACKEND_URL}/api/v1/users/`

// get loggin user info
const getCurrentUser = async (userId) => {
  const response = await axios.get(API_URL + `find1/${userId}`)

  return response.data
}

// update User profile picture
const updateUserPicture = async (photoData, token) => {
  const form = new FormData()
  form.append('image', photoData)

  const request_config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  }

  const response = await axios.patch(
    API_URL + `update-profile`,
    form,
    request_config
  )
  return response.data
}

// get all supervisors
const getAllSupervisors = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL + 'getAllSupervisors', config)
  return response.data
}

// get all co-supervisors
const getAllCoSupervisors = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL + 'getAllCoSupervisors', config)
  return response.data
}

const userService = {
  getCurrentUser,
  updateUserPicture,
  getAllSupervisors,
  getAllCoSupervisors,
}

export default userService
