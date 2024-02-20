"use client"

import { useEffect } from "react"

const Home = () => {
  useEffect(() => {
    const fill = async () => {
      const response = await fetch('/index.html')
      const data = await response.text()
      document.open()
      document.write(data)
      document.close()
    }
    fill()
  }, [])

  return (
    <></>
  )
}

export default Home
