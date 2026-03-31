// link login page
//when user login successfully,the username and MyAccount will display
const navLis = document.querySelectorAll('.nav li');
const user = JSON.parse(localStorage.getItem('currentUser'));
if(user){
    document.querySelector(".username").innerText = `👋 hi ${user.username}`;
    document.querySelectorAll(".MyAccount").forEach(element => {
        element.classList.remove("d-none");
    });
    document.querySelectorAll(".login-li").forEach(element => {
        element.classList.add("d-none");
    });
    document.querySelectorAll(".loginout-li").forEach(element => {
        element.classList.remove("d-none");
    });
    navLis.forEach(li => {
    li.style.margin = '0 0'; 
    });
}
//login out
const outs = document.querySelectorAll(".loginout-li");
outs.forEach(out => {out.addEventListener("click",function(e){
    e.preventDefault();
    document.querySelector(".username").innerText = '';
    document.querySelectorAll(".MyAccount").forEach(element => {
        element.classList.add("d-none");
    });
    document.querySelectorAll(".login-li").forEach(element => {
        element.classList.remove("d-none");
    });
    document.querySelectorAll(".loginout-li").forEach(element => {
        element.classList.add("d-none");
    });
    localStorage.removeItem('currentUser');
     navLis.forEach(li => {
    li.style.margin = '0 20px'; 
    });
})})