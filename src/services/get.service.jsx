import { useState, useEffect } from 'react'
import useStore from '../store/GeneralStore'

const useGetRequest = () => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const setIsLoading = useStore((state) => state.setIsLoading)
  const axios = useStore((state) => state.axios)
  const getRequest = async (url, params) => {
    setIsLoading(true)
    try {
      const response = await axios.get(baseUrl + url, { params })
      setData(response.data)
    } catch (error) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  return { getRequest, data, error }
}

export default useGetRequest
