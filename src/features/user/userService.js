import axios from 'axios'
import FormData from 'form-data'

const API_URL = 'http://localhost:5000/users/'

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

const userService = {
  getCurrentUser,
  updateUserPicture,
}

export default userService
