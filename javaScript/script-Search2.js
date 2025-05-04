const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YzE0MjdlYTJlNzU3N2VjMDMyNjNkYTI2NDVjYTI4MiIsIm5iZiI6MTc0NTY1MDUwMC41MTYsInN1YiI6IjY4MGM4MzQ0MmIzOTU5NTYwZDZlMjZiNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.raRCBZc33_9Iyc1tB72gPxPl8o2n5Q7NX8nTDjlr61U'
    }
}; 

class makeMovie{
    constructor(title,release_date,poster_path){
        this.title=title;
        this.release_date=release_date;
        this.poster_path=poster_path
    }
    async movieMaker(){
        const fullPosterURL = `https://image.tmdb.org/t/p/w500${this.poster_path}`;
        const movieSelect = document.querySelector('#movie');
        this.movieSelect = movieSelect
        movieSelect.innerHTML += `<div class="miniMovie">  
        <img src=${fullPosterURL}>  
        <span> <h2> ${this.title} </h2></span>
        <span> <h2> ${this.release_date} </h2></span>
        </div> `;
        console.log(movieSelect.innerHTML);
        document.querySelector("#movie").style.display="flex"
        return movieSelect
    }
};

async function moviesData(data){
    const movieSelect = document.querySelector('#movie');
    movieSelect.innerHTML = "";
    const movies =await Promise.all(data.results.map((innerData) => {
        console.log(innerData);
        const backer = new makeMovie(innerData.title, innerData.release_date, innerData.poster_path);
        return  backer.movieMaker();
    }))
    return movies
}

const findMovie =async function (){
    let n = document.querySelector("#name").value;
    const movieName = n.replace(/ /g, "+");
    let baseUrl=`https://api.themoviedb.org/3/search/movie?query=${movieName}&y=include_adult=false&language=en-US&page=1`;
    console.log(baseUrl);

    fetch(baseUrl, options)
        .then( res => res.json())
        .then( res => moviesData(res))
        .catch( err => console.error(err));
    
}
const searchHandler=async ()=>{
    const movieName = document.querySelector('#name')
    if(!movieName.value){
        alert("please enter movieName!")
    }
    const currentData=await findMovie();
    movieName.value =""
}

document.querySelector("#search").addEventListener("click", searchHandler);
