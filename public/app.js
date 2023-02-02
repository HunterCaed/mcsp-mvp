const getTask = async () => {
    const response = await fetch(`${taskUrl}/task`)
    const data = await response.json()
    console.log(data)
    createTaskList(data)
}

const addTask = async (name) => {
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            "task": `${name}`
        })
    }
    const response = await fetch(`${taskUrl}/task`, options)
    const data = await response.json()
    
    if (data.validation) {
        createTaskList(data.data)
    } 
}

const deleteTask = async (id) => {
    const options = {
        method:'DELETE',
    }
    const response = await fetch(`${API_URL}/task/${id}`, options)
    const data = await response.json()
    getTask()
    if (data.validation) {
        getTask()
    }
}

const updateTask = async (id, description) => {
    const options = {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'content-type': 'application/json',

        },
        body: JSON.stringify({
            "task": `${description}`
        })
    }
    await fetch(`${taskUrl}/task/${id}`, options)
}


const createTaskList = async (data) => {
    const todoItemsContainer = document.getElementById('todo-items-container')
    todoItemsContainer.innerHTML = ''
    console.log(data)
    
    for (obj of data) { 
     console.log(obj)       
    const todoItemContainer = document.createElement('div')
    todoItemContainer.setAttribute('id', `${obj.id}`)
    todoItemContainer.classList.add('todo-item-container')
    todoItemsContainer.appendChild(todoItemContainer)

    const todoTaskName = document.createElement('div')
    todoTaskName.classList.add('task-name')
    todoTaskName.setAttribute('contentEditable', 'true')
    todoTaskName.innerText = `${obj.task}`
    todoTaskName.addEventListener('input', (e) => {
      updateTask(e.currentTarget.parentElement.id, e.currentTarget.innerText)
    })
    todoItemContainer.appendChild(todoTaskName)

    const todoDeleteBtn = document.createElement('button')
    todoDeleteBtn.classList.add('delete-btn')
    todoDeleteBtn.innerText ='Delete'
    todoDeleteBtn.addEventListener('click', (e) => {
      deleteTask(e.currentTarget.parentElement.id)
    })
    todoItemContainer.appendChild(todoDeleteBtn)
  }
    
}


const API_URL = '';
const btn = document.getElementById('btn');
const getBtn = document.getElementById('btnGet');
const results = document.getElementById('results');
const resultscont = document.getElementById('rresults-cont')
const taskUrl = '';
const addBtn = document.getElementById('add-btn')

getTask() 

addBtn.addEventListener('click', () => {
    const todoInput = document.getElementById('todo-input')
    addTask(todoInput.value)
    console.log(todoInput.value)
    todoInput.value = ''
})


// async function putToDoData () {
//        try {
//             let name = document.getElementById('full-name').value;
//             let completed = document.getElementById('completed').value;
//             let details = document.getElementById('abstract').value;
//             console.log(name, completed, details)
            
//             const response = await fetch(`${taskUrl}/task`, {
//                 method: "POST",
//                 headers: {"Content-Type": "application/json"},
//                 body: JSON.stringify({taskName: `${name}`, description: `${details}`, completed: `${completed}`}) 
//             }).then((response)=>response.json())
//        } catch (error) {
//         console.log(error)
//        }
    
// }
                  
  
// btn.addEventListener('click', function (event) {  //Button to submit Form
    
//     putToDoData()
    
//   });
 
 
//   window.addEventListener('load', async(e)=>{
//     try {
//         // const response = await fetch(`${taskUrl}/task`, {
//         //     method: "GET",
//         //     headers: {"Content-Type": "application/json"}
//         // }) .then((response)=>response.json())
//         getTask().then((data)=>{
                
//                 for(let i=0; i<data.length;i++){
//                 let current = data[i]
//                 console.log(current)
//                 const dbInfo = document.createElement('p')
//                 dbInfo.textContent = current.taskname + " " + current.description + " " + current.completed
//                 results.append(dbInfo)
//                 }
                
//             })
//     } catch (error) {
//         console.log(error)
//     }
//   })

// window.addEventListener('load', async (e) =>{
//     try{
//         createTaskList ()
//     } catch (error) {
//         console.log(error)
//     }
// })
