document.addEventListener("DOMContentLoaded", (e) => {
  var movieId = sessionStorage.getItem('movieId');
  getVideo();
  getMoviesById();
  getMovieDetails();
  getRecommendation();

  var videoId;
  document.querySelector("#goback").addEventListener("click", back);

  function back(e){
    e.preventDefault();

    window.history.go(-1);
  }

  function getMoviesById() {
    axios.get('https://api.themoviedb.org/3/movie/'+movieId+'?api_key=34ecbb288e9e94b508722abfc2597766&language')
      .then((response) => {
        let movies = response.data;
        let link = "https://image.tmdb.org/t/p/original";
        let genreArray = [];
        let language =[];
        function genre(arr){
          if (arr == "") {
            return;
          }
          arr.map(a => {
            genreArray.push(`<span> ${a.name}</span>`);
          });
        }

        function lang(arr){
          if (arr == "") {
            return;
          }
          arr.map(a => {
            language.push(`<span> ${a.iso_639_1}</span>`);
          });
        }
        genre(movies.genres);
        lang(movies.spoken_languages)
                let html =`
        <div class="mt">
          <div class="mt1">
            ${movies.title}
          </div>
          <div class="mt2">
            <div class="mt2a">
              Official:
              <span> <a href="${movies.homepage}" target="_blank">${movies.title}</a> </span>
            </div>
            <div class="mt2a">
              Released Date:
              <span>${movies.release_date}</span>
            </div>
            <div class="mt2a">
              Genres:`;
          html += genreArray.join(`

          `);


          html +=
              `
            </div>
            <div class="mt2a">
              Language:`;

              html += language.join(`

              `);

          html +=
              `
            </div>
          </div>
          <div class="mt3">
            <div class="mt4">
              THE CAST
            </div>
            <div class="mt5">

            </div>
          </div>
          <div class="mt6">
            <div class="mt6a">
              Synopsis
            </div>
            <div class="mt6b">
                ${movies.overview}
            </div>
          </div>
          <div class="mt7">
            <div class="mt7a">
              PICTURES
            </div>
            <div class="mt7b">

            </div>
          </div>
        </div>
          `;
          getCastImage();
          getMovieImage();
        let thisDiv = document.querySelector(".movie-det");
        let thatDiv = document.querySelectorAll("#loaderq");
        thisDiv.innerHTML = html;
      })
      .catch((err) => {
        let thisDiv = document.querySelector(".jj");
        let customError = `
            <div class="">
              <div class="error">
                <img src="img/error.png" class="" alt="">
              </div>
            </div>
        `;
        thisDiv.innerHTML = customError;
      });
  }

  function getCastImage() {
    axios.get('https://api.themoviedb.org/3/movie/'+movieId+'/credits?api_key=34ecbb288e9e94b508722abfc2597766')
      .then((response) => {
        let movies = response.data.cast;
        let html = movies.map(film => {
          let link = "https://image.tmdb.org/t/p/w154";
          let page = "people-self.html";
        return `
          <div class="mtt1">
            <a href="${page}" onclick="people('${film.id}','${page}')">
              <img src="${link + film.profile_path}" class="image-fill" alt="" style="height: unset;">
            </a>
          </div>
          `;
      }).join(" ");
      let go = document.querySelector('.mt5');
      go.innerHTML = html;
      })
      .catch((err) => {
        let thisDiv = document.querySelector('.mt5');
        let customError = `
            <div class="mtt1">
              <div class="error">
                <img src="img/loader1.gif" class="" alt="">
              </div>
            </div>
        `;
      });
     }


  function getMovieImage() {
    axios.get('https://api.themoviedb.org/3/movie/'+movieId+'/images?api_key=34ecbb288e9e94b508722abfc2597766')
   .then((response) => {
     let movies = response.data.backdrops;
     let html = movies.map(film => {
       let link = "https://image.tmdb.org/t/p/original";
     return `
       <div class="mt7ba" id="mt7ba">
         <a href="${link + film.file_path}" target="_blank">
           <img src="${link + film.file_path}" alt="">
         </a>
       </div>
       `;
   }).join(" ");
   let me = document.querySelector('.mt7b');
   me.innerHTML = html;

   $(".mt7ba").lightGallery();

   })
   .catch((err) => {
     let thisDiv = document.querySelector(".mt7b");
     let customError = `
         <div class="mtt1">
           <div class="error">
             <img src="img/error.png" class="" alt="">
           </div>
         </div>
     `;
   });
  }

  function getRecommendation() {
    axios.get('https://api.themoviedb.org/3/movie/'+movieId+'/recommendations?api_key=34ecbb288e9e94b508722abfc2597766')
   .then((response) => {
     let movies = response.data.results;
     let html = movies.map(film => {
       let link = "https://image.tmdb.org/t/p/original";
       let page = "movie-self.html";
     return `
       <div class="rc1">
         <a href="${page}" onclick="movie('${film.id}','${page}')"">
           <img src="${link + film.poster_path}" alt="">
         </a>
       </div>
       `;
   }).join(" ");
   let me = document.querySelector('.rc');
   me.innerHTML = html;
   $(".rc").slick({
     dots: false,
     infinite: true,
     speed: 1800,
     autoplay: true,
     autoplaySpeed: 3000,
     swipeToSlide: true,
     slidesToShow: 6,
     slidesToScroll: 1
   });

   let img = document.querySelectorAll('.rc1');
   img.forEach(a => a.addEventListener("mouseover", hoverIn));
   img.forEach(a => a.addEventListener("mouseout", hoverOut));

   function hoverIn(e) {
     this.style.transition = "All 0.5s";
     this.style.opacity = "0.85";
   }
   function hoverOut(e) {
     this.style.opacity = "1";
   }
   })
   .catch((err) => {
     let thisDiv = document.querySelector(".rc");
     let customError = `
         <div class="">
           <div class="error">
             <img src="img/error.png" class="" alt="">
           </div>
         </div>
     `;
   });
  }


  function getMovieDetails() {
    axios.get('https://api.themoviedb.org/3/movie/'+movieId+'?api_key=34ecbb288e9e94b508722abfc2597766&language=en-US')
      .then((response) => {
        let movies = response.data;
        let link = "https://image.tmdb.org/t/p/original";
        let youtube = "https://www.youtube.com/watch?v=";
        let html =`
        <div class="moviecov">
            <a href="${link+movies.poster_path}" target="_blank">
              <img class="image-fill" src="${link+movies.poster_path}" alt="">
            </a>
            <a href="${youtube+videoId}">
              <div class="mt-play">
                <i class="fas fa-play"></i>
              </div>
            </a>
          </div>
          `;
        let thisDiv = document.querySelector(".movie-pic1");
        let thatDiv = document.querySelectorAll("#loaderq");
        thisDiv.innerHTML = html;
        $(".moviecov").lightGallery();
      })
      .catch((err) => {
        let thisDiv = document.querySelector(".movie-pic1");
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
  /*  THIS IS FOR GETTING VIDEO ID */
  function getVideo() {
    axios.get('https://api.themoviedb.org/3/movie/'+movieId+'/videos?api_key=34ecbb288e9e94b508722abfc2597766')
      .then((response) => {
        let movies = response.data.results;
        let html =  movies.filter( a => {
            if (a.type === "Trailer"){
              return true;
            }
          }
        );
        videoId = html[0].key;
      })
      .catch((err) => {
        console.log(err);
      });
     }


 });
