import React from 'react'

const BookSubmit = () => {
  // * the following fields are required for a succesful post: title, author, ISBN, published by, genre, supporting characters, protag and antag. will change these later to only require title author and synopsis.

  // * the form will be segmented into at least parts: first the user will have the required fields. then they will pass to optional fields, displaying all of the remaining fields EXCEPT the character fields. these are relationship based and so must be posted first.

  //* client is first given the option to select from characters already in the database. if they want to add one the book form is not submitted. the character form is rendered and posted which will then allow them to select from the database characters. all relationship based fields require a get request on load of form to populate the form options.

  //! all fields with a relationship will require a get all request to populate the form and have a value to return in the POST. for example, for character archetypes make a get request to get all, then map it into the form with each being a checkbox or something, with a value= their own id.


  //? the path for forms completion is as follows:
  //? 1)client goes to submit form. the following fields are populated on display
  //?      - title, author, synopsis
  //? buttons visible are cancel and submit
  //? 2) client asked if they want to submit the book as is or enter more information
  //? buttons visible are submit and continue
  //? 3) client moves to next form, previous info still saved to state, the following fields are populated
  //?     - ISBN, published by, genre, cover image, isFilm, isSeries, pageCount, publish date
  //? buttons visible are cancel (clear current fields and submit previous), and submit
  //? 4) client again asked if they want to add more or submit
  //? buttons visible are submit or continue
  //? 5) characters are displayed as dropdown entries. user can select one protag, one antag and any number of supporting characters
  //? buttons visible are cancel (clear current fields and submit previous),  submit, and my characters not there
  //? 6) if user selects third button, the form is submitted and posted. they are then asked if they want submit characters and are directed to the character submission page. if they do not want to submit a character, they are directed to the posted books show page

  //* any null values must be in the format of an empty string "" or empty array []. do not submit data that is null or undefined it will either throw an error and not work, or work and cause a problem later with rendering info.


  return (

    <div>

    </div>
  )
}

export default BookSubmit
