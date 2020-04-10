const inp = document.getElementsByName("dayOfTheWeek"),
    className = document.querySelector(".jsClassName"),
    btn = document.querySelector(".jsSubmit");

// 값 저장하기

const classInfo = {
    name:"",
    dayOfTheWeek: []
}

function setInfo() {
    classInfo.name = className.value
    inp.forEach(element => {
        classInfo.dayOfTheWeek.push(element.checked)
    });
}

function handleSubmit() {
    setInfo()
    opener.postMessage(classInfo,"*")
    window.close();
}

function init() {
    btn.addEventListener("click",handleSubmit)
}

init()
