
document.addEventListener("DOMContentLoaded", (e) => {
  getMovies();
  getTvShow();
  getPeople();

let topbar = document.querySelector(".top-bar");
let topform = document.querySelector(".header-form");
let topsearch = document.querySelector("#search-input");
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



});

function getMovies(searchText) {
  axios.get('https://api.themoviedb.org/3/search/movie?api_key=34ecbb288e9e94b508722abfc2597766&language=en-US&query='+searchText+'&include_adult=false')
    .then((response) => {
      // console.log('https://api.themoviedb.org/3/search/movie?api_key=34ecbb288e9e94b508722abfc2597766&language=en-US&query'+searchText+'&page=1&include_adult=false');
      // console.log(response);
      // let movies = response.data.Search;
      // console.log(movies);
      // let output = '';
    //   $.each(movies, (index, movie) => {
    //     output += `
    //       <div class="col-md-3 mb-md-3">
    //         <div class="rounded text-center">
    //           <img src="${movie.Poster}">
    //           <h5>${movie.Title}</h5>
    //           <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary mb-md-3 mb-sm-3" href="#">Movie Details</a>
    //         </div>
    //       </div>
    //     `;
    //   });
    //
    //   $('#movies').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}
