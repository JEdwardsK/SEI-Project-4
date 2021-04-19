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
import Search from './components/helpers/Search/Search';
import AntagonistIndex from './components/Characters/AntagonistIndex';
import SupportingCharacterIndex from './components/Characters/SupportingCharacterIndex';
import Profile from './components/Users/Profile';
import Login from './components/Forms/Users/Login';
import Register from './components/Forms/Users/Register'

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

export default App;