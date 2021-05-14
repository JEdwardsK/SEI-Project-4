


# <img src="./client/src/styles/assets/images/knowledge_seeker.svg" alt="index page for earth mode" width=50/>BookFinder<img src="./client/src/styles/assets/images/knowledge_seeker.svg" alt="index page for earth mode" width=50/>
> SEI Project 4 - A full stack Django App

The goal of this project was to create a full stack application. The requirements from the brief were
1) Use a Django API to serve your data from a PostgreSQL database
2) Consume your API with a separate front end built with ReactJS
3) CRUD Functionality

[<img width="1423" alt="Screenshot 2021-05-07 at 14 19 11" src="./readme/homepage.png">](http://project-book-finder.herokuapp.com/)
><small> Link to deployed app</small>

Team Members

George Shaw

## Installing / Getting started
### Development

When forking/cloning the repo, a yarn and yarn start should start up the app's frontend

```shell
$ cd client;
$ yarn; yarn start
```

For the backend, the database needs to be seeded and started.

```shell
$ cd backend;
$ pipenv run seedall; pipenv run serve
```
### Main

If working from the main branch the front and backend are connected

```shell
$ pipenv run seedall; pipenv run serve
```

## Technologies/Packages Used

- Django
- JavaScript
- Python 3.9
- ReactJs
- SCSS

### Frontend

- axios
- bootstrap
- http-proxy-middleware
- react-bootstrap
-  react-router-dom

### Backend

- pylint
- djangorestframework
- django
- pyjwt
- django-on-heroku
- python-decouple

## Process
### Idea Stage

The idea of the app is to have a user generated database that can be populated and searched. Registered users would be able to search the database using filling in information that they could remember about a book and then receive a list of results based on their search terms.

We started by splitting up the tasks required, using Trello for project management.


MVP Goals:
- Users can view books whilst unregistered
- Users can register an account to add search for books
- Registered users can post new books and characters to the database
- Index page for books and characters
- Show page for books
- Profile page for users

Stretch Goals:
- Light/Dark Mode
- Toggle Theme based on variable
- User can

### Functionality
#### CRUD

Create
- Users can register an account to access extra functions on the website
- Registered users can add books to the database
- Registered users can add characters to the database
- Registered users can add reviews to the book (not implemented front end)

Read
- Requests are sent to get data from the database to render on the site

Update


Delete


#### Personal Responsibilities

I was responsible for generating the backend. I also handled the frontend search form

#### Backend

The books had the following model

```python
class Book(models.Model):
    title = models.CharField(max_length=50)
    author = models.CharField(max_length=50)
    cover_image = models.CharField(max_length=400, default="https://cdn.wallpapersafari.com/35/57/iUfZRE.jpg", blank=True)
    ISBN = models.CharField(max_length=50, default="", blank=True)
    is_made_into_film = models.BooleanField('Has the book been made into a film?', default=False)
    is_made_into_series = models.BooleanField('Has the book been made into a tv series?', default=False)
    story_overview = models.TextField(max_length= 2000, default="", blank=True)
    page_count = models.IntegerField(default= 50,)
    published_by =models.CharField(max_length=50, default="", blank=True)
    pub_date = models.DateField('date published', default="2012-12-12", blank=True)
    genre = models.ManyToManyField('genres.Genre', related_name="books")

    def __str__(self):
        return f"{self.title}, by {self.author}."

```
The books had the following relationships
- Genres - ManytoMany

The Antagonists, Protagonists, and Supporting Characters had the following relationships
- Books - ManytoMany
- Archetypes - ManytoMany

The models for each of the characters types were similar except for particular fields. For example, the antagonist has a field `relationship_to_protagonist`, whereas the antagonist and protagonist have `quotes`. The model for the supporting characters is shown below

```python
class SupportingCharacter(models.Model):

    class Relationship(models.TextChoices):
        NO_INPUT = '', ('None')
        NOT_APPLICABLE = 'n/a', ('Not Applicable')
        FAMILY_MEMBER = 'Family Member', ('Family Member')
        RIVAL = 'Rival', ('Rival')
        LOVER = 'Love Interest', ('Love Interest')
        FRIEND = 'Friend', ('Friend')
        COMPANION = 'Companion', ('Companion')
        ALLY = 'Ally', ('Ally')
        ENEMY = 'Enemy', ('Enemy')
        SERVANT = 'Servant', ('Servant')
        MENTOR = 'Mentor', ('Mentor')


    first_name = models.CharField(max_length= 50)
    last_name = models.CharField(max_length= 50, default="", blank=True)
    relationship_to_protagonist = models.CharField(
        max_length=50,
        choices=Relationship.choices,
        default=Relationship.NO_INPUT
        )
    character_bio = models.TextField(max_length=700)
    character_archetypes = models.ManyToManyField('archetypes.Archetype', related_name="supporting_characters")
    books = models.ManyToManyField('books.Book', related_name="supporting_characters")
    def __str__(self):
        return f"{self.first_name} {self.last_name}"
```
The users have the following model

```python
class User(AbstractUser):
    class Nation(models.TextChoices):
        ADMIN = "admin", ("Admin User")
        FIRE = "fire", ("Fire Nation"),
        EARTH = "earth", ("Earth Kingdom"),
        WIND = "air", ("Air Nomads")
        WATER = "water", ("Water Tribe")
    email = models.CharField(max_length=50, unique=True)
    is_first_login = models.BooleanField(default=True)
    date_joined = models.DateField(auto_now_add=True)
    profile_image = models.CharField(max_length=400, default="", blank=True)
    nationality = models.CharField(
        max_length=50,
        choices=Nation.choices,
        )
```


##### Frontend

For the search form, the user would fill out the displayed form which was saved to state. Clicking submit would run the user through `handleSubmit()`.

The function takes each of the criteria and checks each book in the database if it is included. There is a running counter variable `matchCount`. If there is a match `matchCount++`.

After all the searches are complete, the function compiles an array of books where `matchCount > 0`. This is then sorted by the `matchCount` and displayed to the user as 'Search Hits'.

```javascript
const handleSubmit = (event) => {
    event.preventDefault()
    setShow(false)
    allBooks.forEach(book => {
      let matchCount = 0
      const results = []
      const { title, author, is_made_into_film: isFilm, is_made_into_series: isSeries, genre: genres, supporting_characters: supChars, main_protagonist: protag, main_antagonist: antag } = book
      if (formTitle !== '' && title.toLowerCase().includes(formTitle.toLowerCase())) {
        matchCount++
        results.push(title)
      }
      if (formAuthor !== '' && author.toLowerCase().includes(formAuthor.toLowerCase())) {
        matchCount++
        results.push(author)
      }
      if (formIsFilm !== '' && isFilm === formIsFilm) {
        matchCount++
        results.push('Made into film')
      }
      if (formIsSeries !== '' && isSeries === formIsSeries) {
        matchCount++
        results.push('Made into tv series')
      }
      formGenres.forEach(formGenre => {
        const genreIdArray = genres.map(item=>item.id)
        const findGenre = genres.find(genre => genre.id = formGenre)
        const genreName = findGenre.genre
        genreIdArray.includes(formGenre) && matchCount++
        results.push(genreName)

      })
      supChars.forEach(char => {
        const name = (`${char.first_name} ${char.last_name}`).trim()
        if (formFirstName !== '' && formFirstName.toLowerCase().includes(char.first_name.toLowerCase()) ) {
          results.push(name)
          matchCount++
        }
        if (formLastName !== '' && formLastName.toLowerCase().includes(char.last_name.toLowerCase())) {
          results.push(name)
          matchCount++
        }
      })
      protag.forEach(char => {
        const name = (`${char.first_name} ${char.last_name}`).trim()
        if (formFirstName !== '' && char.first_name.toLowerCase().includes(formFirstName.toLowerCase()) ) {
          matchCount++
          results.push(name)
        }
        if (formLastName !== '' && char.last_name.toLowerCase().includes(formLastName.toLowerCase())) {
          matchCount++
          results.push(name)
        }
      })

      antag.forEach(char => {
        if (formFirstName !== '' && char.first_name.toLowerCase().includes(formFirstName.toLowerCase())) {
          results.push(char.first_name)
          matchCount++
        }
        if (formLastName !== '' && char.last_name.toLowerCase().includes(formLastName.toLowerCase())) {
          const name = (`${char.first_name} ${char.last_name}`).trim()
          matchCount++
          results.push(name)
        }
      })
      const filteredResults = [...new Set(results)]
      if (matchCount !== 0) {
        validBooksSearchArray.push({ resultBook: book, searchHits: matchCount, results: filteredResults, bookTitle: title })
      }
    })
    setSearchResults(validBooksSearchArray)
  }
```
### Design

The design was a theme based on Avatar: the Last Airbender. The database is  meant to emulate Wan-Shi-Tong's Spirit Library from season two of the tv series.

To meet this design style we attempted three things:

1) A font similar to the show
2) Logos and icons based on characters from the show
3) Toggling the colour scheme based on the users nation

