"use client"

import { useEffect } from 'react'

const Buy = () => {
  useEffect(() => {
    const fill = async () => {
      const response = await fetch('/buy/index.html')
      const data = await response.text()
      document.open()
      document.write(data)
      document.close()
    }
    fill()
  }, [])

  return <></>
}

export default Buy
