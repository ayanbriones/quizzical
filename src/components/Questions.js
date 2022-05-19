import React from "react"
import Item from "./Item"

export default function Questions(props) {
    const items = props.trivia.map((item) => {
        return (
            <Item
                key={item.id}
                question={item.question}
                choices={item.choices}
                handleAnswer={props.handleAnswer}
                question_id={item.id}
            />
        )
    })

    return (
        <div className="questions">
            <div className="item--wrapper">{items}</div>
            <div className="result-wrapper">
                {props.done ? 
                    ( <h2 className="result"> You scored {props.score}/{props.trivia.length} correct answers </h2> ) : 
                    ( "" )
                }
                { props.done ?
                    <button className="button-check" onClick={props.handlePlayAgain}>Play again</button> :
                    <button className="button-check" onClick={props.handleCheckAnswer}>Check answers</button> 
                }
            </div>
        </div>
    )
}
