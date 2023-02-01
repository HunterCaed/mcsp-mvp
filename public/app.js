


const btn = document.getElementById('btn');
const getBtn = document.getElementById('btnGet');
const results = document.getElementById('results');
const taskUrl = '';

async function putToDoData () {
    
       try {
            let name = document.getElementById('full-name').value;
            let completed = document.getElementById('completed').value;
            let details = document.getElementById('abstract').value;
            console.log(name, completed, details)
        
            const response = await fetch(`${taskUrl}/task`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({taskName: `${name}`, description: `${details}`, completed: `${completed}`}) 
            }).then((response)=>response.json())
       } catch (error) {
        console.log(error)
       }
    
}

                    
  
  btn.addEventListener('click', function (event) {
    
    putToDoData()
    
  });

  getBtn.addEventListener('click', async(e)=>{
    try {
        const response = await fetch(`${taskUrl}/task`, {
            method: "GET",
            headers: {"Content-Type": "application/json"}
        }).then((response)=>response.json())
            .then((data)=>{
                for(let i=0; i<data.length;i++){
                let current = data[i]
                console.log(current)
                const dbInfo = document.createElement('p')
                
                dbInfo.textContent = current.taskname + " " + current.description + " " + current.completed
                results.append(dbInfo)
                // const deleteBtn = document.createElement('button')
                // deleteBtn.textContent = 'Delete'
                // deleteBtn.append(dbInfo)
                }
            })
    } catch (error) {
        console.log(error)
    }
  })

//   taskName TEXT NOT NULL,
//    description TEXT NOT NULL,
//    completed