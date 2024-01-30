import { useState, useEffect } from 'react'
import useStore from '../store/GeneralStore'
import { baseUrl } from '../constants'

const useDeleteRequest = () => {
  const [data, setData] = useState(null)
  const setError = useStore((state) => state.setError)
  const setIsLoading = useStore((state) => state.setIsLoading)
  const setMessageRequest = useStore((state) => state.setMessageRequest)
  const axios = useStore((state) => state.axios)
  const deleteRequest = async (url, params) => {
    setIsLoading(true)
    try {
      const response = await axios.delete(baseUrl + url + '/' + params)
      if (response.data.success) {
        setData(response.data)
        setMessageRequest(response.data.message)
        setError(null)
      } else {
        setData(null)
        setError({ message: response.data.error })
      }
    } catch (error) {
      setError({ message: error.response?.data?.error || error.message })
    } finally {
      setIsLoading(false)
    }
  }

  return { deleteRequest, data }
}

export default useDeleteRequest
