import './App.css'
import WorldMap from './components/WorldMap'
import RightSideMenu from './components/RightSideMenu'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LogInMenu from './components/LogInMenu'
import { useEffect, useState } from 'react'
import Burger from './components/Burger'
import AboutPage from './components/AboutPage'
import BottomBar from './components/BottomBar'
import PopupForm from './components/PopupForm'
import {motion, AnimatePresence} from 'motion/react'

function App() {
	const [isOpened, setIsOpened] = useState(false)
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [markerMode, setMarkerMode] = useState(0)
	const [currentSelection, setCurrentSelection] = useState(null)
	const [markers, setMarkers] = useState([])
	const [startedEdit, setStartedEdit] = useState(true)

	const toggleMenu = () => {
		setIsOpened((prevState) => !prevState)
	}

	const toggleLogIn = () => {
		setIsLoggedIn((prevState) => !prevState)
	}

	const changeCurrentSelection = (newSelection) => {
		setCurrentSelection(newSelection)
	}

	const handleSubmit = (e, markerObj, formData) => {
		console.log(markerObj)

		markerObj.locationData.title = formData['title']
		markerObj.locationData.rating = formData['rating']
		markerObj.locationData.description = formData['description']

		markerObj.editMode = false;

		setStartedEdit((prev) => !prev)
	}

	const deleteMarker = (markerToDelete) => {
        setMarkers((prev) => prev.filter((elem) => elem != markerToDelete))
		setCurrentSelection(null)
    }

	const startEdit = (clickedMarker) => {
        console.log('ajung aici?')

        clickedMarker.draggable = true

        setStartedEdit((prev) => !prev)
    }

	const startEditContent = (marker) => {
		marker.editMode = true
		setStartedEdit((prev) => !prev)
	}

	const handleCancel = (marker) => {
		marker.editMode = false
		setStartedEdit((prev) => !prev)
	}

	useEffect(() => {
		console.log('current selection: ', currentSelection)
	}, [currentSelection])

	return (
		<BrowserRouter>
			<Routes>
				<Route 
					path= '/map'
					element={
						<div className='main-container'>
							<WorldMap 
								markerMode={markerMode} 
								setMarkerMode={setMarkerMode} 
								isLoggedIn={isLoggedIn}
								changeCurrentSelection={changeCurrentSelection}
								markers={markers}
								setMarkers={setMarkers}
								setStartedEdit={setStartedEdit}>
							</WorldMap>
							<div>
								{isOpened && <RightSideMenu setMarkerMode={setMarkerMode} toggleMenu={toggleMenu} isOpened={isOpened}></RightSideMenu>}
								<Burger changeCurrentSelection={changeCurrentSelection} toggleMenu={toggleMenu} isOpened={isOpened}></Burger>
							</div>
							{currentSelection && <BottomBar 
								markerObj={currentSelection}
								changeCurrentSelection={changeCurrentSelection} 
								setIsOpened={setIsOpened}
								isOpened={isOpened}>
									<PopupForm 
										markerObject={currentSelection}
										handleSubmit={handleSubmit}
										deleteMarker={deleteMarker}
										startEdit={startEdit}
										startEditContent={startEditContent}
										handleCancel={handleCancel}>
									</PopupForm>
							</BottomBar>}
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
