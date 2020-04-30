const date = document.querySelector(".jsDate"),
  clock = document.querySelector(".jsClock");

function getDate() {
  const week = {
    0: "일요일",
    1: "월요일",
    2: "화요일",
    3: "수요일",
    4: "목요일",
    5: "금요일",
    6: "토요일",
  };

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const dayOfTheWeek = week[today.getDay()];
  const hour = today.getHours();
  const minute = today.getMinutes();
  const seconds = today.getSeconds();

  date.innerText = `${year}년 ${month}월 ${day}일 ${dayOfTheWeek}`;

  clock.innerText = `${hour < 10 ? `0${hour}` : hour}:${
    minute < 10 ? `0${minute}` : minute
  }:${seconds < 10 ? `0${seconds}` : seconds}`;
}

function init() {
  setInterval(getDate, 1000);
}

init();
