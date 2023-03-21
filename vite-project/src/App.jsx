import './App.css'
import Task from './Task'
import React from 'react';

function App() {

  const [inputValue, setInputValue] = React.useState("") // Take in the input value
  const [newState, setNewState] = React.useState([]) // Store the tasks
    
    const count = newState.reduce((acc, curr) => {
      if (curr.isFlipped) {
        return acc + 1;
      } else {
        return acc;
      }
    }, 0) // Returns a number value of how many tasks are complete - used to render onto JSX how many completed out of how many tasks have been submitted
    
  const taskElements = newState.map( (el, index) => {
    return <Task
      key={el.id} 
      id={el.id} 
      text={el.task}
      isComplete={flipChecked}
      isFlipped={el.isFlipped}
      handleDelete={handleDeleteClick}
    />
  }) // Maps through the Task component and passes through props (including functions such as delete button, complete button to return the updated state render)
  
  function handleInputChange(event) {
    setInputValue(event.target.value)
  } // Handles the input from input element on each click
  
  function handleDeleteClick(id) {  
    const updatedState = newState.filter(task => task.id !== id);
    setNewState(updatedState)
    
  } // Filter newState so that it does not include the id that matches id given when clicked
  
  function handleEnterClick(event) {
    if (event.key === "Enter") {
      handleButtonClick()
    } 
  } // When Enter is clicked it will add task to newState
  
  function handleButtonClick() {
    const newInputValue = inputValue.trim()
    if (newInputValue) {
      setNewState([{task: newInputValue, isFlipped: false, id: generateRandomId()}, ...newState])
      setInputValue("")
    }
  } // When the input button is clicked it will setNewState with the newest task whilst defaulting the isFlipped to false and also a unique ID which is randomly generated through a function (generateRandomId)
  
 
  
  function generateRandomId() {
    
    const randomNumberArray = [];
    for (let i = 0; i < 10; i++) {
      randomNumberArray.push(Math.floor(Math.random() * 10));
    }
    return randomNumberArray.join('')
  }
  
  function flipChecked(id) {
       
    setNewState(prevState => {
      const updatedObjects = prevState.map(obj => {
        if (obj.id === id) {
          return { ...obj, isFlipped: !obj.isFlipped}
        } else {
          return obj
        }
      })
      return updatedObjects
    }) 
  } // Used to flip the isFlipped value of the id that matches click
  
  function getFormattedDate(date) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeek = daysOfWeek[date.getDay()];
    const dayOfMonth = date.getDate();
    const suffix = getDayOfMonthSuffix(dayOfMonth);
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    return `${dayOfWeek}, ${dayOfMonth}${suffix} ${month} ${year}`;
  } // generates the html date for current date/time, taken from Bing Chat

  function getDayOfMonthSuffix(dayOfMonth) {
    if (dayOfMonth >= 11 && dayOfMonth <= 13) {
      return 'th';
    }

    switch (dayOfMonth % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }  // returns the suffix for day date number of the month, taken from Bing Chat
  
  const completedStyle = {
        background:  newState.length === count ? "#98FB983F" : "whitesmoke",
        borderBottom: newState.length === count ? "5px solid #98FB98" : "5px solid #C0C0C0"
    } // Completed style if newState.length and the amount of tasks completed match
 
            // <ion-icon name="arrow-up-sharp"></ion-icon>
            // <ion-icon name="arrow-down-sharp"></ion-icon>
 
  return (
    <div className="App">
      <div className="input-container">
        <input maxLength="50" value={inputValue} className="input-el" onKeyDown={(event) => handleEnterClick(event)} onChange={handleInputChange} type="text" placeholder="Enter a task"/>
        <button className="button" onClick={handleButtonClick}><ion-icon name="add-outline"></ion-icon></button>
      </div>
      <div className="tasks">         
        {newState.length > 0 && 
          <div className="tasks-heading">
            <h3 className="to-do-header">{getFormattedDate(new Date())}</h3>
            <p className="completed" style={completedStyle}>
            {count === newState.length ? 
            "All Tasks Completed" :
            `Tasks: (${count}/${newState.length})`}
            </p>
          </div>}
        {taskElements}
      </div>
    </div>
  )
}

export default App
