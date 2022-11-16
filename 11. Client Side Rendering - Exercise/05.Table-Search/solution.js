import { html, render } from './node_modules/lit-html/lit-html.js';

const table = document.querySelector('tbody');
document.querySelector('#searchBtn').addEventListener('click', onClick);

getData();

async function getData() {
   const response = await fetch('http://localhost:3030/jsonstore/advanced/table');
   const students = await response.json();
   update(Object.values(students).map(st => createRow(st)));
}

function createRow(student) {
   return html`
      <tr id=${student._id} class=>
         <td>${student.firstName} ${student.lastName}</td>
         <td>${student.email}</td>
         <td>${student.course}</td>
      </tr>`;
}

function update(student) {
   render(student, table);
}

function onClick(e) {
   e.preventDefault();
   const rows = document.querySelectorAll('tbody tr');
   const inputElement = document.querySelector('#searchField');
   const searchedText = inputElement.value.toLowerCase();

   for (let row of rows) {
      row.removeAttribute('class', 'select');
      const rowText = row.textContent.toLowerCase();

      if (rowText.includes(searchedText) && searchedText !== '') {
         row.className = 'select';
      }
   }
   inputElement.value = '';
}