The font was found through a online search. For the theme toggle. the document body was assigned a class `defaultMode`. when the user signed in, their nation (water, earth, fire, air) would be assigned to local storage. a function `setColourByNation()` would then check local storage, remove the class `defaultMode` and apply the class `{nation}Mode`.

<div styles="display:flex; flex-wrap:wrap">
  <figure styles=>
  <img src="./readme/watermode.png" alt="index page for water mode" width="50%"/>
  <figcaption>
    <small>water mode theme</small>
  </figcaption>
  </figure>

  <figure>
  <img src="./readme/earthmode.png" alt="index page for earth mode" width="300" />
  <figcaption>
   <small>earth mode theme</small>
  </figcaption>
  </figure>

  <figure>
  <img src="./readme/firemode.png" alt="index page for fire mode" width="300" />
  <figcaption>
    <small>fire mode theme</small>
  </figcaption>
  </figure>
  <figure>
  <img src="./readme/airmode.png" alt="index page for air mode" width="300" />
  <figcaption>
    <small>air mode theme</small>
  </figcaption>
  </figure>

</div>

#### Personal Responsibilities
I was responsible for the design of the homepage and the character icons. For the icons I made some svgs
<img src="./client/src/styles/assets/images/avatar.svg" alt="index page for earth mode" />
<img src="./client/src/styles/assets/images/avatar 4.svg" alt="index page for earth mode" />
<img src="./client/src/styles/assets/images/avatar-3.svg" alt="index page for earth mode" />
<img src="./client/src/styles/assets/images/wan-shi.svg" alt="index page for earth mode" />
<img src="./client/src/styles/assets/images/knowledge_seeker.svg" alt="index page for earth mode" />
<img src="./client/src/styles/assets/images/untitled(4).svg" alt="index page for earth mode" />

I mocked up an idea for the homepage's design
<img src="./client/src/styles/assets/images/avatar 2.svg" alt="index page for earth mode" />
<img src="./client/src/styles/assets/images/tribe-homepage.svg" alt="index page for earth mode" />
<img src="./client/src/styles/assets/images/riddle.svg" alt="index page for earth mode" />
<img src="./client/src/styles/assets/images/register.svg" alt="index page for earth mode" />

### Known Errors

- Font works on Chrome but not Firefox
- Theme change works on chrome, hit and miss on Firefox

### Future Improvements


#### Additional Features


#### Edits and Updates/Fixes

## Learning Outcomes

### Wins/ Challenges

### Wallkthrough
