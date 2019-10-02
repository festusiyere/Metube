
document.addEventListener("DOMContentLoaded", (e) => {
  getMovies();
  getTvShow();
  getPeople();

let topbar = document.querySelector(".top-bar");
let topform = document.querySelector(".header-form");
var topsearch = document.getElementById("search-input");
let openform = document.querySelector("#openform");

openform.addEventListener("click", (e) => {
  e.preventDefault();
  topbar.style.transform = "translateY(-150%)";
  topbar.style.transition = "All 1.2s";
  topform.style.transform = "translateY(-40px)";
  topform.style.transition = "All 1.2s";
  setTimeout(focus, 1300);
});
function focus(e) {
  topsearch.focus();
}
topsearch.addEventListener("blur", (e) => {
  e.preventDefault();
  topsearch.value = "";
  topbar.style.transform = "translateY(0)";
  topbar.style.transition = "All 1.2s";
  topform.style.transform = "translateY(-150px)";
  topform.style.transition = "All 1.2s";
});

function getMovies() {
  axios.get('https://api.themoviedb.org/3/trending/movie/week?api_key=34ecbb288e9e94b508722abfc2597766')
    .then((response) => {
      let movies = response.data.results;
      let html = movies.map(film => {
        let link = "https://image.tmdb.org/t/p/original";
        let page = "movie-self.html";
        return `
        <div class="movie-wrap">
          <a href="${page}" onclick="movie('${film.id}','${page}')">
            <img class="image-fill"  src="${link + film.backdrop_path}" alt="">
          </a>
          <div class="movie-title" align=center>
            <div>
              ${film.original_title}
            </div>
            <div class="" align=center>
              ${film.overview}
            </div>
          </div>
        </div>
        `;
      }).join(" ");
      let thisDiv = document.querySelector("#movie-pix");
      let thatDiv = document.querySelectorAll("#loaderq");
      thatDiv[0].insertAdjacentHTML("afterend", html);
      setTimeout(function () {
        thatDiv[0].remove();
      }, 1300);
      $(".movie-pic").slick({
        autoplay: true,
        infinite: true,
        accessibility: false,
        arrows: true,
        cssEase: 'linear',
        easing: 'linear',
        autoplaySpeed: 3000,
        speed: 2000,
        swipeToSlide: true,
        fade: true,
        prevArrow: `<a href="#" class="navigators nav-left">
          <i class="fas fa-long-arrow-alt-left" class=""></i>
        </a>`,
        nextArrow: `<a href="#" class="navigators nav-right">
          <i class="fas fa-long-arrow-alt-right" class=""></i>
        </a>`
          });
      $(".people1").slick({
        autoplay: true,
        infinite: true,
        accessibility: true,
        arrows: true,
        cssEase: 'linear',
        easing: 'linear',
        autoplaySpeed: 3000,
        speed: 2000,
        swipeToSlide: true,
        fade: true,
        lazyLoad: 'ondemand'
          });
      document.querySelectorAll(".movie-wrap").forEach(mov => mov.addEventListener("mouseenter", opacity));
      document.querySelectorAll(".movie-wrap").forEach(mov => mov.addEventListener("mouseleave", opacity));
      function opacity(e) {
        this.querySelector("div.movie-title div:nth-child(1)").classList.toggle("details");
        this.querySelector("div.movie-title div:nth-child(2)").classList.toggle("details");
      }
    })
    .catch((err) => {
      let thisDiv = document.querySelector("#movie-pix");
      let customError = `
          <div class="movie-wrap">
            <div class="error">
              <img src="img/error.png" class="" alt="">
            </div>
          </div>
      `;
      thisDiv.innerHTML = customError;
    });
}

/* TRENDING TV API CALL  */

function getTvShow() {
  axios.get('https://api.themoviedb.org/3/trending/tv/week?api_key=34ecbb288e9e94b508722abfc2597766')
    .then((response) => {
      let movies = response.data.results;
      let html = movies.map(film => {
        let link = "https://image.tmdb.org/t/p/original";
        let page = "tv-self.html"
        return `
        <div class="movie-list-items">
          <div class="movie-display-text" align='center'>
            ${film.name}
          </div>
          <a href="${page}" onclick="tv('${film.id}','${page}')">
            <img src="${link + film.backdrop_path}" class="image-fill" alt="">
          </a>
        </div>
        `;
      }).join(" ");
      let thisDiv = document.querySelector("#movie-list");
      let thatDiv = document.querySelectorAll("#loaderq");
      thatDiv[1].insertAdjacentHTML("afterend", html);
      thatDiv[1].remove();

      $(".movie-list").slick({
        dots: false,
        infinite: true,
        speed: 1800,
        autoplay: true,
        autoplaySpeed: 3000,
        vertical: true,
        swipeToSlide: true,
        slidesToShow: 3,
        slidesToScroll: 1
      });
      document.querySelectorAll(".movie-list-items").forEach(mov1 => mov1.addEventListener("mouseenter", opacity1));
      document.querySelectorAll(".movie-list-items").forEach(mov1 => mov1.addEventListener("mouseleave", opacity1));
      function opacity1(e) {
        this.querySelector(".movie-display-text").classList.toggle("details");
      }
    })
    .catch((err) => {
      let thisDiv = document.querySelector("#movie-list");
      let customError = `
          <div class="movie-wrap">
            <div class="error">
              <img src="img/error.png" class="" alt="">
            </div>
          </div>
      `;
      thisDiv.innerHTML = customError;
    });
}


/* TRENDING PEOPLE API CALL  */

function getPeople() {
  axios.get('https://api.themoviedb.org/3/trending/person/week?api_key=34ecbb288e9e94b508722abfc2597766')
    .then((response) => {
      let movies = response.data.results;
      let html = movies.map(film => {
        let link = "https://image.tmdb.org/t/p/original";
        let page = "people-self.html"
        return `
        <div class="people1">
          <a href="${page}" onclick="people('${film.id}','${page}')">
            <img src="${link + film.profile_path}" alt="${film.name}">
          </a>
        </div>
        `;
      }).join(" ");
      let thisDiv = document.querySelector("#movie-list");
      let thatDiv = document.querySelector("#loader3");
      thatDiv.insertAdjacentHTML("afterend", html);
      thatDiv.remove();

      $(".people").slick({
        autoplay: true,
        infinite: true,
        accessibility: true,
        arrows: true,
        cssEase: 'linear',
        easing: 'linear',
        autoplaySpeed: 3000,
        speed: 2000,
        swipeToSlide: true,
        fade: true,
        lazyLoad: 'ondemand'
          });
    })
    .catch((err) => {
      let thisDiv = document.querySelector(".people");
      let customError = `
          <div class="movie-wrap">
            <div class="error">
              <img src="img/error.png" class="" alt="">
            </div>
          </div>
      `;
      thisDiv.innerHTML = customError;
    });
}

  topform.addEventListener("submit", (e)=> {
    let searchText = topsearch.value;
    e.preventDefault();
    // console.log(searchText);
    if (!searchText){
      topsearch.style.border = "1px solid red";
      var node = document.createElement("div");
      var textnode = document.createTextNode("Input Cannot be left Empty");
      node.appendChild(textnode);
      topform.appendChild(node);
      return;
    }
    getMovies(searchText);
  });

  topsearch.addEventListener("keypress", () => {
    document.querySelector(".ppp").innerHTML = `
    <div class="movie-result">
      <div class="result-header">
        MOVIE RESULTS
      </div>

      <div class="search-cards">

      </div>
    </div>
    <div class="tv-result">
      <div class="result-header">
        TV RESULTS
      </div>
      <div class="search-cards">

      </div>
    </div>
    <div class="people-result">
      <div class="result-header">
        PEOPLE RESULTS
      </div>
      <div class="search-cards">

      </div>
    </div>
    `;
    searchTv();
    searchMovies();
    searchPeople();
  });

  topsearch.addEventListener("submit", () => {
    document.querySelector(".ppp").innerHTML = `
    <div class="movie-result">
      <div class="result-header">
        MOVIE RESULTS
      </div>

      <div class="search-cards">

      </div>
    </div>
    <div class="tv-result">
      <div class="result-header">
        TV RESULTS
      </div>
      <div class="search-cards">

      </div>
    </div>
    <div class="people-result">
      <div class="result-header">
        PEOPLE RESULTS
      </div>
      <div class="search-cards">

      </div>
    </div>
    `;
    searchTv();
    searchMovies();
    searchPeople();
  });

  function searchMovies () {
    if (this.value === "") {
      return;
    }
    console.log(this);
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api.themoviedb.org/3/search/movie?api_key=34ecbb288e9e94b508722abfc2597766&language=en-US&query="+topsearch.value+"&page=1&include_adult=false");
  xhr.onprogress = function(e) {
    let me = document.querySelector('.movie-result div.search-cards');
    let loader = `
      <div class="showmore" id="load">
        <img src="img/loader3.gif" class="" alt="">
      </div>
    `;
    me.innerHTML = loader;
    };
    xhr.onloadstart = function(e) {
      let me = document.querySelector('.movie-result div.search-cards');
      let loader = `
        <div class="showmore" id="load">
          <img src="img/loader3.gif" class="" alt="">
        </div>
      `;
      me.innerHTML = loader;
    };
    xhr.onerror  = function(e) {
      let me = document.querySelector('.movie-result div.search-cards');
      let customError = `
          <div class="">
            <div class="error">
              <img src="img/error.png" class="" alt="">
            </div>
          </div>
      `;
     me.innerHTML = customError;
    };
    xhr.onload = function(e){
    myData = JSON.parse(xhr.responseText);
    myData = myData.results;
    let html = myData.map(film => {
      let link = "https://image.tmdb.org/t/p/original";
      let page = "movie-self.html";
    return `
          <div class="search-card">
           <a href="${page}" onclick="tv('${film.id}','${page}')">
             <div class="search-poster">
               <img src="${link + film.poster_path}" class="" alt="">
             </div>
             <div class="this-title">
               ${film.name || film.title}
             </div>
           </a>
         </div>
      `;
  }).join(" ");
      let result = `
        <div class="result">
          Search Result for <span>${topsearch.value}</span>
        </div>

      `;
      let me = document.querySelector('.movie-result div.search-cards');
      let load = me.querySelector('#load');
      me.innerHTML = result + html;
      if (JSON.parse(xhr.responseText).total_results === 0) {
        me.innerHTML = `
        <div class="result">
          No Results found!
        </div>
        `;
      }
      if (load) {
        load.parentNode.removeChild(load);
      }
    }
  xhr.send();
  }


  function searchTv () {
    if (this.value === "") {
      return;
    }
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api.themoviedb.org/3/search/tv?api_key=34ecbb288e9e94b508722abfc2597766&language=en-US&query="+topsearch.value+"&page=1&include_adult=false");
  xhr.onprogress = function(e) {
    let me = document.querySelector('.tv-result div.search-cards');
    let loader = `
      <div class="showmore" id="load">
        <img src="img/loader3.gif" class="" alt="">
      </div>
    `;
    me.innerHTML = loader;
    };
    xhr.onloadstart = function(e) {
      let me = document.querySelector('.tv-result div.search-cards');
      let loader = `
        <div class="showmore" id="load">
          <img src="img/loader3.gif" class="" alt="">
        </div>
      `;
      me.innerHTML = loader;
    };
    xhr.onerror  = function(e) {
      let me = document.querySelector('.tv-result div.search-cards');
      let customError = `
          <div class="">
            <div class="error">
              <img src="img/error.png" class="" alt="">
            </div>
          </div>
      `;
     me.innerHTML = customError;
    };
    xhr.onload = function(e){
    myData = JSON.parse(xhr.responseText);
    myData = myData.results;
    console.log(myData);
    if (myData.results === " ") {
      return;
    }
    let html = myData.map(film => {
      let link = "https://image.tmdb.org/t/p/original";
      let page = "tv-self.html";
    return `
          <div class="search-card">
           <a href="${page}" onclick="tv('${film.id}','${page}')">
             <div class="search-poster">
               <img src="${link + film.poster_path}" class="" alt="">
             </div>
             <div class="this-title">
               ${film.name || film.title}
             </div>
           </a>
         </div>
      `;
  }).join(" ");
      let result = `
        <div class="result">
          Search Result for <span>${topsearch.value}</span>
        </div>

      `;
      let me = document.querySelector('.tv-result div.search-cards');
      let load = me.querySelector('#load');
      me.innerHTML = result + html;
      if (JSON.parse(xhr.responseText).total_results === 0) {
        me.innerHTML = `
        <div class="result">
          No Results found!
        </div>
        `;
      }
      if (load) {
        load.parentNode.removeChild(load);
      }
    }
  xhr.send();
  }


  function searchPeople () {
    if (this.value === "") {
      return;
    }
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api.themoviedb.org/3/search/person?api_key=34ecbb288e9e94b508722abfc2597766&query="+topsearch.value+"&page=1&include_adult=false");
  xhr.onprogress = function(e) {
    let me = document.querySelector('.people-result div.search-cards');
    let loader = `
      <div class="showmore" id="load">
        <img src="img/loader3.gif" class="" alt="">
      </div>
    `;
    me.innerHTML = loader;
    };
    xhr.onloadstart = function(e) {
      let me = document.querySelector('.people-result div.search-cards');
      let loader = `
        <div class="showmore" id="load">
          <img src="img/loader3.gif" class="" alt="">
        </div>
      `;
      me.innerHTML = loader;
    };
    xhr.onerror  = function(e) {
      let me = document.querySelector('.people-result div.search-cards');
      let customError = `
          <div class="">
            <div class="error">
              <img src="img/error.png" class="" alt="">
            </div>
          </div>
      `;
     me.innerHTML = customError;
    };
    xhr.onload = function(e){
    myData = JSON.parse(xhr.responseText);
    myData = myData.results;
    if (myData.results === " ") {
      return;
    }
    let html = myData.map(film => {
      let link = "https://image.tmdb.org/t/p/original";
      let page = "people-self.html";
    return `
        <div class="search-cards">
          <div class="search-card">
           <a href="${page}" onclick="people('${film.id}','${page}')">
             <div class="search-poster">
               <img src="${link + film.poster_path}" class="" alt="">
             </div>
             <div class="this-title">
               ${film.name || film.title}
             </div>
           </a>
         </div>
        </div>
      `;
  }).join(" ");
      let result = `
        <div class="result">
          Search Result for <span>${topsearch.value}</span>
        </div>

      `;
      let me = document.querySelector('.people-result div.search-cards');
      let load = me.querySelector('#load');
      me.innerHTML = result + html;
      if (JSON.parse(xhr.responseText).total_results === 0) {
        me.innerHTML = `
        <div class="result">
          No Results found!
        </div>
        `;
      }
      if (load) {
        load.parentNode.removeChild(load);
      }
    }
  xhr.send();
  }

});
