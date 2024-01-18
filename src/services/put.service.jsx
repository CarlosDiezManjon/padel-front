import { useState } from 'react'
import useStore from '../store/GeneralStore'
import { baseUrl } from '../constants'

const usePutRequest = () => {
  const setIsLoading = useStore((state) => state.setIsLoading)
  const [data, setData] = useState(null)
  const setError = useStore((state) => state.setError)
  const axios = useStore((state) => state.axios)

  const putRequest = async (url, body) => {
    setIsLoading(true)
    try {
      const response = await axios.put(baseUrl + url, body)
      if (response.data.success) {
        setData(response.data)
        setError(null)
      } else {
        setData(null)
        setError(response.data.error)
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return { putRequest, data }
}

export default usePutRequest
