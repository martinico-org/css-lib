const URL =
  process.env.REACT_APP_URL ||
  (process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : window.location.origin)

export default URL
