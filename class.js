const managementClass = document.querySelector(".jsManagementClass"),
    classDiv = document.querySelector(".jsClassDiv"),
    classForm = document.querySelector(".jsClassForm"),
    toDoInput = document.querySelector(".jsToDoInput"),
    setting = document.querySelector(".jsSetting")

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
    form.id = name
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

        for(className in classObject) {
            if( className == name ){
                alert("이미 존재하는 수업입니다")
                return;
            }
        }

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
    const btn = event.target
    const li = btn.parentNode
    const ul = li.parentNode
    const name = ul.parentNode.id
    const toDo = li.childNodes[1].innerText

    ul.removeChild(li);

    //해당하는 toDo 삭제
    classObject[name]["toDos"].splice(classObject[name]["toDos"].indexOf(toDo),1)

    saveToDos()
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
    delBtn.innerText = "✔️"
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
        for(className in parsedData) {
            if(className != "ToDoList"){
                paintClass(className)
            }
            parsedData[className]["toDos"].forEach( toDo => {
                const formPath = document.getElementById(`${className}`)
                paintToDo(formPath, toDo)
            })
        }
    }
}

function settingModify() {
    
    window.open("setting.html","_blank","width=500, height=500")
    
}

function init() {
    loadData()
    managementClass.addEventListener("click", addClass)
    classForm.addEventListener("submit",handleSubmit)
    setting.addEventListener("click", settingModify)
}

init();