import { useState, useEffect, useRef } from 'react'
import './App.css'
import Quiz from './components/Quiz';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './components/HomePage';
import Results from './components/Results';

function App() {
	const [data, setData] = useState(null)
	const [answerHistory, setAnswerHistory] = useState([])

	const registerAnswer = (chosenAnswer, rightAnswer) => {
		let currentHistory = [...answerHistory]

		const answer = {
			chosenAnswer: chosenAnswer,
			rightAnswer: rightAnswer
		}

		currentHistory.push(answer)

		setAnswerHistory(currentHistory)
	}

	const forceSetData = (fetchedData) => {
		setData(fetchedData)
		setAnswerHistory([])
	}

	return (
		<>
			<BrowserRouter>
				<Routes>
					{['', '/home'].map((path, index) => {
						return (
							<Route exact
								path = {path}
								element={
									<HomePage setDataNull={forceSetData}/>
							}/>
						)
					})}

					<Route exact
						path = '/quiz'
						element={<Quiz 
							data={data} 
							registerAnswer={registerAnswer}
							setFetchedData={forceSetData}/>}
					/>
					<Route exact
						path = '/results'
						element = {<Results data = {data} answerHistory={answerHistory}/>}
					/>
				</Routes>
			</BrowserRouter>
			
		</>
		)
	}

	export default App
