/* eslint-disable no-unused-vars */
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom' 

//#region imports
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './components/HomePage'

import BookCard from './components/BookCard'
import BookIndex from './components/BookIndex'
import BookShow from './components/BookShow'

import CharacterCard from './components/CharacterCard'
import AntagonistIndex from './components/AntagonistIndex'
import ProtagonistIndex from './components/ProtagonistIndex'
import SupportingCharacterIndex from './components/SupportingCharacterIndex'

import Register from './components/Register'
import Login from './components/Login'
import GenreIndex from './components/GenreIndex'
import Profile from './components/Profile'
//#endregion

function App() {
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