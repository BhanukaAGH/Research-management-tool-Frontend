import axios from 'axios'

const API_URL = '/api/v1/topic/'

// create topic
const createTopic = async (topicData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, topicData, config)
  return response.data
}

// get all topics
const getAllTopic = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)
  return response.data
}

// get single topic
const getSingleTopic = async (topicId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL + `/${topicId}`, config)
  return response.data
}

// update topic
const updateTopic = async (newData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.patch(
    API_URL + `/${newData.topicId}`,
    newData.topicData,
    config
  )
  return response.data
}

// delete topic
const deleteTopic = async (topicId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + `/${topicId}`, config)
  return response.data
}

const authService = {
  createTopic,
  getAllTopic,
  getSingleTopic,
  updateTopic,
  deleteTopic,
}

export default authService
