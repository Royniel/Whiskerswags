function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}
 
function validatePassword(password) {
    if (password.length < 8) {
        return "Password must be at least 8 characters long.";
    }
    if (!/[A-Z]/.test(password)) {
        return "Password must contain at least one capital letter.";
    }
    if (!/[@!]/.test(password)) {
        return "Password must contain at least one special symbol like @ or !";
    }
    return null;
}
 
function validateForm() {
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const phoneNumber = document.getElementById('phoneNumber').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
 
    if (!/^[a-zA-Z]+$/.test(firstName)) {
        alert("First name should contain only alphabetical characters.");
        return false;
    }
 
    if (!/^[a-zA-Z]+$/.test(lastName)) {
        alert("Last name should contain only alphabetical characters.");
        return false;
    }
 
    if (!/^\d{10}$/.test(phoneNumber)) {
        alert("Phone number should contain only numerical characters.");
        return false;
    }
 
    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return false;
    }
 
    const passwordError = validatePassword(password);
    if (passwordError) {
        alert(passwordError);
        return false;
    }
 
    return true;
}
 
function validateLogin() {
    const inputUsername = document.getElementById('inputUsername').value.trim();
    const inputPassword = document.getElementById('inputPassword').value;
 
    if (!validateEmail(inputUsername)) {
        alert("Please enter a valid email address.");
        return false;
    }
 
    const passwordError = validatePassword(inputPassword);
    if (passwordError) {
        alert(passwordError);
        return false;
    }
 
    return true;
}
 
function validateFP() {
    const email = document.getElementById('Email').value.trim();
 
    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return false;
    }
 
    alert("Password reset instructions have been sent to your email.");
    window.location.href = "login.html";
    return false;
}