const className = document.querySelector(".jsClassName"),
  classDay = document.getElementsByName("dayOfTheWeek"),
  submit = document.querySelector(".jsSubmit"),
  modal = document.querySelector(".modal"),
  modalExit = document.querySelector(".modalExit"),
  cancelBtn = document.querySelector(".jsCancel");

function defaultSetting() {
  className.value = window.name;
  for (var i = 0; i < 5; i++) {
    classDay[i].checked = opener.classObject[window.name]["dayOfTheWeek"][i];
  }
}

function updateInfo() {
  console.log(window.name);
  const toDos = opener.classObject[window.name]["toDos"];
  const dayOfTheWeek = [];
  classDay.forEach((element) => {
    dayOfTheWeek.push(element.checked);
  });

  delete opener.classObject[window.name];

  opener.classObject = {
    ...opener.classObject,
    [className.value]: {
      name: className.value,
      toDos: toDos,
      dayOfTheWeek: dayOfTheWeek,
    },
  };
  opener.saveToDos();
  opener.location.reload();
  window.close();
}

function checkOverlap() {
  for (i in opener.classObject) {
    if (i == className.value) {
      return true;
    }
  }
  return false;
}

function handleSubmit() {
  if (checkOverlap() === true) {
    modal.classList.remove("hidden");
  } else {
    updateInfo();
  }
}

function handleModalExit() {
  modal.classList.add("hidden");
}

function handleCancel() {
  window.close();
}

function init() {
  defaultSetting();
  submit.addEventListener("click", handleSubmit);
  modalExit.addEventListener("click", handleModalExit);
  cancelBtn.addEventListener("click", handleCancel);
}

init();
