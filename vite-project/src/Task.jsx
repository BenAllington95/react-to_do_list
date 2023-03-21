import React from 'react';

export default function Task(props) {
    
    const iconStyle = {
        color: props.isFlipped ? "#98FB98" : "#C0C0C0",
        transition: "color 150ms ease"
    } 
    
    const trashIconStyle = {
        opacity: "0.5"
    }
    
    const taskStyle = {
        background: props.isFlipped ? "#98FB983F" : "whitesmoke",
        borderBottom: props.isFlipped ? "5px solid #98FB98" : "5px solid #C0C0C0"
    }
    
    const textStyle = {
        // textDecoration: props.isFlipped ? "line-through" : "none",
        textDecorationColor: props.isFlipped ? "#555555" : ""
    }
    
    
    
    return (
        <div className="task" style={taskStyle}>
            <div className="task-para">
                <p style={textStyle}>{props.text}</p>
            </div>
            <div className="buttons">
                <ion-icon name={props.isFlipped ? "checkmark-circle-sharp" : "ellipse-outline"} style={iconStyle} onClick={() => props.isComplete(props.id)}></ion-icon>
                <ion-icon onClick={() => props.handleDelete(props.id)} name="trash-sharp" style={trashIconStyle}></ion-icon>
            </div>
        </div>
    )
}