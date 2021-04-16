# Project 4 - Full Stack Django App - BookFinder

## Technologies

- python 3.9.4
- django
- React (Hooks)
- JavaScript

## FRONTEND PACKAGES

- http-proxy-middleware
- react-router-dom
- axios

## BACKEND PACKAGES

- django
- psycopg2-binary
- pyjwt
## Outline
Client can search a database of user generated content to find a book based on input search criteria. The goal of the app is to allow client to find a book where they know things about the book but not the name.

### Users
Three types of users:
- *General User* (name pending)
    - can post search
      - user enters a search and is returned a list of results that include one or more of their search criteria
      - search results are listed by match percentage value
      - user can select one of the search results to mark as found, or mark search as incomplete
      - user can update search to add or remove criteria to refine search
    - has a profile
      - can update and delete own profile,
      - can view search history, separate by successful and incomplete/inconclusive search results
- *Book Poster* User (name pending: Librarian?)
    - can post books
      - can update and delete owned books
      - has levelled rating/ status based on how many books owned
      ```len(books_owned)```
      - has same privileges as user
      - can also have submitted book rated by completion rate of submitted information. only name, author, and description required). displayed as a percentage value?
      - alternatively, instead of book owner have a book_creator for the initial user and allow any Librarian? to contribute and update the post assign as book_contributor
- *Non-Registered User* (either no User Model or sign in as Guest User)
    - cannot enter search
    - can view index and show pages of submitted books
    - can search index page for a book by name
- *Admin User*
    - not yet necessary
    - handle bug submits
    - handle requests to delete a book

## BACKEND - MODELS
### Book Model

```
book_name: (should book name require title case? required=true)
book_name_alt_language:
author:
genre: (required=true, create a list, or Relationship to Genre Model)

# either nested characters
characters: {
  primary_protagonist:
  primary_antagonist:
  supporting_characters:
}
# or all on outer level:
primary_protagonist: string
primary_antagonist: string
supporting_characters: array

story_overview: string
page_count:
published_by: string (link to publisher homepage on frontend?)
ISBN:(specify formatting?)
cover_image: ImageField => look at documentation to handle storing data or CharField => use image uploader API
is_made_into_film: Boolean
is_made_into_tv_series: Boolean

reviews: Relationship

# either
book_owner: Relationship
# or
book_creator: Relationship
book_contributor:

```
### User Model

```
first_name:
last_name:
user_name:
email:
is_first_login:
password:
password_confirmation:
date_joined:
user_searches:
favourite_books:

```

### User Model - Book Owned

```
first_name:
last_name:
user_name:
email:
is_first_login:
password:
password_confirmation:
date_joined:
user_searches:
favourite_books:
currently_reading:

# either
books_created: Relationship to book model, book_creator field many to one
books_contributed: Relationship to book model, book_contributor field many to one
# or
books_owned: Relationship



```

### Characters Model - Book Relationship (many-to-many?)
- could have a separate character app to all one to many relationships to books to allow one character to be attributed to multiple books?

- separate model and app for each type of character?

```
first_name:
last_name:
aliases:
tag_descriptors: (list of character archetypes or tropes that can select. when user makes a request on front-end they add these to the search criteria. examples: Hero, Princess, Mook, 6th Ranger, Mentor)
relationship_to_protagonist: (list of character relationships: family member, friend, rival, lover, enemy)
appears_in: (a list of ids for any books in which the character appears)

```
## BACKEND - REQUESTS
### Book
#### GET
- get all books for index page
- get single book for details page
#### POST
- add one book to db
#### PUT
update route
- only add user as contributor if they are not the creator AND not already a contributor - this helps with preventing inflating contribution score in frontend
```
user = user.current.id
is_user_creator = book_to_update.book_creator.includes(user)
is_user_contributor = book_to_update.book_creator.includes(user)

if not is_user_creator AND is_user_contributor:
    user_contributor.push(user)
```

#### DELETE
not sure yet if want user to be able to delete books

### User
#### GET
- login user
#### POST
- register new user
#### PUT
- update user profile
#### DELETE
- delete user profile

<!-- ### Book
#### GET
#### POST
#### PUT
#### DELETE -->

## FRONTEND - PAGES

- index page
    - lists all books in database
    - can change view as list view with cards or carousel with image and book title
    - can filter by criteria such as author, genre publish decade (make whatever you decide to filter compulsory fields for book posting)
    - side profile of books for bookshelf carousel
- show page
    - book detail view
    - conditional render buttons based on privileges?
        - edit book
        - submit review
    - display how many people have marked as looking for the book
    - affiliate link to purchase book from publisher?
    - people who enjoyed this book have also read... display books somehow based on users favourite books lists or something?
        - get books from the book_owner/ book_creator && book_contributor's fav books/ books read etc, display set amount static or on carousel
    - display books with same genre
    - display books with same author
- profile page
    - my bookshelf
- add book page

## FRONTEND - FEATURES

- allow login via facebook, gmail
- guide user through book adding process on first login?

## FRONTEND - FEATURES - Posting a new Book
- either
  - single long form with all fields
- or
  - breadcrumb style completion, allow user to end early and submit with current info, then contribute later with a put request to continue
  - if so, require if statement to only add user to user_contributor field if they are not in user_creator field

## STRETCH GOALS

### Handle unsuccessful/fruitless search
What if the user gets no results? submit some kind of request to a forum-style page. other users (or guests) can submit responses to attempt to answer the question, user can respond marking as solved.

can have a flag to the user on marking the search as solved to recommend making a book entry to add to the database

### Handle incomplete book
- incomplete books page - index of incomplete books for the librarians? to view and update