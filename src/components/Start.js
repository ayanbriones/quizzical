import React from "react"

export default function Start(props) {
    return (
        <div className="start">
            <h1 className="start--title">Quizzical</h1>
            <h2 className="start--description">
                A React section 4 solo project in Scrimba - Learn React for Free
                with Bob Ziroll
            </h2>
            <h2 className="start--description">by Bryanth Briones</h2>
            <button className="start-button" onClick={props.handleStart}>
                Start quiz
            </button>
        </div>
    )
}
