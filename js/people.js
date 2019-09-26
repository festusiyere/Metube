document.addEventListener("DOMContentLoaded", (e) => {
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

  var otherbutton = document.querySelector(".showmore");

  otherbutton.style.display = "none";

  let form = document.querySelector("#filter1");
  let form2 = document.querySelector("#filter2");
  var pages = 1;
  var link;
  document.querySelector("#showMore").addEventListener("click", () => {
    pages++;
    getPopularMoviepages(pages);
  });

  getPopularMovie();

  function getPopularMovie() {
    link = 'https://api.themoviedb.org/3/person/popular?api_key=34ecbb288e9e94b508722abfc2597766';
    axios.get('https://api.themoviedb.org/3/person/popular?api_key=34ecbb288e9e94b508722abfc2597766')
   .then((response) => {
     let movies = response.data.results;
     let html = movies.map(film => {
       let link = "https://image.tmdb.org/t/p/original";
       let page = "people-self.html";
     return `
         <div class="movie-card">
          <a href="${page}" onclick="people('${film.id}','${page}')">
            <div class="movie-poster">
              <img src="${link + film.profile_path}" class="" alt="">
            </div>
            <div class="this-title">
              ${film.name || film.title}
            </div>
          </a>
        </div>
       `;
   }).join(" ");
   console.log(html);
   let me = document.querySelector('.movie-cards');
   otherbutton.style.display = "flex";
   me.innerHTML = html;
   })
   .catch((err) => {
     let me = document.querySelector('.movie-cards');
     let customError = `
         <div class="">
           <div class="error">
             <img src="img/error.png" class="" alt="">
           </div>
         </div>
     `;
    me.innerHTML = customError;
   });
  }

  function getPopularMoviepages(page) {
    axios.get(link+'&page='+page)
   .then((response) => {
     let movies = response.data.results;
     let html = movies.map(film => {
       let link = "https://image.tmdb.org/t/p/original";
       let page = "people-self.html";
     return `
         <div class="movie-card">
          <a href="${page}" onclick="people('${film.id}','${page}')">
            <div class="movie-poster">
              <img src="${link + film.profile_path}" class="" alt="">
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
         <div class="">
           <div class="error">
             <img src="img/error.png" class="" alt="">
           </div>
         </div>
     `;
     me.innerHTML = customError;
   });
  }

topsearch.addEventListener("keypress", search);
topform.addEventListener("submit", search);

function search (pages) {
  if (this.value === "") {
    return;
  }
let xhr = new XMLHttpRequest();
pages = 1;
xhr.open("GET", "https://api.themoviedb.org/3/search/person?api_key=34ecbb288e9e94b508722abfc2597766&query="+this.value+"&page=1&include_adult=false");
xhr.onprogress = function(e) {
  otherbutton.style.display = "none";
  otherbutton1.style.display = "none";
  let me = document.querySelector('.movie-cards');
  let loader = `
    <div class="showmore" id="load">
      <img src="img/loader3.gif" class="" alt="">
    </div>
  `;
  me.innerHTML = loader;
  };
  xhr.onloadstart = function(e) {
    otherbutton.style.display = "flex";
    console.log(e);
    document.querySelector('.trending').style.display = "none";
    let me = document.querySelector('.movie-cards');
    let loader = `
      <div class="showmore" id="load">
        <img src="img/loader3.gif" class="" alt="">
      </div>
    `;
    me.innerHTML = loader;
  };
  xhr.onerror  = function(e) {
    let me = document.querySelector('.movie-cards');
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
  if (myData.total_results === 0) {
    document.querySelector('.movie-cards').innerHTML =
    `
      <div class="result">
        0 Result found
      </div>
    `;
  }
  myData = myData.results;
  let html = myData.map(film => {
  let link = "https://image.tmdb.org/t/p/original";
  let page = "people-self.html";
  return `
      <div class="movie-card">
       <a href="${page}" onclick="people('${film.id}','${page}')">
         <div class="movie-poster">
           <img src="${link + film.profile_path}" class="" alt="">
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
    let me = document.querySelector('.movie-cards');
    let load = document.querySelector('#load');
    me.innerHTML = result + html;
    if (load) {
      load.parentNode.removeChild(load);
    }
  }
xhr.send();
}

});
