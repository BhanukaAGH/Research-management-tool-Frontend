import axios from 'axios'
import FormData from 'form-data'
import { setProgress, setUploading } from '../ui/uiSlice'

const API_URL = `${process.env.SERVER_BACKEND_URL}/api/v1/submission`

// submit Document
const submitDocument = async (submissionData, token, thunkAPI) => {
  const form = new FormData()
  form.append('document', submissionData.document)
  const request_config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (data) => {
      let precent = Math.round((data.loaded / data.total) * 100)
      if (precent < 100) thunkAPI.dispatch(setUploading(true))
      if (precent === 100) thunkAPI.dispatch(setUploading(false))
      thunkAPI.dispatch(setProgress(precent))
    },
  }
  const fileData = await axios.post(
    API_URL + '/file-upload',
    form,
    request_config
  )

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const data = { ...fileData.data, ...submissionData.submission }
  const response = await axios.post(API_URL, data, config)
  return response.data
}

// get all Submissions
const getAllSubmissions = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)
  return response.data
}

// get student Submissions
const getStudentSubmissions = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL + `/${userId}`, config)
  return response.data
}

// get Submission
const getSubmission = async (submissionId, userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(
    API_URL + `/${submissionId}/${userId}`,
    config
  )
  return response.data
}

const submissionService = {
  submitDocument,
  getSubmission,
  getAllSubmissions,
  getStudentSubmissions,
}

export default submissionService
