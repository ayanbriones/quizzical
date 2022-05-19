import { useEffect, useState } from "react"
import { nanoid } from "nanoid"
import "./App.css"
import Questions from "./components/Questions"
import Start from "./components/Start"
import BlobYellow from "./components/BlobYellow"
import Blob from "./components/Blob"

function App() {
    const [start, setStart] = useState(false)
    const [data, setData] = useState([])
    const [trivia, setTrivia] = useState([])
    const [score, setScore] = useState(0)
    const [done, setIsDone] = useState(false)

    useEffect(() => {
        function getApi() {
            fetch("https://opentdb.com/api.php?amount=5")
                .then((res) => res.json())
                .then((data) => setData(data.results))
        }
        getApi()
    }, [])

    useEffect(() => {
        function getTrivia() {
            const trivia = data.map((item) => {
                const answers = [...item.incorrect_answers, item.correct_answer]
                const shuffledAnswers = shuffleArray(answers)
                const choices = []
                for (let i = 0; i < shuffledAnswers.length; i++) {
                    choices.push({
                        id: nanoid(),
                        isSelected: false,
                        isCorrect: false,
                        isWrong: false,
                        value: shuffledAnswers[i],
                    })
                }
                return {
                    id: nanoid(),
                    question: item.question,
                    correct_answer: item.correct_answer,
                    choices: [...choices],
                }
            })

            return trivia
        }
        setTrivia(getTrivia())
    }, [data])

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            ;[array[i], array[j]] = [array[j], array[i]]
        }
        return array
    }

    function handleStart() {
        setStart(true)
        if (start) {
            console.log("start questions")
        }
    }

    function handleAnswer(event, question_id, answer_id) {
        setTrivia((prevTrivia) => {
            const newTrivia = prevTrivia.map((trivia) => {
                if (trivia.id === question_id) {
                    trivia.choices.map((choice) => {
                        if (choice.id === answer_id) {
                            choice.isSelected = true
                        } else {
                            choice.isSelected = false
                        }
                        return choice
                    })
                }
                return trivia
            })
            return newTrivia
        })
    }

    function handleCheckAnswer() {
        setTrivia((prevTrivia) => {
            const results = prevTrivia.map((item) => {
                const newOptions = item.choices.forEach((choice) => {
                    if (
                        choice.isSelected &&
                        choice.value === item.correct_answer
                    ) {
                        choice.isCorrect = true
                    } else if (
                        choice.value === item.correct_answer &&
                        !choice.isSelected
                    ) {
                        choice.isWrong = true
                    }
                })
                return {
                    ...item,
                    newOptions,
                }
            })
            return results
        })
        setScore(getScore().filter((value) => value).length)
        setIsDone(true)
    }

    function handlePlayAgain() {
        console.log('play again')
        window.location.reload(false);
    }

    function getScore() {
        const results = []
        trivia.forEach((item) => {
            item.choices.forEach((choice) => {
                if (choice.isSelected) {
                    results.push(
                        choice.value === item.correct_answer ? true : false
                    )
                }
            })
        })
        return results
    }

    const page = start ? (
        <Questions
            trivia={trivia}
            handleAnswer={handleAnswer}
            handleCheckAnswer={handleCheckAnswer}
            handlePlayAgain={handlePlayAgain}
            score={score}
            done={done}
        />
    ) : (
        <Start handleStart={handleStart} />
    )

    return (
        <main>
            <BlobYellow className="blob-yellow" />
            <Blob className="blob-blue" />
            {page}
        </main>
    )
}

export default App
