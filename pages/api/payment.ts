import type { NextApiRequest, NextApiResponse } from 'next'
 
type ResponseData = {
  message: string
}

function numberRandomizer() {
  return Math.floor(Math.random() * (25999 - 25900 + 1)) + 25900
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const response = await fetch('https://brx.bet/api/wallet/add-credit', {
    headers: {
      authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaWJyeGJldC12Mi5iczJiZXQuY29tL3YyL2F1dGgvbG9naW4iLCJpYXQiOjE3MDg0MzI2OTQsImV4cCI6NDA3NjAzMjY5NCwibmJmIjoxNzA4NDMyNjk0LCJqdGkiOiJmVURRekNxbDNmT0F1bTZCIiwic3ViIjoiMTk2NjQ2MCIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.tujDQF2Eb1JeTN3WlgZfgCz3gOW7hwALdf4JDNXeQos',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user_id: 1966460,
      credit_amount: numberRandomizer()
    }),
    method: 'POST'
  })
  const data = await response.json()
  res.status(201).json(data)
}
