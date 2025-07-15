import './App.css'
import WorldMap from './components/WorldMap'
import RightSideMenu from './components/RightSideMenu'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LogInMenu from './components/LogInMenu'
import { useState } from 'react'
import Burger from './components/Burger'
import AboutPage from './components/AboutPage'

function App() {
	const [isOpened, setIsOpened] = useState(false)
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [markerMode, setMarkerMode] = useState(0)

	const toggleMenu = () => {
		setIsOpened((prevState) => !prevState)
	}

	const toggleLogIn = () => {
		setIsLoggedIn((prevState) => !prevState)
	}

	return (
		<BrowserRouter>
			<Routes>
				<Route 
					path= '/map'
					element={
						<div className='main-container'>
							<WorldMap markerMode={markerMode} setMarkerMode={setMarkerMode} isLoggedIn={isLoggedIn}></WorldMap>
							<div>
								{isOpened && <RightSideMenu setMarkerMode={setMarkerMode} toggleMenu={toggleMenu} isOpened={isOpened}></RightSideMenu>}
								<Burger toggleMenu={toggleMenu} isOpened={isOpened}></Burger>
							</div>
						</div>
					}/>
				{['/login', '/'].map((path, index) => {
					return (
						<>
							<Route
								path = {path}
								element = {
									<LogInMenu toggleLogIn={toggleLogIn}></LogInMenu>
								}/>
						</>	
					)
				})}
				<Route
					path='/about'
					element={
						<AboutPage/>
					}
				/>
			</Routes>
		</BrowserRouter>
	)
}

export default App
