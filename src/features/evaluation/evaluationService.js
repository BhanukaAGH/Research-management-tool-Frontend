import axios from 'axios'

const API_URL = '/api/v1/evaluate'

// create evaluation
const createEvaluation = async (evaluationData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, evaluationData, config)
  return response.data
}

// get evaluation
const getEvaluation = async (requestData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const { groupId, evaluationType } = requestData

  const response = await axios.get(
    `${API_URL}/${groupId}/${evaluationType}`,
    config
  )
  return response.data
}

const evaluationService = {
  createEvaluation,
  getEvaluation,
}

export default evaluationService
