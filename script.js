let isSignup = false;

function toggleForm() {
  isSignup = !isSignup;
  document.getElementById("form-title").textContent = isSignup ? "Sign Up" : "Login";
  document.getElementById("submit-btn").textContent = isSignup ? "Sign Up" : "Login";
  document.getElementById("confirmPassword").style.display = isSignup ? "block" : "none";
  document.getElementById("toggle-form").innerHTML = isSignup
    ? `Already have an account? <a href="#" onclick="toggleForm()">Login</a>`
    : `Don't have an account? <a href="#" onclick="toggleForm()">Sign Up</a>`;
  document.getElementById("message").textContent = "";
}

document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const message = document.getElementById("message");

  if (isSignup) {
    if (password !== confirmPassword) {
      message.textContent = "Passwords do not match!";
      return;
    }
    const users = JSON.parse(localStorage.getItem("users") || "{}");
    if (users[email]) {
      message.textContent = "User already exists!";
      return;
    }
    users[email] = password;
    localStorage.setItem("users", JSON.stringify(users));
    message.textContent = "Signup successful! You can now login.";
    toggleForm();
  } else {
    const users = JSON.parse(localStorage.getItem("users") || "{}");
    if (users[email] && users[email] === password) {
      message.textContent = "Login successful!";
    } else {
      message.textContent = "Invalid email or password.";
    }
  }
});

function forgotPassword() {
  const email = prompt("Enter your registered email:");
  if (!email) return;

  const users = JSON.parse(localStorage.getItem("users") || "{}");
  if (users[email]) {
    alert("Your password is: " + users[email]);
  } else {
    alert("No user found with this email.");
  }
}
