// "Tasks" LocalStorage
let tasks = JSON.parse(localStorage.getItem("Tasks"));
let arrTasks = [];
if(tasks != null){
  arrTasks.push(tasks);
}
let newArray = arrTasks.flat(Infinity);

// "BooleanValue" LocalStorage
let boolValue = JSON.parse(localStorage.getItem("BooleanValue"));
let checkboxValue = [];
if(boolValue != null){
  checkboxValue.push(boolValue);
}
let newCheckboxValue = checkboxValue.flat(Infinity);

function retainTask(id) {
  let li = document.querySelectorAll("li")[id].innerText;
  document.querySelectorAll("li")[id].innerHTML =
    li +
    "<input type='checkbox' style='margin-left:10px;" +
    "height:18px; width:18px' onclick='cancelTask(" +
    id +
    ")'>" +
    "<button type='button' class='btn1' onclick='removeTask(" +
    id +
    ")'><i class='fa-solid fa-trash-can'></i></button>"+
    "<button type='button' class='btn2' onclick='updateTask(" +
    id +
    ")'><i class='fa-solid fa-pen-to-square'></i></button>";
  document.querySelectorAll("li")[id].style.opacity = "1";
  newCheckboxValue[id] = false;
  localStorage.setItem("BooleanValue", JSON.stringify(newCheckboxValue));
}

function cancelTask(id) {
  let li =
    document.querySelectorAll("#demo")[0].children[id].firstChild.textContent;
  document.querySelectorAll("li")[id].innerHTML =
    "<s>" +
    li +
    "<input type='checkbox' style='margin-left:10px; height:18px; width:18px' id='clickButton' onclick='retainTask(" +
    id +
    ")' checked></s>"+"<button type='button' class='btn1' onclick='removeTask(" +
    id +
    ")'><i class='fa-solid fa-trash-can'></i></button>";
  // document.querySelectorAll("li")[id].style.opacity = "0.3";
  document.querySelectorAll("li")[id].children[0].style.opacity = "0.3"; 
  newCheckboxValue[id] = true;
  localStorage.setItem("BooleanValue", JSON.stringify(newCheckboxValue));
}

function updateTask(id) {
  // console.log(id);
  let newContent = prompt("Update Task : ", newArray[id]);
  if (newContent) {
    newArray[id] = newContent;
    localStorage.setItem("Tasks", JSON.stringify(newArray));
    document.querySelectorAll("#demo")[0].children[id].firstChild.textContent =
      newContent;
  }
}

// ********* Create tasks into the todo list *********
let createTask = () => {
  // let task = prompt("Enter Task");
  let task = document.querySelector("#task").value;
  if (task) {
    newArray.push(task);
    localStorage.setItem("Tasks", JSON.stringify(newArray));
    let tasks = JSON.parse(localStorage.getItem("Tasks"));
    if (tasks[tasks.length - 1] != undefined) {
      let li = document.createElement("li");
      let text = document.createTextNode(tasks[tasks.length - 1]);
      let input = document.createElement("input");
      input.type = "checkbox";
      input.style = "margin-left:10px; height:18px; width:18px";
      input.onclick = () => {
        cancelTask(tasks.length - 1);
      };
      let btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn2";
      btn.onclick = () => {
        updateTask(tasks.length - 1);
      };
      let icon1 = document.createElement("i");
      icon1.className = "fa-solid fa-pen-to-square";
      btn.appendChild(icon1);

      let btn1 = document.createElement("button");
      btn1.type = "button";
      btn1.className = "btn1";
        btn1.onclick = () => {
          removeTask(tasks.length - 1);
        };
      let icon2 = document.createElement("i");
      icon2.className = "fa-solid fa-trash-can";
      btn1.appendChild(icon2);

      li.appendChild(text);
      li.appendChild(input);
      li.appendChild(btn1);
      li.appendChild(btn);
      li.style = "margin:15px 15px 15px 30px; font-size:19px;font-family:verdana;";
      if(window.innerWidth <= 617){
        li.style = "margin:15px 15px 15px 30px; font-size:15px; font-family:verdana;";
      }
      if(window.innerWidth <= 542){
        li.style = "margin:15px 15px 15px 30px; font-size:14px; font-family:verdana;";
      }
      if(window.innerWidth <= 491){
        li.style = "margin:15px 15px 15px 30px; font-size:14px; font-family:verdana;";
      }
      if(window.innerWidth <= 442){
        li.style = "margin:15px 15px 15px 30px; font-size:11px; font-family:verdana;";
      }
      document.getElementById("demo").append(li);

      // ------ Boolean Value Array ------
      newCheckboxValue.push(false);
      localStorage.setItem("BooleanValue", JSON.stringify(newCheckboxValue));
      // Emptying text field
      document.querySelector("#task").value = "";
    }
  }
};

