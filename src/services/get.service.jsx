import { useState, useEffect } from 'react'
import useStore from '../store/GeneralStore'
import { baseUrl } from '../constants'

const useGetRequest = () => {
  const [data, setData] = useState(null)
  const setError = useStore((state) => state.setError)
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
        setError({ tipo: 'error', message: response.data.error })
      }
    } catch (error) {
      setError({ tipo: 'error', message: error.response?.data?.error || error.message })
    } finally {
      setIsLoading(false)
    }
  }

  return { getRequest, data }
}

export default useGetRequest
