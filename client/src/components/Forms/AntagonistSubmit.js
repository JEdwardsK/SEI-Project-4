import React from 'react'

const AntagonistSubmit = () => {
  //* the following fields are required for a succesful post: firstname, character bio, character archetype. first name is a string, bio is a string, archetypes is an array of numbers. these numbers are the ids of the archetypes. a get request will be required for the archetypes and then attribute the value of the data as the id

  //! all fields with a relationship will require a get all request to populate the form and have a value to return in the POST. for example, for character archetypes make a get request to get all, then map it into the form with each being a checkbox or something, with a value= their own id.

  //? any null values must be in the format of an empty string "" or empty array []. do not submit data that is null or undefined it will either throw an error and not work, or work and cause a problem later with rendering info.

  return (
    <div>

    </div>
  )
}

export default AntagonistSubmit
