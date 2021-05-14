import { master } from '../cssfiles/master'

export const getItems = async (id) => {
  console.log('COUCOU')
  return master[id]
}

export default getItems
