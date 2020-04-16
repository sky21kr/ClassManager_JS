const className = document.querySelector(".jsClassName"),
    classDay = document.getElementsByName("dayOfTheWeek"),
    submit = document.querySelector(".jsSubmit")

function defaultSetting() {
    className.value = window.name
    console.log(window.name)
    for( var i = 0 ; i < 5; i++ ){
        classDay[i].checked = opener.classObject[window.name]["dayOfTheWeek"][i]
    }
}

function updateInfo() {
    const toDos = opener.classObject[window.name]["toDos"]
    const dayOfTheWeek = []
    classDay.forEach(element => {
        dayOfTheWeek.push(element.checked)
    });

    delete opener.classObject[window.name]

    opener.classObject = {
        ...opener.classObject,
        [className.value]: {
            name: className.value,
            toDos: toDos,
            dayOfTheWeek: dayOfTheWeek
        }
    }
    opener.saveToDos()
    opener.location.reload()
    window.close()
}

function handleSubmit(){
    updateInfo()
}

function init() {
    defaultSetting()
    submit.addEventListener("click", handleSubmit)
}

init()