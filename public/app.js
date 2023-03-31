"use strict";
let classList;
classList = {
    bodyClass: 'px-4 pt-8 pb-4 bg-gradient-to-b from-indigo-900 to-slate-900 bg-opacity-80 text-white rounded-md shadow-2xl shadow-black border-b-2 border-r border-slate-500 relative',
    closeButtonClass: 'absolute top-0 right-0 m-1 text-xs text-pink-600 border border-pink-600 p-1',
    readButtonClass: 'absolute top-0 left-0 m-1 p-1 text-teal-500 border border-teal-500 text-xs'
};
let TODOLIST = [];
const form = document.querySelector('form');
const List = document.querySelector('#todoList');
// function to adding todo with eventlistenet for every delete button.
const manageTodo = (data, read) => {
    const li = document.createElement('li');
    const paragraph = document.createElement('p');
    const closeBtn = document.createElement('button');
    const bodyClass = classList.bodyClass.split(" ");
    const closeButtonClass = classList.closeButtonClass.split(" ");
    // adding class
    bodyClass.forEach((elm) => {
        li.classList.add(elm);
    });
    closeButtonClass.forEach((elm) => {
        closeBtn.classList.add(elm);
    });
    const index = TODOLIST.length;
    li.setAttribute('name', `item_${index + 1}`);
    closeBtn.setAttribute('id', `item_${index + 1}`);
    paragraph.innerHTML = data;
    closeBtn.innerHTML = 'Delete';
    li.appendChild(paragraph);
    li.appendChild(closeBtn);
    List.appendChild(li);
    let currentTodo = {
        data: data, id: `item_${index + 1}`, index: index, read: read
    };
    TODOLIST.push(currentTodo);
    localStorage.setItem('list', JSON.stringify(TODOLIST));
    // remove process
    closeBtn.addEventListener('click', () => {
        const note = data.split(' ').slice(0, 5).join(' ');
        const ack = confirm(`Do you want to delete note : ${note} ...`);
        if (ack) {
            const storage = localStorage.getItem('list');
            if (storage !== null) {
                const oldList = JSON.parse(storage);
                oldList.splice(currentTodo.index, 1);
                localStorage.setItem('list', JSON.stringify(oldList));
                closeBtn.remove();
                paragraph.remove();
                li.remove();
            }
        }
    });
    // read process only available if it is not mark as read 
    if (read) {
        paragraph.classList.add('line-through');
    }
    else {
        const readBtn = document.createElement('button');
        const readButtonClass = classList.readButtonClass.split(' ');
        readButtonClass.forEach((elm) => {
            readBtn.classList.add(elm);
        });
        readBtn.innerHTML = 'Mark as read';
        li.appendChild(readBtn);
        readBtn.addEventListener('click', () => {
            const storage = localStorage.getItem('list');
            if (storage !== null) {
                const oldList = JSON.parse(storage);
                oldList.splice(currentTodo.index, 1);
                oldList.splice(currentTodo.index, 0, Object.assign(Object.assign({}, currentTodo), { read: true }));
                localStorage.setItem('list', JSON.stringify(oldList));
            }
            paragraph.classList.add('line-through');
            readBtn.remove();
        });
    }
};
// handel page refresh, getting items from local storage.
const oldList = localStorage.getItem('list');
if (oldList !== null) {
    const total = JSON.parse(oldList);
    total.forEach((curr) => {
        manageTodo(curr.data, curr.read);
    });
}
// adding new todo
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const newDo = document.querySelector('#newDo');
    manageTodo(newDo.value, false);
});
