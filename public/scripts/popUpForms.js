let registerBtn = document.querySelector("#register-btn");
let registerForm = document.querySelector("#register-form");
let loginBtn = document.querySelector("#login-btn");
let loginForm = document.querySelector("#login-form");
let closeBtn = document.querySelectorAll(".fa-window-close");

registerBtn.addEventListener("click", function(){
  registerForm.classList.remove("d-none");
  loginForm.classList.add("d-none");
});

loginBtn.addEventListener("click", function(){
  loginForm.classList.remove("d-none");
  registerForm.classList.add("d-none");
});

// the register form appears above the login form in the ejs file
// so it'll come first the the querySelectorAll array
closeBtn[0].addEventListener("click", function(){
  registerForm.classList.add("d-none");
});

closeBtn[1].addEventListener("click", function(){
  loginForm.classList.add("d-none");
});
