document.addEventListener("DOMContentLoaded", (e) => {
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


  let form = document.querySelector("#filter1");
  let form2 = document.querySelector("#filter2");
  var pages = 1;
  var link;
  form.addEventListener("change", call);
  form2.addEventListener("change", call1);

  document.querySelector("#showMore").addEventListener("click", () => {
    pages++;
    getPopularMoviepages(pages);
  });

  getPopularMovie();

  function getPopularMovie() {
    link = 'https://api.themoviedb.org/3/movie/popular?api_key=34ecbb288e9e94b508722abfc2597766';
    axios.get('https://api.themoviedb.org/3/movie/popular?api_key=34ecbb288e9e94b508722abfc2597766')
   .then((response) => {
     let movies = response.data.results;
     let html = movies.map(film => {
       let link = "https://image.tmdb.org/t/p/original";
       let page = "movie-self.html";
     return `
         <div class="movie-card">
          <a href="${page}" onclick="movie('${film.id}','${page}')">
            <div class="movie-poster">
              <img src="${link + film.poster_path}" class="" alt="">
            </div>
            <div class="this-title">
              ${film.name || film.title}
            </div>
          </a>
        </div>
       `;
   }).join(" ");
   let me = document.querySelector('.movie-cards');
   me.innerHTML = html;
   })
   .catch((err) => {
     let me = document.querySelector('.movie-cards');
     let customError = `
         <div class="mtt1">
           <div class="error">
             <img src="img/error.png" class="" alt="">
           </div>
         </div>
     `;
   });
  }
  function getPopularMoviepages(page) {
    axios.get(link+'&page='+page)
   .then((response) => {
     let movies = response.data.results;
     let html = movies.map(film => {
       let link = "https://image.tmdb.org/t/p/original";
       let page = "movie-self.html";
     return `
         <div class="movie-card">
          <a href="${page}" onclick="movie('${film.id}','${page}')">
            <div class="movie-poster">
              <img src="${link + film.poster_path}" class="" alt="">
            </div>
            <div class="this-title">
              ${film.name || film.title}
            </div>
          </a>
        </div>
       `;
   }).join(" ");
   let me = document.querySelectorAll('.movie-card');
   me[me.length - 1].insertAdjacentHTML("afterend", html);
   })
   .catch((err) => {
     let me = document.querySelector('.movie-cards');
     let customError = `
         <div class="mtt1">
           <div class="error">
             <img src="img/error.png" class="" alt="">
           </div>
         </div>
     `;
   });
  }
  function call () {
  pages = 0;
  let xhr = new XMLHttpRequest();
  link = "https://api.themoviedb.org/3/movie/"+this.value+"?api_key=34ecbb288e9e94b508722abfc2597766";
  // console.log(link);
  xhr.open("GET", link);
  xhr.onprogress = function(e) {
    let me = document.querySelector('.movie-cards');
    me.style.display = "none";
    let loader = `
      <div class="showmore" id="load">
        <img src="img/loader3.gif" class="" alt="">
      </div>
    `;
    me.insertAdjacentHTML("afterend", loader);
    };
    xhr.onloadstart = function(e) {
      let me = document.querySelector('.movie-cards');
      me.style.transition = "0.3s";
      me.style.opacity = "0";
    };
    xhr.onload = function(){
    myData = JSON.parse(xhr.responseText);
    myData = myData.results;
    let html = myData.map(film => {
      let link = "https://image.tmdb.org/t/p/original";
      let page = "movie-self.html";
    return `
        <div class="movie-card">
         <a href="${page}" onclick="movie('${film.id}','${page}')">
           <div class="movie-poster">
             <img src="${link + film.poster_path}" class="" alt="">
           </div>
           <div class="this-title">
             ${film.name || film.title}
           </div>
         </a>
       </div>
      `;
  }).join(" ");
      let me = document.querySelector('.movie-cards');
      let load = document.querySelector('#load');
      me.innerHTML = html;
      me.style.opacity = "1";
      me.style.display = "flex";
      load.parentNode.removeChild(load);
    }
  xhr.send();
  }

  function call1 () {
  pages = 0;
  let xhr = new XMLHttpRequest();
  link = "https://api.themoviedb.org/3/discover/movie?api_key=34ecbb288e9e94b508722abfc2597766&include_adult=false&include_video=false";
  xhr.open("GET", link);
  xhr.onprogress = function(e) {
    let me = document.querySelector('.movie-cards');
    me.style.display = "none";
    let loader = `
      <div class="showmore" id="load">
        <img src="img/loader3.gif" class="" alt="">
      </div>
    `;
    me.insertAdjacentHTML("afterend", loader);
    };
    xhr.onloadstart = function(e) {
      let me = document.querySelector('.movie-cards');
      console.log(me);
      me.style.transition = "0.3s";
      me.style.opacity = "0";
    };
    xhr.onload = function(){
    myData = JSON.parse(xhr.responseText);
    myData = myData.results;
    let html = myData.map(film => {
      let link = "https://image.tmdb.org/t/p/original";
      let page = "movie-self.html";
    return `
        <div class="movie-card">
         <a href="${page}" onclick="movie('${film.id}','${page}')">
           <div class="movie-poster">
             <img src="${link + film.poster_path}" class="" alt="">
           </div>
           <div class="this-title">
             ${film.name || film.title}
           </div>
         </a>
       </div>
      `;
  }).join(" ");
      let me = document.querySelector('.movie-cards');
      let load = document.querySelector('#load');
      me.innerHTML = html;
      me.style.opacity = "1";
      me.style.display = "flex";
      load.parentNode.removeChild(load);
    }
  xhr.send();
  }






});
