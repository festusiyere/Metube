document.addEventListener("DOMContentLoaded", (e) => {
  var personId = sessionStorage.getItem('personId');

  getPersonById();
  getPersonDetails();

  document.querySelector("#goback").addEventListener("click", back);
  let man =document.querySelector("#goback");
  function back(e){
    e.preventDefault();
    window.history.go(-1);
  }

  function getPersonById() {
    axios.get('https://api.themoviedb.org/3/person/'+personId+'?api_key=34ecbb288e9e94b508722abfc2597766')
      .then((response) => {
        let movies = response.data;
        let link = "https://image.tmdb.org/t/p/original";
        let alias = [];
        function knownFor(arr){
          if (arr == "") {
            return;
          }
          arr.map(a => {
            alias.push(`<span> ${a}</span>`);
          });
        }
        knownFor(movies.also_known_as);

        let html = `
        <div class="mt">
          <div class="mt1">
            ${movies.name}
          </div>
          <div class="mt2">
            <div class="mt2a">
              Date of Birth:
              <span>${movies.birthday}</span>
            </div>
            <div class="mt2a">
              Place of Birth:
              <span>${movies.place_of_birth}</span>
            </div>
            <div class="mt2a">
              Role:
              <span>${movies.known_for_department}</span>
            </div>
            <div class="mt2a">
              Aliases:`;
              html += alias.join(`

              `);

              html +=
              `
            </div>
          </div>
          <div class="mt6" style="max-height: 17rem; overflow: scroll;">
            <div class="mt6a">
              Biography
            </div>
            <div class="mt6b">
              ${movies.biography}
            </div>
          </div>
          <div class="mt7">
            <div class="mt7a">
              PICTURES
            </div>
            <div class="mt7b" style="height: 25rem;overflow: unset; overflow-y: scroll;">

            </div>
          </div>
        </div>
        `;

        getPersonImage();
        let thisDiv = document.querySelector(".movie-det");
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


  function getPersonImage() {
    axios.get('https://api.themoviedb.org/3/person/'+personId+'/images?api_key=34ecbb288e9e94b508722abfc2597766')
   .then((response) => {
     let movies = response.data.profiles;
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


  function getPersonDetails() {
    axios.get('https://api.themoviedb.org/3/person/'+personId+'?api_key=34ecbb288e9e94b508722abfc2597766&language=en-US')
      .then((response) => {
        let movies = response.data;
        let link = "https://image.tmdb.org/t/p/original";
        let html =`
        <div class="moviecov">
            <a href="${link + movies.profile_path}" target="_blank">
              <img class="image-fill" src="${link + movies.profile_path}" alt="">
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

 });
