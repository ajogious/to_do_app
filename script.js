'use strict';
//  ==== UI ELEMENT ==== //
const messageBox = document.querySelector('.note__message');
const messages = document.querySelector('.message');
const close = document.querySelector('.close');
const textArea = document.querySelector('.text--area');
const btnSave = document.querySelector('.btn--save-note');
const btnEdit = document.querySelector('.btn--edit');
const btnDelete = document.querySelector('.btn--delete');
const noteApp = document.querySelector('.note__app');
const closeIcon = document.querySelector('.close');

////////////
let arrGlobal = [];
///////////

function messageAlert(cssColor, message) {
  if (textArea.value === '') {
    messages.textContent = message;
    cssColor.classList.remove('success');
    cssColor.classList.remove('danger');
    cssColor.classList.add('warning');
  } else {
    messages.textContent = message;
    cssColor.classList.add('success');
    cssColor.classList.remove('warning');
    cssColor.classList.remove('danger');
  }
}

function newElement(elements) {
  noteApp.innerHTML = '';
  elements.forEach((element) => {
    const newDiv = document.createElement('div');
    newDiv.className = 'note__box';
    newDiv.innerHTML = `<div class='note__flex'>
                            <i class="fa fa-check fa-2x"></i>
                            <p class="note__text">
                            ${element}
                          </p>
                        </div>
                        <div class="note__btn">
                          <div class="btn btn--edit">EDIT</div>
                          <div class="btn btn--delete">DELETE</div>
                        </div>`;

    noteApp.insertBefore(newDiv, noteApp.children[0]);
    messageAlert(messageBox, 'Note added successfully');
    messageBox.classList.remove('hidden');
  });
}

function storedTask() {
  if (textArea.value !== '') {
    arrGlobal.push(textArea.value);
    newElement(arrGlobal);
    localStorage.setItem('task', JSON.stringify(arrGlobal));
  } else {
    messageAlert(messageBox, `Text area can't be empty`);
    messageBox.classList.remove('hidden');
  }

  textArea.value = '';
}

function getStored() {
  if (localStorage.getItem('task')) {
    let getLocal = localStorage.getItem('task');
    if (getLocal) {
      arrGlobal = JSON.parse(getLocal) || '';
      newElement(arrGlobal);
    }
  }
  messageBox.classList.remove('danger');
  messageBox.classList.remove('success');
  messageBox.classList.remove('warning');
}
window.addEventListener('load', getStored);

btnSave.addEventListener('click', storedTask);
closeIcon.addEventListener('click', () => {
  messageBox.classList.add('hidden');
});

// delete note
noteApp.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn--delete')) {
    const removingParent = e.target.parentElement.parentElement;

    removeLocalTask(removingParent);
    if (confirm('Are you sure?')) {
      noteApp.removeChild(removingParent);
      messageAlert(messageBox, 'Note removed successfully');
      messageBox.classList.add('danger');
      messageBox.classList.remove('success');
      messageBox.classList.remove('warning');
    }
  } else if (e.target.classList.contains('btn--edit')) {
    if (e.target.textContent === 'EDIT') {
      textArea.value =
        e.target.parentElement.parentElement.firstChild.children[1].textContent.trim();
      const removingParent = e.target.parentElement.parentElement;
      removeLocalTask(removingParent);
    }
  }
});

function removeLocalTask(task) {
  if (localStorage.getItem('task')) {
    let getLocal = localStorage.getItem('task');
    if (getLocal) {
      arrGlobal = JSON.parse(getLocal) || [];
    }
  }
  const taskIndex = task.children[0].children[1].innerHTML.trim();
  arrGlobal.splice(arrGlobal.indexOf(taskIndex), 1);

  localStorage.setItem('task', JSON.stringify(arrGlobal));
}
