const managementClass = document.querySelector(".jsManagementClass"),
    classForm = document.querySelector(".jsClassForm"),
    addForm = document.querySelector

function getData() {
    console.log("1");
}

function addClass() {
    window.open("add.html","_blank","width=500, height=500")
}

function init() {
    managementClass.addEventListener("click", addClass)
}

init();