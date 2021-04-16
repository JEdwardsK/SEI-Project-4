/* eslint-disable no-unused-vars */
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'


//#region imports
import HomePage from './components/SitePages/HomePage'
import Navbar from './components/SitePages/Navbar'
import BookIndex from './components/Books/BookIndex'
import GenreIndex from './components/Genres/GenreIndex'
import BookShow from './components/Books/BookShow'
import ProtagonistIndex from './components/Characters/ProtagonistIndex'
import Footer from './components/SitePages/Footer'
//#endregion

const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
    <Switch>
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
      {/* The three feilds below will all use CharacterCard to display the data */}
      <Route exact path ='/protagonists'>
        <ProtagonistIndex/>
      </Route>
      <Route exact path ='/antagonists'>
      </Route>
      <Route exact path ='/supporting_characters'>
      </Route>
      {/* Use a : to display either login/register or as signout button based on a users login status */}
      <Route exact path ='/login'>
      </Route>
      <Route exact path ='/register'>
      </Route>
      {/* once someone has logged in show the profile button in navbar */}
      <Route exact path ='/profile'>
      </Route>
      {/* If the User is a superUser or admin send them to the auth profile page with additional options */}
      <Route exact path ='/profile/auth'>
      </Route>
    </Switch>
    <Footer/>
    </BrowserRouter>
  )
}

export default App;