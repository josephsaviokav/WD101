document.addEventListener('DOMContentLoaded', function () {
    loadUsers();

    const form = document.getElementById('registrationForm');

    if (!form) {
        console.error('Form not found!');
        return;
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const dobInput = document.getElementById('dob');
        const dob = new Date(dobInput.value);
        const termsAccepted = document.getElementById('terms').checked;

        // Required field check
        if (!name || !email || !password || !dobInput.value) {
            alert('Please fill in all required fields');
            return;
        }

        // Age validation (18–55)
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
            age--;
        }

        if (age < 18 || age > 55) {
            alert('You must be between 18 and 55 years old to register.');
            return;
        }

        const formattedDob = dob.toISOString().split('T')[0];

        const user = {
            name,
            email,
            password,
            dob: formattedDob,
            termsAccepted
        };

        addUserToTable(user);
        saveUser(user);
        form.reset();
    });
});

function addUserToTable(user) {
    const tableBody = document.getElementById('tableBody');
    if (!tableBody) return;

    const row = tableBody.insertRow();
    row.insertCell(0).textContent = user.name;
    row.insertCell(1).textContent = user.email;
    row.insertCell(2).textContent = user.password;
    row.insertCell(3).textContent = user.dob;
    row.insertCell(4).textContent = user.termsAccepted ? "Yes" : "No";
}

function saveUser(user) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
}

function loadUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const tableBody = document.getElementById('tableBody');
    if (!tableBody) return;

    tableBody.innerHTML = ''; // Clear table before loading
    users.forEach(user => addUserToTable(user));
}
