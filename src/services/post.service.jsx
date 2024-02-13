import { useState } from 'react'
import useStore from '../store/GeneralStore'
import { baseUrl } from '../constants'

const usePostRequest = () => {
  const setIsLoading = useStore((state) => state.setIsLoading)
  const [data, setData] = useState(null)
  const setError = useStore((state) => state.setError)
  const setMessageRequest = useStore((state) => state.setMessageRequest)
  const axios = useStore((state) => state.axios)

  const postRequest = async (url, body) => {
    setIsLoading(true)
    try {
      const response = await axios.post(baseUrl + url, body)
      if (response.data.success) {
        setData(response.data)
        setMessageRequest(response.data.message)
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

  return { postRequest, data }
}

export default usePostRequest
