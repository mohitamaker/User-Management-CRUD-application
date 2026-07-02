let name = document.querySelector("#name");
let mail = document.querySelector("#email");
let years = document.querySelector("#age");
let job = document.querySelector("#role");
let form = document.querySelector("#userForm");
let addBtn = document.querySelector(".addBtn");
let usersContainer = document.querySelector("#usersContainer");
let totalUsers = document.querySelector("#totalUsers");
let card = document.querySelector(".card");
let searchsection = document.querySelector(".search-section")
let searchbar = document.querySelector("#searchUser");
let totalusers = document.querySelector(".total-users");
let users = [];
let count = 0;
let editIdx = null;


addBtn.addEventListener('click', (e) => {

    e.preventDefault();

    if (name.value === "" || mail.value === "" || years.value === "" || job.value === "") {
        addBtn.classList.add("disabled");
        return;
    }

    if (editIdx === null) {
        users.push({
            username: name.value,
            email: mail.value,
            age: years.value,
            role: job.value,
        })
        count++;
    }

    else {
        users[editIdx].username = name.value;
        users[editIdx].email = mail.value;
        users[editIdx].age = years.value;
        users[editIdx].role = job.value;
        editIdx = null;
        addBtn.innerHTML = "Add User";
    }
    // console.log(users);
    addBtn.classList.remove("disabled");
    form.reset();
    addUser(users);
    totalUsers.innerText = count;
})

usersContainer.addEventListener('click', (e) => {
    if (e.target.closest(".delete")) {
        removeUser(e.target.closest(".card").id);
    }
    if (e.target.closest(".edit")) {
        editIdx = e.target.closest(".card").id;
        console.log(editIdx);
        console.log(users[editIdx]);
        editUser(editIdx);
    }
})

searchsection.addEventListener('click',(e)=>{
    if(e.target.closest("#sortBtn")){
        console.log(searchbar.value);
        searchUser(searchbar.value);
        searchbar.value="";
    }
})

totalusers.addEventListener('click',(e)=>{
    console.log("click");
    addUser(users);
})

function addUser(arr) {
    let clutter = "";
    arr.forEach((val) => {

        let user = val.user?val.user:val;
        let idx = val.idx!==undefined?val.idx:users.indexOf(val);
        clutter += `<div class="card" id=${idx}>
                    <div class="top">
                        <div class="profile">
                            <i class="fa-regular fa-circle-user"></i>
                        </div>
                        <div class="icons">
                            <button class="edit">
                                <i class="fa-solid fa-pen"></i>
                            </button>
                            <button class="delete">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    <h3 class="name">${user.username}</h3>
                    <p class="email">${user.email}</p>
                    <p class="age">${user.age} Years</p>
                    <span class="role student">${user.role}</span>
                </div>`
    })
    usersContainer.innerHTML = clutter;
}

function removeUser(id) {
    users.splice(id, 1);
    addUser(users);
    count--;
    totalUsers.innerText = count;
}

function editUser(editIdx) {
    name.value = users[editIdx].username;
    mail.value = users[editIdx].email;
    years.value = users[editIdx].age;
    job.value = users[editIdx].role;
    addBtn.innerHTML = "Save";
}

function searchUser(para){
    let filteredArr =
    users.map((user,idx)=>({user,idx})).
    filter((val)=>{
        if(val.user.username.toUpperCase().indexOf(para.toUpperCase()) > -1 || 
        val.user.email.toUpperCase().indexOf(para.toUpperCase()) > -1
        || val.user.role.toUpperCase().indexOf(para.toUpperCase()) > -1){
            return val;
        }
    })
    if(filteredArr.length===0){
        alert("no user found!");
    }else{
        addUser(filteredArr);
    }
}
