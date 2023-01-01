const APIKey = 'api_key=c92bb00bf0cbbf3dbe8d5376e4342810';
const baseUrl = 'https://api.themoviedb.org/3/';
const apiUrl = baseUrl + 'discover/movie?sort_by=popularity.desc&' + APIKey;
const base_imgUrl = 'https://image.tmdb.org/t/p/w500';
const searchUrl = baseUrl + 'search/movie?' + APIKey;
let main = document.getElementById('main');
let tagsE1 = document.getElementById('tags');
let selectedGenre = [];

const genre = [{ "id": 28, "name": "Action" }, { "id": 12, "name": "Adventure" }, { "id": 16, "name": "Animation" }, { "id": 35, "name": "Comedy" }, { "id": 80, "name": "Crime" }, { "id": 99, "name": "Documentary" }, { "id": 18, "name": "Drama" }, { "id": 10751, "name": "Family" }, { "id": 14, "name": "Fantasy" }, { "id": 36, "name": "History" }, { "id": 27, "name": "Horror" }, { "id": 10402, "name": "Music" }, { "id": 9648, "name": "Mystery" }, { "id": 10749, "name": "Romance" }, { "id": 878, "name": "Science Fiction" }, { "id": 10770, "name": "TV Movie" }, { "id": 53, "name": "Thriller" }, { "id": 10752, "name": "War" }, { "id": 37, "name": "Western" }];

function openNav() {
	document.getElementById("myNav").style.width = "100%";
}

function closeNav() {
	document.getElementById("myNav").style.width = "0%";
}

function getMovies(ulu) {
	fetch(ulu)
		.then(res => res.json())
		.then(data => {
			if(data.results.length == 0){
				main.innerHTML = `<div class = "NR"> <h1 class="hh"> No Results Found !! </h1> </div>`;
			}
			movies = data.results;
			console.log(data.results[0].id);
			main.innerHTML = '';
			movies.map((items) => {

				let title = items.id;
				let link;
				if(items.poster_path == null){
					link = 'data:image/png;base64,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';
				}
				else{
					link = base_imgUrl + items.poster_path;
				}
				let ad = `<div class = "card" id= "crd">
		     <div> 
		          <img id="im" src = ${link}> 
		     </div> 
		     <div class = "ttl">${items.original_title} 
		     </div> 
			<div class="rating">
			     IMDb : ${items.vote_average}
			</div>
			<div>
			<button class="overview" ><a href="second.html?name=${title} " target="_blank" style="text-decoration: none" >View Details</a></button>
			</div>
		     </div>`
				main.innerHTML += ad;
				// document.getElementById('crd').addEventListener('mouseenter', () => console.log('Mouse Enter'));
				// document.getElementById('crd').addEventListener('mouseleave', () => console.log('Mouse Leave'));
			})

			// let siz = data.results.length;
			// console.log(data.results);
			// let movies = new Array(siz);

			// for (let w = 0; w < siz; w++) {
			// 	movies[w] = new Array(6);
			// }

			// for (let w = 0; w < siz; w++) {
			// 	movies[w][0] = data.results[w].original_title;  //movie name
			// 	movies[w][1] = data.results[w].poster_path;     // movie image
			// 	movies[w][2] = data.results[w].release_date;    //release date
			// 	movies[w][3] = data.results[w].vote_average;    //rating
			// 	movies[w][4] = data.results[w].overview;        //overview
			// 	movies[w][5] = data.results[w].original_language;  //lang
			// }
			// console.log(movies)


			// main.innerHTML = '';
			// alert(movies[4][3]);
			// for (let w = 0; w < siz; w++) {
			// 	let ad = `<div class = "card">
			// <div> 
			//      <img id="im" src = ${base_imgUrl + movies[w][1]}> 
			// </div> 
			// <div class = "ttl">${movies[w][0]} 
			// </div> 
			// <div class="rating">
			//      Rating : ${movies[w][3]}
			// </div>
			// <div>
			// <button class="overview" onclick = "viewDetail('${movies[w][4]}','${movies[w][0]}')" >View Datails</button>
			// </div>
			// </div>`
			// 	// main.innerHTML += ad;

			// }
		})
}

getMovies(apiUrl);
function findd() {
	let mov = document.getElementById('search').value;
	if (mov != "") {
		let movUrl = searchUrl + '&query=' + mov;
		getMovies(movUrl);
	}
	else {
		getMovies(apiUrl);
	}
}

function getGenre(){
	tagsE1.innerHTML = '';
	genre.forEach(genre => {
		// let work = `<div class="Action">${genre.name}</div>`;
		// oc.innerHTML += work;
		// let t = document.getElementById(genre.id);
		const t = document.createElement('div');
		t.classList.add('tag');
		t.id = genre.id;
		t.innerHTML = genre.name;
		t.addEventListener('click', () => {
			if(selectedGenre.length == 0){
				selectedGenre.push(genre.id);
			}
			else{
				if(selectedGenre.includes(genre.id)){
				     selectedGenre.forEach((g,indx) => {
					     if(g == genre.id){
							// removeHighlight(indx);
							selectedGenre.splice(indx,1);
					     }
				     })
			     }
				else{
					selectedGenre.push(genre.id);
				}
			}
			console.log(selectedGenre);
			getMovies(apiUrl + '&with_genres=' + encodeURI(selectedGenre.join(',')));
			highlight();
		})
		tagsE1.append(t);
	})
}

getGenre();

function highlight(){
	let tgs = document.querySelectorAll('.tag');
	tgs.forEach(tg => {
		tg.classList.remove('highlight');
	})
	clearall();
	if(selectedGenre.length != 0){
		selectedGenre.forEach(element => {
			let selected = document.getElementById(element);
			selected.classList.remove('DEhighlight');
			selected.classList.add('highlight');
		})
	}
}

function clearall(){
	if(selectedGenre.length > 0){
	let clearbttn = document.getElementById('clear');
	if(clearbttn){
		clearbttn.classList.add('highlight');
	}
	else{
		let clear = document.createElement('div');
		clear.classList.add('tag','highlight');
		clear.id = 'clear';
		clear.innerHTML = 'Clear All';
		clear.addEventListener('click',() =>{
			selectedGenre = [];
			getGenre();
			getMovies(apiUrl);
		})
		tagsE1.append(clear);
	}
}
}
