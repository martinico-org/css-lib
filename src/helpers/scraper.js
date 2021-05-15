import { master } from '../cssfiles/master.json'

export const getItems = async (id) => {
  console.log('COUCOU')
  return master[id]
}

export default getItems
