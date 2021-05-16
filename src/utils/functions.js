const toSentenceCase = (string) =>
  `${string?.charAt(0).toUpperCase()}${string?.slice(1).toLowerCase()}`

export default toSentenceCase
