const form = document.querySelector("#signup-form");
const name = document.querySelector("#name");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm_password");

// errors when the input box is empty
const nameError = document.querySelector("#name-error");
const emailError = document.querySelector("#email-error");
const passwordError = document.querySelector("#password-error");
const confirmPasswordError = document.querySelector("#confirm_password-error");
if (form) {
  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const data = {
      name: name.value,
      email: email.value,
      password: password.value,
    };
    console.log(name.value);
    console.log(email.value);
    if (name.value === "") {
      console.log("Name is empty");
      nameError.textContent = "Name is required";
      return;
    } else {
      nameError.textContent = "";
    }
    if (email.value === "") {
      console.log("Email is empty");
      emailError.textContent = "Email is required";
      return;
    } else if (!email.value.includes("@")) {
      console.log("Invalid email");
      emailError.textContent = "Invalid email";
      return;
    } else if (!email.value.includes(".")) {
      console.log("Invalid email");
      emailError.textContent = "Email must contain .";
      return;
    } else {
      emailError.textContent = "";
    }
    if (password.value === "") {
      console.log("Password is empty");
      passwordError.textContent = "Password is required";
      return;
    } else if (password.value.length < 8) {
      passwordError.textContent = "Password must be at least 8 characters";
      return;
    } else {
      passwordError.textContent = "";
    }
    if (confirmPassword.value === "") {
      console.log("Confirm password is empty");
      confirmPasswordError.textContent = "Confirm the password";
      return;
    } else {
      confirmPasswordError.textContent = "";
    }
    if (password.value !== confirmPassword.value) {
      console.log("Password do not match");
      confirmPasswordError.textContent = "Password does not match";
      return;
    }
    console.log("Passwords match");
    const response = await fetch("http://127.0.0.1:5000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    console.log(result.message);
    console.log("Form sumbitted");
  });
}

// Sign in
const loginForm = document.querySelector("#login-form");

if (loginForm) {
  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const loginEmail = document.querySelector("#login-email");
    const loginPassword = document.querySelector("#login-password");
    const loginMessage = document.querySelector("#login-message");
    const loginEmailError = document.querySelector("#login-email-error");

    const data = {
      email: loginEmail.value,
      password: loginPassword.value,
    };

    if (loginEmail.value === "") {
      loginEmailError.textContent = "Email is required";
      return;
    }
    if (!loginEmail.value.includes("@")) {
      loginEmailError.textContent = "Invalid email";
      return;
    }
    if (loginPassword.value === "") {
      loginEmailError.textContent = "Password is required";
      return;
    }
    const response = await fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    console.log(result.message);
    loginMessage.textContent = result.message;
    if (!response.ok) {
      loginEmailError.textContent = result.message;
      return;
    }
    if (response.ok) {
      localStorage.setItem("access_token", result.access_token);

      const token = localStorage.getItem("access_token");

      const profileResponse = await fetch("http://127.0.0.1:5000/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const profileResult = await profileResponse.json();

      console.log(profileResult);

      if (profileResponse.ok) {
        window.location.href = "./profile.html";
      }
    }
  });
}
// Profile
async function loadProfile() {
  const profileName = document.querySelector("#profile-name");
  const profileEmail = document.querySelector("#profile-email");

  const token = localStorage.getItem("access_token");

  if (!token) {
    window.location.href = "./signin.html";
    return;
  }

  const response = await fetch("http://127.0.0.1:5000/profile", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  console.log(result);

  if (response.ok) {
    profileName.textContent = result.name;
    profileEmail.textContent = result.email;
  }
}

if (document.querySelector("#profile-name")) {
  loadProfile();
}

const logoutBtn = document.querySelector("#logout-btn");

if (logoutBtn) {
    logoutBtn.addEventListener("click", function() {

        localStorage.removeItem("access_token");

        window.location.href = "./signin.html";
    });
}