// ********* Displays the tasks of todo list from the localStorage *********
for (let i = 0; i < tasks.length; i++) {
  let li = document.createElement("li");
  li.style = "margin:15px 15px 15px 30px; font-size:19px; font-family:verdana;";
  if(window.innerWidth <= 617){
    li.style = "margin:15px 15px 15px 30px; font-size:15px; font-family:verdana;";
  }
  if(window.innerWidth <= 542){
    li.style = "margin:15px 15px 15px 30px; font-size:14px; font-family:verdana;";
  }
  if(window.innerWidth <= 491){
    li.style = "margin:15px 15px 15px 30px; font-size:14px; font-family:verdana;";
  }
  if(window.innerWidth <= 442){
    li.style = "margin:15px 15px 15px 30px; font-size:11px; font-family:verdana;";
  }
  if (boolValue[i]) {
    let s = document.createElement("s");
    let text = document.createTextNode(tasks[i]);
    let input = document.createElement("input");
    input.type = "checkbox";
    input.style = "margin-left:10px; height:18px; width:18px";
    input.checked = boolValue[i];
    input.onclick = () => retainTask(i);
    let btn1 = document.createElement("button");
    btn1.type = "button";
    btn1.className = "btn1";

    btn1.onclick = () => {
      removeTask(i);
    };
    let icon2 = document.createElement("i");
    icon2.className = "fa-solid fa-trash-can";
    btn1.appendChild(icon2);

    s.appendChild(text);
    s.appendChild(input);
    li.appendChild(s);
    li.appendChild(btn1);
    s.style = "opacity:0.3";
    document.getElementById("demo").append(li);
  } else {
    let text = document.createTextNode(tasks[i]);
    let input = document.createElement("input");
    input.type = "checkbox";
    input.style = "margin-left:10px; height:18px; width:18px";

    input.onclick = () => cancelTask(i);
    let btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn2";
    btn.onclick = () => {
      updateTask(i);
    };
    let icon1 = document.createElement("i");
    icon1.className = "fa-solid fa-pen-to-square";
    btn.appendChild(icon1);

    let btn1 = document.createElement("button");
    btn1.type = "button";
    btn1.className = "btn1";
    btn1.onclick = () => {
      removeTask(i);
    };
    let icon2 = document.createElement("i");
    icon2.className = "fa-solid fa-trash-can";
    btn1.appendChild(icon2);

    li.appendChild(text);
    li.appendChild(input);
    li.appendChild(btn1);
    li.appendChild(btn);
    document.getElementById("demo").append(li);
  }
}

// ********* Remove tasks from the todo list *********
function removeTask(id) {
  newArray.splice(id, 1);
  newCheckboxValue.splice(id, 1);
  localStorage.setItem("Tasks", JSON.stringify(newArray));
  localStorage.setItem("BooleanValue", JSON.stringify(newCheckboxValue));
  let tasks11 = JSON.parse(localStorage.getItem("Tasks"));
  // console.log(tasks11.length);
  for(let i=tasks11.length; i >= 0;i--){
    document.getElementById("demo").children[i].remove();
  }
  setListAgainRemovalOfTask();
}


function setListAgainRemovalOfTask(){
// "Tasks" LocalStorage
let tasks1 = JSON.parse(localStorage.getItem("Tasks"));
// "BooleanValue" LocalStorage
let boolValue1 = JSON.parse(localStorage.getItem("BooleanValue"));

// ********* Displays the tasks of todo list from the localStorage to change the IDs *********
for (let i = 0; i < tasks1.length; i++) {
  let li = document.createElement("li");
  li.style = "margin:15px 15px 15px 30px; font-size:19px;font-family:verdana;";
  if(window.innerWidth <= 617){
    li.style = "margin:15px 15px 15px 30px; font-size:15px; font-family:verdana;";
  }
  if(window.innerWidth <= 542){
    li.style = "margin:15px 15px 15px 30px; font-size:14px; font-family:verdana;";
  }
  if(window.innerWidth <= 491){
    li.style = "margin:15px 15px 15px 30px; font-size:14px; font-family:verdana;";
  }
  if(window.innerWidth <= 442){
    li.style = "margin:15px 15px 15px 30px; font-size:11px; font-family:verdana;";
  }
  if (boolValue1[i]) {
    let s = document.createElement("s");
    let text = document.createTextNode(tasks1[i]);
    let input = document.createElement("input");
    input.type = "checkbox";
    input.style = "margin-left:10px; height:18px; width:18px";
    input.checked = boolValue1[i];
    input.onclick = () => retainTask(i);
    let btn1 = document.createElement("button");
    btn1.type = "button";
    btn1.className = "btn1";

    btn1.onclick = () => {
      removeTask(i);
    };
    let icon2 = document.createElement("i");
    icon2.className = "fa-solid fa-trash-can";
    btn1.appendChild(icon2);

    s.appendChild(text);
    s.appendChild(input);
    li.appendChild(s);
    li.appendChild(btn1);
    s.style = "opacity:0.3";
    document.getElementById("demo").append(li);
  } 
  else {
    let text = document.createTextNode(tasks1[i]);
    let input = document.createElement("input");
    input.type = "checkbox";
    input.style = "margin-left:10px; height:18px; width:18px";

    input.onclick = () => cancelTask(i);
    let btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn2";
    btn.onclick = () => {
      updateTask(i);
    };
    let icon1 = document.createElement("i");
    icon1.className = "fa-solid fa-pen-to-square";
    btn.appendChild(icon1);

    let btn1 = document.createElement("button");
    btn1.type = "button";
    btn1.className = "btn1";
    btn1.onclick = () => {
      removeTask(i);
    };
    let icon2 = document.createElement("i");
    icon2.className = "fa-solid fa-trash-can";
    btn1.appendChild(icon2);

    li.appendChild(text);
    li.appendChild(input);
    li.appendChild(btn1);
    li.appendChild(btn);
    document.getElementById("demo").append(li);
  }
}
}

