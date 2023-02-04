import axios from 'axios'

const BASE_URL = 'https://63cf2168e52f5878299ab5e2.mockapi.io'

export const getUsers = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/users`)
    return data
  } catch (err) {
    console.error(err)
  }
}

export const getUserById = async (id) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/users/${id}`)
    return data
  } catch (err) {
    console.error(err)
  }
}
