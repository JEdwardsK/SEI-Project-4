import './styles/main.scss'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Header from './components/sitePages/Header'
import HomePage from './components/sitePages/HomePage'
import Footer from './components/sitePages/Footer'
import Profile from './components/users/Profile'
import BookShow from './components/books/BookShow'
import BookIndex from './components/books/BookIndex'
import ProtagonistIndex from './components/characters/ProtagonistIndex'
import AntagonistIndex from './components/characters/AntagonistIndex'
import SupportingCharacterIndex from './components/characters/SupportingCharacterIndex'
import GenreIndex from './components/genres/GenreIndex'
import Search from './components/forms/Search'
//#region imports



//#endregion

const App = () => {

  return (
    <div className='browserRouter background'>
      <BrowserRouter >
        <Header/>
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
          <Route exact path='/search'>
            <Search/>
          </Route>
          <Route exact path ='/protagonists'>
            <ProtagonistIndex/>
          </Route>
          <Route exact path ='/antagonists'>
            <AntagonistIndex/>
          </Route>
          <Route exact path ='/supporting_characters'>
            <SupportingCharacterIndex />
          </Route>
          <Route exact path ='/profile'>
            <Profile/>
          </Route>
        </Switch>
        <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App