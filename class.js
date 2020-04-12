const managementClass = document.querySelector(".jsManagementClass"),
    classDiv = document.querySelector(".jsClassDiv"),
    classForm = document.querySelector(".jsClassForm"),
    toDoInput = document.querySelector(".jsToDoInput")

var classObject = {
    ToDoList: {
        name: "toDoList",
        toDos: []
    }
}

function paintClass(name) {
    const form = document.createElement("form")
    const div = document.createElement("div")
    const input = document.createElement("input")
    const ul = document.createElement("ul")

    form.classList.add("jsClassForm")
    div.classList.add("jsClassName")
    input.classList.add("jsToDoInput")
    ul.classList.add("jsToDoList")

    div.innerText = name
    form.addEventListener("submit", handleSubmit)

    form.appendChild(div)
    form.appendChild(input)
    form.appendChild(ul)

    classDiv.appendChild(form)
    saveToDos()
}

function addClass() {
    window.open("add.html","_blank","width=500, height=500")
    window.onmessage = function(info) {
        const name = info.data.name
        const dayOfTheWeek = info.data.dayOfTheWeek
        const newClassObject = {
            [info.data.name]: {
                name: info.data.name,
                dayOfTheWeek: info.data.dayOfTheWeek,
                toDos: []
            }
        }
        classObject = {
            ...classObject,
            ...newClassObject
        }

        console.log(classObject)
        paintClass(name,dayOfTheWeek)

    }
    
}

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    const ul = li.parentNode
    ul.removeChild(li);
}

function askForDel(btn) {
    const result = confirm("삭제하시겠습니까 ?")

    if(result) {
        deleteToDo(btn);
    }
}

function paintToDo(path, text) {

    const liPath = path.querySelector("ul")
    const li = document.createElement("li")
    const span = document.createElement("span")
    const delBtn = document.createElement("button")

    delBtn.classList.add('btn');
    delBtn.type="button" // default가 submit이기 때문에 엔터에 반응하므로 button으로 명시
    delBtn.addEventListener("click", askForDel);

    span.innerText = text;
    
    li.appendChild(delBtn)
    li.appendChild(span)
    
    liPath.appendChild(li);

    saveToDos()

}

function handleSubmit() {
    event.preventDefault();
    const formPath = event.path[0]
    const liPath = event.path[0][0]
    const name = formPath.querySelector("div").innerText
    const currentValue = liPath.value

    classObject[name]["toDos"].push(currentValue)
    
    classObject[name] = {
        ...classObject[name],
        path: formPath
    }
    console.log(classObject[name]["path"])

    paintToDo(formPath, currentValue)

    liPath.value = "";
}

function saveToDos() {
    localStorage.setItem("classToDos", JSON.stringify(classObject));
}

function loadData() {
    const loadedData = localStorage.getItem("classToDos");
    if (loadedData !== null) {
        const parsedData = JSON.parse(loadedData);
        classObject = parsedData
        for(cls in parsedData) {
            if(cls != "ToDoList"){
                paintClass(cls)
            }
            parsedData[cls]["toDos"].forEach( toDo => {
                console.log(parsedData[cls]["path"])
                paintToDo(parsedData[cls]["path"], toDo)
            })
            //paintToDo(cls["path"])
        }
    }
}

function init() {
    loadData()
    managementClass.addEventListener("click", addClass)
    classForm.addEventListener("submit",handleSubmit)
}

init();