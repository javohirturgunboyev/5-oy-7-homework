const field = document.querySelector('#field');
const button = document.getElementById('button');
const wrapper = document.querySelector('#todo-wrapper');
const btn = document.getElementById('save');

function creatItem(value, id){
    return `
          <div class="item">
                    <div class="left">
                         <input type="checkbox" name="" id="">
                         <p>${value}</p>
                    </div>

                    <div class="right">
                         <button>
                              <i class="fa-regular fa-pen-to-square"></i>
                              <span>Edit</span>
                         </button>

                         <button data-id = ${id} class="delete-item">
                              <i class="fa-solid fa-trash-can"></i>
                              <span>Del</span>
                         </button>

                    </div>
               </div>
     `;
}

function validate(){
    const todo = field.value;
    if(todo.length < 5){
        alert("Eng kamida 6ta belgidan iborat bo`lishi shart")
        field.focus();
        field.style.outlineColor = "red"
        return false;
    }
    return true;
}
function saveItemLocalStorage(value){
     const todo = {
          name: value,
          status: 'active',
          id:Date.now()
     }
     let data = [];
     if(localStorage.getItem('todos')){
          data = JSON.parse(localStorage.getItem('todos'))
     }
     data.push(todo);
     localStorage.setItem('todos', JSON.stringify(data));

     const item = creatItem(field.value, todo.id);
     wrapper.innerHTML += item;

}

button && button.addEventListener('click', function(event){
    event.preventDefault();
    const todo = field.value;
    const isValid = validate();
    if(!isValid){
        return;
    }
    saveItemLocalStorage(field.value);
    field.value = '';
    field.focus();
})

document.addEventListener('DOMContentLoaded', function(){
     let data =[];
     if(localStorage.getItem('todos')){
          data = JSON.parse(localStorage.getItem('todos'))
     }
     if(data.length > 0){
          data.forEach(function(value) {
               const item = creatItem(value.name, value.id)
               wrapper.innerHTML += item;
          })
     }
     const deleteBtn = document.querySelectorAll('.delete-item')
     deleteBtn.length > 0 && deleteBtn.forEach(function(element){
          element.addEventListener('click', function(event){
               event.preventDefault();
               let isDelete = confirm('Rostdanam o`chirasanmi');
               if(isDelete){
                    let deleteId = this.getAtribute('data-id')
                    let copied = JSON.parse(JSON.stringify(data))
                    copied = copied.filter(function(del){
                         return del.id != deleteId;
                    })
                    localStorage.setItem('todos', JSON.stringify(copied))
               }
          })
     })
})


btn && btn.addEventListener('click', function() {
     let name = 'Javohirboy';
     localStorage.setItem('name', name);
     localStorage.setItem('age', 16);

     const user = [
          {name: 'John', age:34},
          {name: 'Doe', age:23},     
     ]
     localStorage.setItem('user', JSON.stringify(user));

     let name = localStorage.getItem('user');
     console.log(JSON.parse(name))

     localStorage.removeItem('name');
     localStorage.clear()
})