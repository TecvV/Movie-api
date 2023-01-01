let urlP = new URLSearchParams(window.location.search);
let id = urlP.get('name');
// alert(id);

const base_url = 'https://api.themoviedb.org/3/movie/';
const APIKey = 'api_key=c92bb00bf0cbbf3dbe8d5376e4342810';
const base_imgUrl = 'https://image.tmdb.org/t/p/w500';
const crewUrl = base_url + id + '/credits?' + APIKey;

const movie_url = base_url + id + '?' + APIKey;

fetch(movie_url)
.then(res => res.json())
.then(data => {
     // console.log(data);
     let Name = data.original_title;
     let Overview = data.overview;
     let rel_date = data.release_date;
     let imdb = data.vote_average;
     let poster = base_imgUrl + data.poster_path;
     let back_img = base_imgUrl + data.backdrop_path;
     let status = data.status;
     let duration = data.runtime;
     let genres = new Array();
     for(let w=0;w<data.genres.length;w++){
          genres.push(data.genres[w].name);
     }
     
     // let img = document.getElementById('imgCont');
     // let desc = document.getElementById('det');
     // let name = document.getElementById('head');
     let bod = document.getElementById('bod');
     bod.innerHTML = `<div class = "whole" style = "background-image: url(${back_img});"> 
     <div class="details">
     <h2 id="head">${Name}</h2>
     <h4>Overview</h4>
     <p id="det">${Overview}</p><br>
     <p id="det">IMDb : ${imdb}</p>
     <p id="det">Release Date : ${rel_date} (${status}) </p>
     <p id="det">Duration : ${duration} minutes </p>
     <p id="det">Genres : ${genres}  </p>
     </div> 
     <div id="imgCont">
     <img src=${poster} alt="" id="im">
</div>
     </div>`
     
})

function getCast(urll){
     fetch(urll)
     .then(res => res.json())
     .then(data => {
          console.log(data);
          let cast = data.cast;
          // console.log(cast);
          let crew = document.getElementById('crew');
          crew.innerHTML = '';
          cast.map((items) => {
               // console.log(items);
               let character = items.character;
               let naam = items.original_name;
               let photo;
               if(items.profile_path == null){
                    photo = 'data:image/png;base64,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';
               }
               else{
                    
                    photo = base_imgUrl + items.profile_path;
               } 

               crew.innerHTML += `<div class = "card"> <img src = ${photo} class="imgg"> <h2 class = "sab"> ${naam} as ${character} </h2> </div>`
          })
     })
}

getCast(crewUrl);