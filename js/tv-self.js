document.addEventListener("DOMContentLoaded", (e) => {
  var tvId = sessionStorage.getItem('tvId');
  getVideo();
  getTvById();
  getTvDetails();


  var videoId;


  document.querySelector("#goback").addEventListener("click", back);
  let man =document.querySelector("#goback");
  function back(e){
    e.preventDefault();
    window.history.go(-1);
  }
  /*  THIS IS FOR THE SIDE DETAILS*/
  function getTvById() {
    axios.get('https://api.themoviedb.org/3/tv/'+tvId+'?api_key=34ecbb288e9e94b508722abfc2597766')
      .then((response) => {
        let movies = response.data;
        let link = "https://image.tmdb.org/t/p/original";
        let picLink = "https://image.tmdb.org/t/p/w92";
        let genreArray = [];
        let language =[];
        let runTime =[];
        let networks =[];
        let seasons =[];

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
            language.push(`<span> ${a}</span>`);
          });
        }

        function run(arr){
          if (arr == "") {
            return;
          }
          arr.map(a => {
            runTime.push(`<span> ${a}</span>`);
          });
        }

        function net(arr){
          if (arr == "") {
            return;
          }
          arr.map(a => {
            networks.push(`
              <span> <img src="${picLink + a.logo_path}" class=" " height="20px" alt=""> </span>
              `);
          });
        }
        function sea(arr){
          if (arr == "") {
            return;
          }
          arr.map(a => {
            seasons.push(`
              <div class="mtt3b">
                <img src="${link + a.poster_path}" class="image-fill" alt="" style="width: unset;">
              </div>`);
          });
        }

        genre(movies.genres);
        run(movies.episode_run_time);
        lang(movies.languages);
        net(movies.networks);
        sea(movies.seasons);

                let html =`
        <div class="mt">
          <div class="mt1">
            ${movies.name}
          </div>
          <div class="mt2">
            <div class="mt2a">
              Official:
              <span> <a href="${movies.homepage}" target="_blank"> ${movies.name}</a> </span>
            </div>
            <div class="mt2a">
              Released Date:
              <span>${movies.first_air_date}</span>
            </div>
            <div class="mt2a">
              Genres:`;
          html += genreArray.join(`

          `);

          html +=
              `
            </div>
            <div class="mt2a">
              Run Time:
            `;

          html += runTime.join(`

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
            <div class="mt2a">
              No of Seasons:
              <span>${movies.number_of_seasons}</span>
            </div>
            <div class="mt2a">
              No of Episodes:
              <span>${movies.number_of_episodes}</span>
            </div>
            <div class="mt2a">
              Networks:
          `;
          html += networks.join(`

          `);
          html +=
          `
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
          <div class="mt3">
            <div class="mt4">
              THE CAST
            </div>
            <div class="mt5">

            </div>
          </div>
          <div class="mt3">
            <div class="mt4">
              SEASONS
            </div>
            <div class="mtt3">`;
            html += seasons.join(`

            `);
            html +=
            `
            </div>
          </div>
          <div class="mt7">
            <div class="mt7a">
              PICTURES
            </div>
            <div class="mt7b" style="height: 14rem;">

            </div>
          </div>
        </div>
          `;
          getCastImage();
          getTvImage();
        let thisDiv = document.querySelector(".movie-det");
        let thatDiv = document.querySelectorAll("#loaderq");
        thisDiv.innerHTML = html;
      })
      .catch((err) => {
        let thisDiv = document.querySelector(".movie-det");
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


  /*  THIS IS FOR CAST IMAGE */
  function getCastImage() {
    axios.get('https://api.themoviedb.org/3/tv/'+tvId+'/credits?api_key=34ecbb288e9e94b508722abfc2597766&language=en-US')
      .then((response) => {
        let movies = response.data.cast;
        let html = movies.map(film => {
          let link = "https://image.tmdb.org/t/p/w154";
        return `
          <div class="mtt1">
            <a href="${link + film.profile_path}" target="_blank">
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


     /*  THIS IS FOR SCREEN IMAGES*/
  function getTvImage() {
    axios.get('https://api.themoviedb.org/3/tv/'+tvId+'/images?api_key=34ecbb288e9e94b508722abfc2597766')
   .then((response) => {
     let movies = response.data.backdrops;
     let html = movies.map(film => {
       let link = "https://image.tmdb.org/t/p/original";
     return `
       <div class="mt7ba">
         <a href="${link + film.file_path}" target="_blank">
           <img src="${link + film.file_path}" alt="">
         </a>
       </div>
       `;
   }).join(" ");
   let me = document.querySelector('.mt7b');
   me.innerHTML = html;
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


/*  THIS IS FOR RECOMMENDATION TAB*/
  function getTvRecommendation() {
    axios.get('https://api.themoviedb.org/3/movie/'+movieId+'/recommendations?api_key=34ecbb288e9e94b508722abfc2597766')
   .then((response) => {
     let movies = response.data.results;
     let html = movies.map(film => {
       let link = "https://image.tmdb.org/t/p/original";
     return `
       <div class="rc1">
         <a href="${link + film.poster_path}" target="_blank">
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
         <div class="mt7ba">
           <div class="error">
             <img src="img/error.png" class="" alt="">
           </div>
         </div>
     `;
   });
  }



  function getTvDetails() {
    axios.get('https://api.themoviedb.org/3/tv/'+tvId+'?api_key=34ecbb288e9e94b508722abfc2597766')
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
        thisDiv.innerHTML = html;
        $(".moviecov").lightGallery();
      })
      .catch((err) => {
        let thisDiv = document.querySelector(".movie-pic1");
        let customError = `
            <div class="movie-wrap">
              <div class="error">
                <img src="img/error.png" class="img-fill" alt="">
              </div>
            </div>
        `;
        thisDiv.innerHTML = customError;
      });
  }

  /*  THIS IS FOR GETTING VIDEO ID */
  function getVideo() {
    axios.get('https://api.themoviedb.org/3/tv/'+tvId+'/videos?api_key=34ecbb288e9e94b508722abfc2597766')
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
