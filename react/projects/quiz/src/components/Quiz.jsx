import QuestionSections from "./QuestionSections"
import { useEffect, useRef } from "react"
import NR_QUEST from './shared/cosntants'

export default function Quiz({data, registerAnswer, setFetchedData}) {
    const count = useRef(0)

    useEffect(() => {
        console.log(count.current)

		if (count.current >= 1) {
			return
		}

		count.current += 1

		fetch(`https://opentdb.com/api.php?amount=${NR_QUEST}&encode=base64`)
		.then(response => response.json())
		.then(json => {
			setFetchedData(json.results)
			console.log(json.results)
		})
		.catch(error => console.log(error))
	}, [])

    return (
        <>
        {
            data ?
                <>
                    <QuestionSections data = {data} registerAnswer={registerAnswer}>
                    </QuestionSections>
                </>
                :
                <h2 style={{textAlign: 'center'}}>
                    Loading...
                </h2>
        }
        </>
    )
}
