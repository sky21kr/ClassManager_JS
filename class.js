const addBtn = document.querySelector(".addBtn"),
  classDiv = document.querySelector(".jsClassDiv"),
  classForm = document.querySelector(".jsClassForm"),
  toDoInput = document.querySelector(".jsToDoInput");

var classObject = {
  ToDoList: {
    name: "toDoList",
    toDos: [],
  },
};

let timeCheck;

function askForDelClass(btn) {
  const result = confirm("해당 수업을 정말로 삭제하시겠습니까 ?");
  if (result) {
    deleteClass(btn);
  }
}

function deleteClass() {
  classNameForm = event.path[1];
  className = classNameForm.id;

  event.path[2].removeChild(classNameForm);
  delete classObject[className];
  saveToDos();
}

function handleDeleteClass(event) {
  askForDelClass(event);
}

function paintClass(name) {
  const form = document.createElement("form");
  const div = document.createElement("div");
  const input = document.createElement("input");
  const ul = document.createElement("ul");
  const delBtn = document.createElement("button");
  const settingBtn = document.createElement("button");

  if (classObject[name].dayOfTheWeek[new Date().getDay() - 1] === true) {
    form.classList.add("jsTodayClass"); // 수업 날짜 확인
  }

  form.classList.add("jsClassForm");
  form.id = name;
  div.classList.add("jsClassName");
  input.classList.add("jsToDoInput");
  ul.classList.add("jsToDoList");

  delBtn.classList.add("delBtn");
  delBtn.classList.add("classBtn");
  delBtn.type = "button";
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", handleDeleteClass);

  settingBtn.classList.add("settingBtn");
  settingBtn.classList.add("classBtn");
  settingBtn.type = "button";
  settingBtn.innerText = "⚙️";
  settingBtn.addEventListener("click", handleClassSetting);

  div.innerText = name;
  form.addEventListener("submit", handleSubmit);

  input.placeholder = "Please Input";

  form.appendChild(div);
  form.appendChild(input);
  form.appendChild(ul);
  form.appendChild(delBtn);
  form.appendChild(settingBtn);
  classDiv.appendChild(form);
  saveToDos();
}

function handleClassSetting() {
  window.open("setting.html", event.path[1].id, "width=320, height=320");
  window.onmessage = function (info) {};
}

function addClass() {
  window.open("add.html", "_blank", "width=320, height=320");
  window.onmessage = function (info) {
    const name = info.data.name;
    const dayOfTheWeek = info.data.dayOfTheWeek;

    for (className in classObject) {
      if (className == name) {
        alert("이미 존재하는 수업입니다");
        return;
      }
    }

    const newClassObject = {
      [info.data.name]: {
        name: info.data.name,
        dayOfTheWeek: info.data.dayOfTheWeek,
        toDos: [],
      },
    };
    classObject = {
      ...classObject,
      ...newClassObject,
    };

    paintClass(name, dayOfTheWeek);
  };
}

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const ul = li.parentNode;
  const name = ul.parentNode.id;
  const toDo = li.childNodes[1].innerText;

  ul.removeChild(li);

  //해당하는 toDo 삭제
  classObject[name]["toDos"].splice(
    classObject[name]["toDos"].indexOf(toDo),
    1
  );

  saveToDos();
}

function askForDel(btn) {
  const result = confirm("삭제하시겠습니까 ?");

  if (result) {
    deleteToDo(btn);
  }
}

function checkListOverlap(id, list) {
  if (classObject[id]["toDos"].indexOf(list) === -1) {
    return false;
  } else {
    return true;
  }
}

function changeList(id, beforeContent, afterContent) {
  event.target.innerHTML = afterContent;
  classObject[id]["toDos"].splice(
    classObject[id]["toDos"].indexOf(beforeContent),
    1,
    afterContent
  );

  saveToDos();
}

function handleChangeList() {
  const id = event.target.parentNode.parentNode.parentNode.id;
  const beforeContent = event.target.innerHTML;
  const afterContent = prompt("바꿀 내용을 입력하세요", event.target.innerHTML);

  if (afterContent === null) {
  } else if (!checkListOverlap(id, afterContent)) {
    changeList(id, beforeContent, afterContent);
  } else {
    alert("이미 존재하는 리스트입니다.");
  }
}

function paintToDo(path, text) {
  const liPath = path.querySelector("ul");
  const li = document.createElement("li");
  const span = document.createElement("span");
  const checkBtn = document.createElement("button");

  checkBtn.classList.add("checkBtn");
  checkBtn.innerText = "✔️";
  checkBtn.type = "button"; // default가 submit이기 때문에 엔터에 반응하므로 button으로 명시
  checkBtn.addEventListener("click", askForDel);

  span.innerText = text;
  span.addEventListener("dblclick", handleChangeList);

  li.appendChild(checkBtn);
  li.appendChild(span);

  liPath.appendChild(li);

  saveToDos();
}

function handleSubmit() {
  event.preventDefault();
  const formPath = event.path[0];
  const liPath = event.path[0][0];
  const name = formPath.querySelector("div").innerText;
  const currentValue = liPath.value;

  liPath.value = "";

  if (checkListOverlap(name, currentValue) == true) {
    alert("이미 존재하는 리스트입니다.");
    return;
  }

  classObject[name]["toDos"].push(currentValue);

  classObject[name] = {
    ...classObject[name],
    path: formPath,
  };

  paintToDo(formPath, currentValue);

  liPath.value = "";
}

function saveToDos() {
  localStorage.setItem("classToDos", JSON.stringify(classObject));
}

function loadData() {
  const loadedData = localStorage.getItem("classToDos");
  if (loadedData !== null) {
    const parsedData = JSON.parse(loadedData);
    classObject = parsedData;
    for (className in parsedData) {
      if (className != "ToDoList") {
        paintClass(className);
      }
      parsedData[className]["toDos"].forEach((toDo) => {
        const formPath = document.getElementById(`${className}`);
        paintToDo(formPath, toDo);
      });
    }
  }
}

function addLecture() {
  for (var className in classObject) {
    console.log(classObject[className]);
    //console.log(classObject[className].dayOfTheWeek[new Date().getDay() - 1]);
    console.log(new Date().getDay() - 1);
  }

  if (classObject[name].dayOfTheWeek[new Date().getDay() - 1] === true) {
    console.log();
  }
}

function autoAddLecture() {
  const today = new Date().getDate();

  console.log(day);
  if (timeCheck == null) {
    timeCheck = today;
  } else if (timeCheck !== today) {
    addLecture();
  }
  /*
  수업자동추가 일을 저장하는 변수 선언
  만약 일이 달라질 시 추가.
  */
}

function init() {
  loadData();
  addBtn.addEventListener("click", addClass);
  classForm.addEventListener("submit", handleSubmit);
}

init();
