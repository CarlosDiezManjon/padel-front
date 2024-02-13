import { useState } from 'react'
import axios from 'axios'
import useStore from '../store/GeneralStore'
import { baseUrl } from '../constants'

const useLoginRequest = () => {
  const setIsLoading = useStore((state) => state.setIsLoading)
  const [data, setData] = useState(null)
  const setError = useStore((state) => state.setError)

  const login = async (body) => {
    setIsLoading(true)
    try {
      const response = await axios.post(baseUrl + '/login', body)
      if (response.data.success) {
        setData(response.data.token)
        setError(null)
      } else {
        setData(null)
        setError({ tipo: 'error', message: response.data.error })
      }
    } catch (error) {
      setError({ tipo: 'error', message: error.response?.data?.error || error.message })
    } finally {
      setIsLoading(false)
    }
  }

  return { login, data }
}

export default useLoginRequest
