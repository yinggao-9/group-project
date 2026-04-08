//check password to see the content of password
//login
const checkpassword = document.querySelector('.check-password ');
const loginPassword = document.querySelector('.login #login-password');
checkpassword.addEventListener('click',() => {
    loginPassword.type="text";
})
//register
const password = document.querySelector('.register #register-password');
const iconBtn = document.querySelector('.register .icon-btn');
const iconEye = document.querySelector('.register .icon-eyeclose-fill');
iconBtn.addEventListener('click',function(e){
    e.preventDefault();
    e.stopPropagation();
    if(password.type == "password"){
        password.type = "text"
    } else{
        password.type = "password"
    }
    iconEye.classList.toggle('icon-eye');  
    iconEye.classList.toggle('icon-eyeclose-fill'); 
})



//login and register switch
const registerLink = document.querySelector('.register-link');
const loginLink  = document.querySelector('.login-link');
const container = document.querySelector('.container');
registerLink.addEventListener('click',function(){
    container.classList.add('active');
})
loginLink.addEventListener('click',function(){
    container.classList.remove('active');
})

//reset password and login switch
const forgotpassword = document.querySelector('.Forgot-Password')
const backlogin = document.querySelector('.backloginLink')
forgotpassword.addEventListener('click',() => {
    container.classList.add('reset');
})
backlogin.addEventListener('click',() => {
    container.classList.remove('reset');
})

//add username and password in the localstorage
const username = document.querySelector('.register input[name="username"]');
const maxlengthInfo =  document.querySelector('.register .username-limit');
const email = document.querySelector('.register #register-email');
// const password =  document.querySelector('.register #register-password');
const termsCheck = document.querySelector('.register .conditions');
const registerBtn = document.querySelector('.register .register-btn')
const resetRegisterForm = document.querySelector('.register .register-form')

//username (maxlength 10)
username.addEventListener('input',function(){
    if (this.value.length == 10){
        maxlengthInfo.innerText = '(maxlength 10)';
    }else{
        maxlengthInfo.innerText ='';
    }
})

function saveUserInfo(username,email,password){
    const user = {
        username: username,
        email: email,
        password: password
    }
    localStorage.setItem(`user_${email}`,JSON.stringify(user));
}
// register user
registerBtn.addEventListener('click',function(e){
    if(!username.checkValidity()){
        username.reportValidity();
        return;
    }
    if(!email.checkValidity()){
        email.reportValidity();
        return;
    }
    if(!password.checkValidity()){
        password.reportValidity();
        return;
    }
    if (!termsCheck.checked) {
        termsCheck.reportValidity();
        return;
    }
    e.preventDefault();
    saveUserInfo(username.value,email.value,password.value);
    alert('Congratulations on successful registration!');
    resetRegisterForm.reset();
})

//verify email and password on the login page
const inputEmail = document.querySelector('.login #login-email');
const inputPassword = document.querySelector('.login #login-password');
const loginBtn = document.querySelector('.login button')
const loginForm = document.querySelector('.login .login-form')
let emailMatch =false;
let passwordMatch =false;
let currentUser = null;

function verifyAllUser(){
    for (let i =0;i < localStorage.length;i++){
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        const data = JSON.parse(value);
        if(data.email && data.password){
            if(data.email === inputEmail.value){
                emailMatch = true;
                if(data.password === inputPassword.value){
                    passwordMatch = true;
                    currentUser = data;
                    break;
                }  
            }
        }
    }
 }
function verifyInfo(){
    verifyAllUser();
if (inputEmail.value != '' && inputPassword.value != ''){
    if (!emailMatch){
        console.log()
        alert("email do not exist");
        return false;
    }else if (!passwordMatch){
        alert("Wrong Password");
        return false;
    }else{
        const loginUser = {
            username: currentUser.username
        }
        localStorage.setItem("currentUser",JSON.stringify(loginUser));

        // save profile for MyAccount
        localStorage.setItem("userProfile", JSON.stringify({
            name: currentUser.username,
            email: currentUser.email,
            phone: ""
        }));

        loginForm.action = "../index.html";
        }
    }
}
loginBtn.addEventListener('click',function(){
    emailMatch = false;
    passwordMatch = false;
    if(!inputEmail.checkValidity()){
        inputEmail.reportValidity();
        return false;
    }
    verifyInfo();
});
    

// reset password
const inputResetEmail = document.querySelector('.reset-password .reset-email');
const inputResetPassword = document.querySelector('.reset-password .new-password');
const resetForm = document.querySelector('.reset-password .reset-form');
const resetBtn = document.querySelector('.reset-password .reset-btn');
let user = '';
function resetUser(){
    let findEmail = false;
     for (let i =0;i < localStorage.length;i++){
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        const data = JSON.parse(value);
        console.log(data)
        if (inputResetEmail.value === data.email){
            user = data.username;
            localStorage.removeItem(key);
            findEmail = true;
            break;
        }
    }
        if (!findEmail){
            alert("Email don't exist");
            return false;
        }
        return true;
}
function updateUser(username,email,password){
    const newUser = {
        username: username,
        email:email,
        password:password
    }
    localStorage.setItem(`user_${email}`,JSON.stringify(newUser))
}
resetBtn.addEventListener('click',function(e){
    if(!inputResetEmail.checkValidity()){
        inputResetEmail.reportValidity();
        return false;
    }
    e.preventDefault();
    const userFind = resetUser();
    if(userFind){
    updateUser(user,inputResetEmail.value,inputResetPassword.value);
    alert("Reset Password Successfully!");
    resetForm.reset();
    }
})




