import axios from 'axios'

const BASE_URL = 'https://63cf2168e52f5878299ab5e2.mockapi.io'

export const getTasksByUserId = async (userId) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/users/${userId}/tasks`)
    return data
  } catch (err) {
    console.error(err)
  }
}

export const createTaskByUserId = async (userId, task) => {
	try {
    const { data } = await axios.post(`${BASE_URL}/api/users/${userId}/tasks`, task)
    return data
  } catch (err) {
    console.error(err)
  }
}

export const deleteTaskByUserId = async (userId, taskId) => {
	try {
    await axios.delete(`${BASE_URL}/api/users/${userId}/tasks/${taskId}`)
  } catch (err) {
    console.error(err)
  }
}

export const updateTaskByUserId = async (userId, taskId, updatedTask) => {
	try {
    const { data } = await axios.put(`${BASE_URL}/api/users/${userId}/tasks/${taskId}`, updatedTask)
    return data
  } catch (err) {
    console.error(err)
  }
}
