import { useState } from 'react'
import useStore from '../store/GeneralStore'
import { baseUrl } from '../constants'

const usePutRequest = () => {
  const setIsLoading = useStore((state) => state.setIsLoading)
  const [data, setData] = useState(null)
  const setError = useStore((state) => state.setError)
  const setMessageRequest = useStore((state) => state.setMessageRequest)
  const axios = useStore((state) => state.axios)

  const putRequest = async (url, body) => {
    setIsLoading(true)
    try {
      const response = await axios.put(baseUrl + url, body)
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

  return { putRequest, data }
}

export default usePutRequest
