import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useGenerateUsers(limits, pageNumber, generateAgain) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [users, setUsers] = useState([])
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    setUsers([])
  }, [generateAgain, limits])

  useEffect(() => {
    function generate() {
      setLoading(true)
      setError(false)
      axios({
        method: 'get',
        url: 'https://faker-server.onrender.com/api/users',
        params: {
          ...limits,
          pageNumber,
        },
      })
        .then((res) => {
          if (pageNumber === 1) setUsers([])
          setUsers(() => [...new Set([...users, ...res.data.map((u) => u)])])
          setHasMore(res.data.length > 0)
          setLoading(false)
        })
        .catch((e) => {
          if (axios.isCancel(e)) return
          setError(true)
        })
    }
    generate()
  }, [pageNumber])

  return { loading, error, users, hasMore, setUsers }
}
