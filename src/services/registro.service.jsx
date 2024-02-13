import { useState } from 'react'
import axios from 'axios'
import useStore from '../store/GeneralStore'
import { baseUrl } from '../constants'

const useRegisterRequest = () => {
  const setIsLoading = useStore((state) => state.setIsLoading)
  const [data, setData] = useState(null)
  const setError = useStore((state) => state.setError)

  const register = async (body) => {
    setIsLoading(true)
    try {
      const response = await axios.post(baseUrl + '/regitro', body)
      if (response.data.success) {
        setData(response.data)
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

  return { register, data }
}

export default useRegisterRequest
