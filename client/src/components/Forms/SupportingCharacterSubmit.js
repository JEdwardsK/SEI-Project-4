import React from 'react'

const SupportingCharacterSubmit = () => {

   //* the following fields are required for a successful post: first name, character bio, character archetype. first name is a string, bio is a string, archetypes is an array of numbers. these numbers are the ids of the archetypes. a get request will be required for the archetypes and then attribute the value of the data as the id

   //! all fields with a relationship will require a get all request to populate the form and have a value to return in the POST. for example, for character archetypes make a get request to get all, then map it into the form with each being a checkbox or something, with a value= their own id.

  //? Relationship to protagonist is a choices field, check in the backend for the list of choices that can be selected and have those EXACTLY how they appear in the backend. so in the backend for example the choices class looks like the following:

  //? MOTHER = 'mother', ('Mum')

  //? 'mother' is the value of the choice that must be input into the form. ('Mum' is the user friendly display. you can display whatever you want to the user in the input, just make sure the inputs value="mother". not MOTHER, Mother or Mum)

  //?users can only submit one relationship.

  //* any null values must be in the format of an empty string "" or empty array []. do not submit data that is null or undefined it will either throw an error and not work, or work and cause a problem later with rendering info.


  return (
    <div>

    </div>
  )
}

export default SupportingCharacterSubmit
