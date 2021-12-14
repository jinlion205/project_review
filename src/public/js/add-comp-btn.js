
// Add company
let addCompanyForm = document.querySelector('.add-company-form');

document.querySelector('#btn-add-company').onclick = () =>{
  addCompanyForm.classList.toggle('active');
}

document.querySelector('#close-add-company-btn').onclick = () =>{
  addCompanyForm.classList.remove('active');
}

// // Add company
// let updateCompanyForm = document.querySelector('.update-company-form');

// document.querySelector('#update-company').onclick = () =>{
//     updateCompanyForm.classList.toggle('active');
// }

// document.querySelector('#close-update-company-btn').onclick = () =>{
//     updateCompanyForm.classList.remove('active');
// }