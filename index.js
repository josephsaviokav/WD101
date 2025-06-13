document.addEventListener('DOMContentLoaded', function () {
    // Load existing users on page load
    loadUsers();

    const form = document.getElementById('registrationForm');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const dobInput = document.getElementById('dob');
        const dob = new Date(dobInput.value);
        const termsAccepted = document.getElementById('terms').checked;

        if (!name || !email || !password || !dobInput.value || !termsAccepted) {
            alert('Please complete all fields and accept the terms.');
            return;
        }

        // Age validation
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
            age--;
        }

        if (age < 18 || age > 55) {
            alert("You must be between 18 and 55 years old to register.");
            return;
        }

        const formattedDob = dob.toISOString().split("T")[0];

        const user = {
            name,
            email,
            password,
            dob: formattedDob,
            termsAccepted: termsAccepted ? "Yes" : "No"
        };

        // Save to localStorage
        let users = JSON.parse(localStorage.getItem("users")) || [];
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));

        // Add to table immediately
        addUserToTable(user);

        // Reset form
        form.reset();
    });
});

function addUserToTable(user) {
    const tableBody = document.getElementById("tableBody");

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.password}</td>
        <td>${user.dob}</td>
        <td>${user.termsAccepted}</td>
    `;

    tableBody.appendChild(row);
}

function loadUsers() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.forEach(user => {
        addUserToTable(user);
    });
}
