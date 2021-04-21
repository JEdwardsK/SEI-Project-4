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

export const  setColourByNation = () => {
  if (userIsAuthenticated() === true){
    console.log('IS AUTHENTICATED HERE IS THE CLASSLIST', document.body.classList)
    if ([...document.body.classList].includes('defaultMode') === true){
      document.body.classList.remove('defaultMode')
      document.body.classList.add(`${localStorage.getItem('nation')}Mode`)
    }
  }
}