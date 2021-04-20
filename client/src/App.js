import './styles/main.scss'
import { BrowserRouter, Switch, Route } from 'react-router-dom'


//#region imports
import HomePage from './components/SitePages/HomePage'
import Header from './components/SitePages/Header'
import BookIndex from './components/Books/BookIndex'
import GenreIndex from './components/Genres/GenreIndex'
import BookShow from './components/Books/BookShow'
import ProtagonistIndex from './components/Characters/ProtagonistIndex'
import Footer from './components/SitePages/Footer'
import Search from './helpers/Search/Search'
import AntagonistIndex from './components/Characters/AntagonistIndex'
import SupportingCharacterIndex from './components/Characters/SupportingCharacterIndex'
import Profile from './components/Users/Profile'
import Login from './components/Forms/Users/Login'
import Register from './components/Forms/Users/Register'
import ProtagonistSubmit from './components/Forms/ProtagonistSubmit'
import AntagonistSubmit from './components/Forms/AntagonistSubmit'
import BookSubmit from './components/Forms/BookSubmit'
import SupportingCharacterSubmit from './components/Forms/SupportingCharacterSubmit'

//#endregion

const App = () => {
  return (
    <BrowserRouter>
      <Header/>
      <Switch>
        <Route exact path = '/protagform'>
          <ProtagonistSubmit/>
        </Route>
        <Route exact path = '/antagform'>
          <AntagonistSubmit/>
        </Route>
        <Route exact path = '/supform'>
          <SupportingCharacterSubmit/>
        </Route>
        <Route exact path = '/bookform'>
          <BookSubmit/>
        </Route>

        <Route exact path ='/'>
          <HomePage/>
        </Route>
        <Route exact path ='/books'>
          <BookIndex/>
        </Route>
        <Route exact path ='/books/:id'>
          <BookShow/>
        </Route>
        <Route exact path ='/genres'>
          <GenreIndex/>
        </Route>
        {/* The three fields below will all use CharacterCard to display the data */}
        <Route exact path ='/protagonists'>
          <ProtagonistIndex/>
        </Route>
        <Route exact path ='/antagonists'>
          <AntagonistIndex/>
        </Route>
        <Route exact path ='/supporting_characters'>
          <SupportingCharacterIndex/>
        </Route>
        {/* Use a : to display either login/register or as sign out button based on a users login status */}
        <Route exact path ='/login'>
          <Login/>
        </Route>
        <Route exact path ='/register'>
          <Register/>
        </Route>
        {/* once someone has logged in show the profile button in navbar */}
        <Route exact path ='/profile'>
          <Profile/>
        </Route>
        {/* If the User is a superUser or admin send them to the auth profile page with additional options */}
        {/** no need for separate page, can conditionally render on same page based on status
      <Route exact path ='/profile/auth'>
      </Route>
      */}
        <Route exact path='/search'>
          <Search />
        </Route>
      </Switch>
      <Footer/>
    </BrowserRouter>
  )
}

export default App