const dateContainer = document.querySelector(".jsDate")

function getDate() {
    const week = {
        0:"일요일",
        1:"월요일",
        2:"화요일",
        3:"수요일",
        4:"목요일",
        5:"금요일",
        6:"토요일"
    }

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth()+1;
    const date = today.getDate();
    const day = week[today.getDay()];
    

    const now = document.createElement("h1");
    now.innerText = `${year}년 ${month}월 ${date}일 ${day}`;
    dateContainer.appendChild(now);
    
}


function init() {
    getDate();
}

init();