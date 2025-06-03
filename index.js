// Load saved users when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadUsers();
});

document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = new Date(document.getElementById('dob').value);
    const termsAccepted = document.getElementById('terms').checked;

    // Age validation (between 18 and 55)
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
    }

    if (age < 18 || age > 55) {
        alert('You must be between 18 and 55 years old to register.');
        return;
    }

    // Format date for display
    const formattedDob = dob.toISOString().split('T')[0];

    // Create user object
    const user = {
        name,
        email,
        password,
        dob: formattedDob,
        termsAccepted
    };

    // Add to table
    addUserToTable(user);

    // Save to localStorage
    saveUser(user);

    // Reset the form
    this.reset();
});

function addUserToTable(user) {
    const tableBody = document.getElementById('tableBody');
    const newRow = tableBody.insertRow();

    newRow.insertCell(0).textContent = user.name;
    newRow.insertCell(1).textContent = user.email;
    newRow.insertCell(2).textContent = user.password;
    newRow.insertCell(3).textContent = user.dob;
    newRow.insertCell(4).textContent = user.termsAccepted;
}

function saveUser(user) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
}

function loadUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.forEach(user => addUserToTable(user));
}
