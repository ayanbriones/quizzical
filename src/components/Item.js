export default function Item(props) {
    function decodeHTML(encoded) {
        var elem = document.createElement("textarea")
        elem.innerHTML = encoded
        var decoded = elem.value
        return decoded
    }

    const choices = props.choices.map((choice) => (
        <button
            className={`item--button 
                ${choice.isSelected ? " selected" : ""} 
                ${ choice.isCorrect ? " correct" : "" } 
                ${choice.isWrong ? " wrong" : ""}
            `}
            onClick={(event) => props.handleAnswer(event, props.question_id, choice.id) }
            key={choice.id}
        >
            {decodeHTML(choice.value)}
        </button>
    ))

    return (
        <div className="item">
            <h2 className="item--question">{decodeHTML(props.question)}</h2>
            <div className="item--choices">{choices}</div>
            <hr />
        </div>
    )
}
