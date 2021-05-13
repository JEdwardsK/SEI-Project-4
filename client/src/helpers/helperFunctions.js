import { userIsAuthenticated } from './auth'

export const characterFormOptions = (characterArray) => {
  const options = characterArray.map(character => {
    const { id, first_name: firstName, last_name: lastName  } = character
    return { value: id , label: `${firstName} ${lastName}` }
  })
  return options
}
export const genreFormOptions = (genreArray) => {
  const options = genreArray.map(character => {
    const { id, genre  } = character
    return { value: id , label: genre }
  })
  return options
}

export const setColourByNation = () => {
  const nation = localStorage.getItem('nation')
  const isAcceptedNationClass = (nation === 'air')
    || (nation === 'water')
    || (nation === 'earth')
    || (nation === 'fire')
  const dbc = document.body.classList
  if (userIsAuthenticated() && isAcceptedNationClass) {
    [...dbc].includes('defaultMode') && (
      dbc.remove('defaultMode'),
      dbc.add(`${nation}Mode`)
    )
  }
}