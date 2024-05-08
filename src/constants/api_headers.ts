export default function getApiHeaders(token: string | undefined) {
  let headers: any = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }

  if (token) {
    headers = {
      ...headers,
      'Authorization': `Bearer ${token}`
    }
  }

    return headers
  }