let formDataEl = document.getElementById('form');
let submitBtnEl = document.querySelector('button');
let tableBodyEl = document.querySelector('tbody');

function buildRow(student) {
    let newTr = document.createElement('tr');

    let tdFirstName = document.createElement('td');
    tdFirstName.textContent = student.firstName;
    newTr.appendChild(tdFirstName);

    let tdLastName = document.createElement('td');
    tdLastName.textContent = student.lastName;
    newTr.appendChild(tdLastName);

    let tdFacultyNumber = document.createElement('td');
    tdFacultyNumber.textContent = student.facultyNumber;
    newTr.appendChild(tdFacultyNumber);

    let tdGrade = document.createElement('td');
    tdGrade.textContent = student.grade;
    newTr.appendChild(tdGrade);

    return newTr;
}

function loadData() {
    tableBodyEl.textContent = ''; // resetting the table
    fetch('http://localhost:3030/jsonstore/collections/students')
        .then(data => data.json())
        .then(data => {
            for (const student of Object.values(data)) {
                let newTr = buildRow(student);
                tableBodyEl.appendChild(newTr);
            }
        })
        .catch(error => {
            '...'
        });
}

function submitHandler(event) {
    event.preventDefault();
    let formData = new FormData(formDataEl);
    let firstName = formData.get('firstName');
    let lastName = formData.get('lastName');
    let facultyNumber = formData.get('facultyNumber');
    let grade = formData.get('grade');
    let inputs = [firstName, lastName, facultyNumber, grade];
    if (inputs.some(el => el === '')) {
        return
    }
    formDataEl.reset();

    fetch('http://localhost:3030/jsonstore/collections/students', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            firstName,
            lastName,
            facultyNumber,
            grade
        })
    })
        .then(response => response.json())
        .then(data => {
            let newTr = buildRow(data);
            tableBodyEl.appendChild(newTr);
        })
        .catch(error => {
            '...'
        });
}

loadData()

submitBtnEl.addEventListener('click', submitHandler)