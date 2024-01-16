import { useState, useEffect } from 'react'
import useStore from '../store/GeneralStore'
import { baseUrl } from '../constants'

const useGetRequest = () => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const setIsLoading = useStore((state) => state.setIsLoading)
  const axios = useStore((state) => state.axios)
  const getRequest = async (url, params) => {
    setIsLoading(true)
    try {
      const response = await axios.get(baseUrl + url, { params })
      if (response.data.success) {
        setData(response.data)
        setError(null)
      } else {
        setData(null)
        setError(response.data.error)
      }
    } catch (error) {
      setError(error.response?.data?.error || error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return { getRequest, data, error }
}

export default useGetRequest
