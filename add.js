const inp = document.getElementsByName("dayOfTheWeek"),
  className = document.querySelector(".jsClassName"),
  btn = document.querySelector(".jsSubmit"),
  cancelBtn = document.querySelector(".jsCancel");

const classInfo = {
  name: "",
  dayOfTheWeek: [],
};

function setInfo() {
  classInfo.name = className.value;
  inp.forEach((element) => {
    classInfo.dayOfTheWeek.push(element.checked);
  });
}

function handleSubmit() {
  setInfo();
  opener.postMessage(classInfo, "*");
  window.close();
}

function handleCancel() {
  window.close();
}

function init() {
  btn.addEventListener("click", handleSubmit);
  cancelBtn.addEventListener("click", handleCancel);
}

init();
