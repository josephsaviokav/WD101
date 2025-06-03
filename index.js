document.addEventListener('DOMContentLoaded', function() {
    // Load any saved users
    loadUsers();

    // Get the form element
    const form = document.getElementById('registrationForm');
    
    if (!form) {
        console.error('Form element not found!');
        return;
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Form submitted!'); // Check if this appears in console

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const dobInput = document.getElementById('dob');
        const termsAccepted = document.getElementById('terms').checked;

        // Validate required fields
        if (!name || !email || !password || !dobInput.value) {
            alert('Please fill in all required fields');
            return;
        }

        // Age validation (18-55 years)
        const dob = new Date(dobInput.value);
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

        // Add to table and storage
        addUserToTable(user);
        saveUser(user);

        // Reset form
        form.reset();
    });
});

function addUserToTable(user) {
    const tableBody = document.getElementById('tableBody');
    if (!tableBody) {
        console.error('Table body not found!');
        return;
    }
    
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
    const tableBody = document.getElementById('tableBody');
    
    if (tableBody) {
        users.forEach(user => addUserToTable(user));
    }
}
