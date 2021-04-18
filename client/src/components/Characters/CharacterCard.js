import React from 'react'
import BooksCarousel from '../Books/BooksCarousel'

const CharacterCard = ({ character }) => {

  console.log(character)

    const {books, id, character_archetypes: archetypes, first_name, last_name, character_bio: bio, relationship_to_protagonist: relationship } = character

  return (
    <div>
      <div className="character-info-right">
        <h3>Name</h3>
        <p>{`${first_name} ${last_name}`}</p>
      </div>
      <div className="character-info-right">
        <h3>Character Bio</h3>
        <p>{bio}</p>
      </div>
      {relationship &&
        <div className="character-info-right">
        <h3>Relation to Protagonist</h3>
        <p>{relationship}</p>
      </div>
      }
      <div className="character-info-right">
        <h3>Archetypes</h3>
        <p>{archetypes.map(item => ` ${item.archetype}`).toString()
        }
          </p>
      </div>
      <div className="character-info-right">
        <h3>Appears In</h3>
        {
          books.length > 0
            ? <BooksCarousel books={books} />
            : <p>We Don't Know! Maybe you can help us...</p>
        }
      </div>
    </div>
  )
}

export default CharacterCard
