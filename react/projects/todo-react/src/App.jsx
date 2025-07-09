import {BrowserRouter as Router, Routes, Route, NavLink} from 'react-router-dom'
import Card from './components/shared/Card'
import {useState} from 'react'
import Header from "./components/Header"
import FeedbackData from "./data/FeedbackData"
import FeedbackList from './components/FeedbackList'
import FeedBackStats from './components/FeedbackStats'
import FeedbackForm from './components/FeedbackForm'
import AboutPage from './pages/AboutPage'
import AboutIconLink from './components/AboutIconLink'
import {FeedbackProvider} from './context/FeedbackContext'

function App() {
    return (
        <FeedbackProvider>
            <Router>
                <Header />
                <div className='container'>
                    <Routes>
                        <Route exact path='/' element = {
                            <>
                                <FeedbackForm/>
                                <FeedBackStats />
                                <FeedbackList />
                            </>
                        }>
                        </Route>
                    </Routes>
                    
                    <Routes>
                        <Route path='/about' element={<AboutPage/>}></Route>
                    </Routes>

                    

                    <AboutIconLink />
                </div>
            </Router>
        </FeedbackProvider>
    )
}

export default App