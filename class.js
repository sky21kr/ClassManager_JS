const managementClass = document.querySelector(".jsManagementClass"),
    classDiv = document.querySelector(".jsClassDiv"),
    classForm = document.querySelector(".jsClassForm"),
    toDoInput = document.querySelector(".jsToDoInput")

const classObject = {
    name: "",
    dayOfTheWeek: [],
    toDos: []
}

function paintClass() {
    const form = document.createElement("form")
    const div = document.createElement("div")
    const input = document.createElement("input")

    form.classList.add("jsClassForm")
    div.classList.add("jsClassName")
    input.classList.add("jsToDoInput")

    div.innerText = classObject.name
    form.addEventListener("submit", handleSubmit)

    form.appendChild(div)
    form.appendChild(input)

    classDiv.appendChild(form)
}

function addClass() {
    window.open("add.html","_blank","width=500, height=500")
    window.onmessage = function(info) {
        classObject.name = info.data.name
        classObject.dayOfTheWeek = info.data.dayOfTheWeek
        paintClass()
    }
}

function paintToDo() {
    //ToDo 그리기 하기
}

function handleSubmit() {
    event.preventDefault();
    const currentValue = event.path[0][0].value;
    paintToDo(currentValue)
    currentValue.value ="";
}

function init() {
    managementClass.addEventListener("click", addClass)
    classForm.addEventListener("submit",handleSubmit)
}

init();