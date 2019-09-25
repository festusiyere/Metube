const sideLinks = document.querySelectorAll('nav div ul a');
sideLinks.forEach(side => side.addEventListener("mouseover", hover));
sideLinks.forEach(side => side.addEventListener("mouseout", out));

function hover(e) {
  this.querySelector('svg').style.color = "#4C56BA";
  this.style.color = "#000";
  this.style.borderRight = "2px solid #4C56BA";
  this.style.borderRadius = "2px";
}

function out(e) {
  if (this.classList.contains("active")) {
    return ;
  }
  this.querySelector('svg').style.color = "#A9B2C8";
  this.style.color = "";
  this.style.borderRight = "";
  this.style.borderRadius = "";
}

var dt = new Date();
var options = { timeZone: "America/New_York",
        hour12: true,
				weekday: 'short',
				year: 'numeric',
				month: 'short',
				day: 'numeric',
				hour: 'numeric',
				minute: 'numeric'
      };

const time = dt.toLocaleString('en-US', options);
document.querySelector("#time").innerHTML = time;

(function() {
  'use strict';
  var battery;
  function toTime(sec) {
    sec = parseInt(sec, 10);
    var hours = Math.floor(sec / 3600),
        minutes = Math.floor((sec - (hours * 3600)) / 60),
        seconds = sec - (hours * 3600) - (minutes * 60);
    if (hours < 10) { hours   = '0' + hours; }
    if (minutes < 10) { minutes = '0' + minutes; }
    if (seconds < 10) { seconds = '0' + seconds; }
    return hours + ':' + minutes;
  }

  function readBattery(b) {
    battery = b || battery;
    var percentage = parseFloat((battery.level * 100).toFixed(2)) + '%',
        fully,
        remaining;
    if (battery.charging && battery.chargingTime === Infinity) {
      fully = 'Calculating...';
    } else if (battery.chargingTime !== Infinity) {
      fully = toTime(battery.chargingTime);
    } else {
      fully = '---';
    }
    if (!battery.charging && battery.dischargingTime === Infinity) {
      remaining = 'Calculating...';
    } else if (battery.dischargingTime !== Infinity) {
      remaining = toTime(battery.dischargingTime);
    } else {
      remaining = '---';
    }

    document.styleSheets[0].insertRule('.battery:before{width:' + percentage + '}', 0);
    document.querySelector('.battery-percentage').innerHTML = percentage;
  }

  if (navigator.battery) {
    readBattery(navigator.battery);

  } else if (navigator.getBattery) {
    navigator.getBattery().then(readBattery);

  } else {
    document.querySelector('.not-support').removeAttribute('hidden');
  }

  window.onload = function () {
    battery.addEventListener('chargingchange', function() {
      readBattery();
    });

    battery.addEventListener("levelchange", function() {
      readBattery();
    });
  };
}());

let toggle = document.querySelector(".toggler");

toggle.addEventListener("click", (e) => {
  e.preventDefault();
  let nav = document.querySelector("nav");
  let body = document.querySelector("body");
  let   a = toggle.querySelector("a");
  nav.classList.toggle("open-nav");


  if(body.style.overflow == "hidden"){
    body.style.overflow = "scroll";
  } else {
    body.style.overflow = "hidden";
  }


  if (toggle.innerText == "Menu") {
    toggle.classList.toggle("toggler-right");
    a.innerHTML = "Close"
  } else {
    a.innerHTML = "Menu"
    toggle.classList.toggle("toggler-right");
  }
});

function movie(id, page) {
    sessionStorage.setItem('movieId', id);
    window.location = page;
    return false;
}
function tv(id, page) {
    sessionStorage.setItem('tvId', id);
    window.location = page;
    return false;
}
function people(id, page) {
    sessionStorage.setItem('personId', id);
    window.location = page;
    return false;
}
