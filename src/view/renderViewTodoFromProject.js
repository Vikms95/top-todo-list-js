import { askForTodoInput } from '../logic/createTodoObject'
import { addEventListenerTodoDeleteButton } from '../logic/deleteElements'
import { addEventListenerCheckmarkButton } from '../logic/deleteElements'
import { addEventListenerExpandTodo } from '../logic/modifyElements'
import { addEventListenerPriorityButton } from '../logic/modifyElements'
// Will be called whenever the 'new todo' button is pressed,
// it chain calls createTodoObject > askForTodoInput
function renderViewTodoFromProject(todoAsParameter){
    
    // Call for askForTodoInput and store the object returned
    const todoObject = todoAsParameter || askForTodoInput()
    if(todoObject === null) return null
    
    // Create container div(row), checkmark div (column), todo div (column)
    const container = document.createElement('div')
    const checkmark = document.createElement('div')
    const checkmarkButton = document.createElement('button')
    const todo = document.createElement('div')
    const buttonsContainer = document.createElement('div')
    const buttons = document.createElement('div')
    const expandButton = document.createElement('button')
    const deleteButton = document.createElement('button')
    const flags = document.createElement('div')
    const flagBlueButton = document.createElement('button')
    const flagOrangeButton = document.createElement('button')
    const flagRedButton = document.createElement('button')

    // Create header div (row) with 2 divs, title h1 and dueDate div
    // Create div for description and notes(?)
    const title = document.createElement('div')
    const dueDateDiv = document.createElement('div')
    const circle = document.createElement('div')
    const dueDate = document.createElement('div')

    // Append container to todoElementsContainer, container div > checkmark div, todo div
    container.appendChild(checkmark)
    container.appendChild(todo)
    container.appendChild(buttonsContainer)
    checkmark.appendChild(checkmarkButton)

    // Appends buttons to buttons container
    buttonsContainer.appendChild(buttons)
    buttonsContainer.appendChild(flags)
    buttons.appendChild(expandButton)
    buttons.appendChild(deleteButton)
    flags.appendChild(flagBlueButton)
    flags.appendChild(flagOrangeButton)
    flags.appendChild(flagRedButton)

    // Append to todo div > header div, description div
    todo.appendChild(title)
    todo.appendChild(dueDateDiv)
    dueDateDiv.appendChild(circle)
    dueDateDiv.appendChild(dueDate)

    // Change div id/class

    container.classList.add('todo-container')
    container.classList.add('faded-out')

    checkmark.classList.add('buttons')
    checkmark.classList.add('checkmark')
    buttons.classList.add('todo')
    buttonsContainer.classList.add('buttons-container')
    buttons.classList.add('buttons')
    buttons.classList.add('right')
    flags.classList.add('buttons')
    flags.classList.add('right')
    todo.classList.add('todo')
    todo.classList.add('body')

    title.classList.add('todo')
    title.classList.add('title')
    circle.classList.add('fa-solid')
    circle.classList.add('fa-circle')
    circle.classList.add('fa-sm')
    dueDateDiv.classList.add('due-date')
    
    checkmarkButton.setAttribute('title','Checkmark task')
    expandButton.setAttribute('title','Expand task')
    deleteButton.setAttribute('title','Delete task')
    flagBlueButton.setAttribute('title','Set low priority')
    flagOrangeButton.setAttribute('title','Set medium priority')
    flagRedButton.setAttribute('title','Set high priority')
 
    // Add fading animation on todo creation
    requestAnimationFrame(() => {
        container.classList.remove('faded-out')
    })
  

    // Change text content of divs depending on the property values from the object
    checkmarkButton.innerHTML = '<i class="fa-solid fa-check fa-2xs"></i>'
    title.textContent = todoObject.title
    dueDate.textContent = todoObject.dueDate
    expandButton.innerHTML = '<i class="fa-solid fa-angle-down"></i>'
    deleteButton.innerHTML = '<i class="fa-solid fa-trash-can fa-lg">'
    flagBlueButton.innerHTML = '<i class="fa-solid fa-flag blue"></i>'
    flagOrangeButton.innerHTML = '<i class="fa-solid fa-flag orange"></i>'
    flagRedButton.innerHTML = '<i class="fa-solid fa-flag red"></i>'

    // Change title bg depending on property value 'priority'
    dueDateDiv.style.color = checkTodoPriority(todoObject)

    // Add event listeners to buttons within the todo div
    addEventListenerCheckmarkButton(checkmarkButton,todoObject)
    addEventListenerExpandTodo(expandButton,todoObject,todo)
    addEventListenerTodoDeleteButton(deleteButton, todoObject)
    addEventListenerPriorityButton(flagBlueButton,todoObject,dueDateDiv)
    addEventListenerPriorityButton(flagOrangeButton,todoObject,dueDateDiv)
    addEventListenerPriorityButton(flagRedButton,todoObject,dueDateDiv)

    // Return container to be appended in index.js
    return container
}

export default renderViewTodoFromProject

function checkTodoPriority(todo) {
    const PRIORITY_COLORS = {
        1: 'darkblue',
        2: 'darkorange',
        3: 'crimson',
    }
    return PRIORITY_COLORS[todo.priority]
}
