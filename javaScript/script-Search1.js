
const findMovie =async function (){
    let baseUrl="http://www.omdbapi.com/?apikey=3bc0d31c&t=";
    // http://www.omdbapi.com/?apikey=3bc0d31c&t=La+la+land&y=2016
    let n = document.querySelector("#name").value;
    let year = document.querySelector("#year").value;
    const movieName = n.replace(/ /g, "+");
    const fullUrl = `${baseUrl}${movieName}&y=${year}`;
    console.log(fullUrl);

    const response=await fetch(fullUrl);
    const json=await response.json();
    return json;
    
}
let movieNameIs = null
class rate{
    constructor(source, value){
        this.source = source;
        this.value = value;
    }
    async makeRate(){   
        const s = await this.source;
        const v = await this.value;
        const answerBack= `<h3> ${s}=${v}</h3> `;
        // console.log(answerBack);
        return answerBack
    }
}

const rateSource=async (dataNotSet)=>{
    let dataSet =[... new Set(dataNotSet)];

    const rateSnippets = await Promise.all(
        dataSet.map(async (data) => {
            const newRate = new rate(data.Source, data.Value);
            return await newRate.makeRate();
        })
    );
    const Rate = rateSnippets.join('');
    return Rate;
};

const emptyEntered = ()=>{
    document.querySelector("#name").value="";
    document.querySelector("#year").value="";
}

let selectedStarId = null;

const writeRatedStar =async (event)=>{
    console.log("Rated: ",event);
    let movieName = await movieNameIs;
    const starID = parseInt(event.replace(/\D/g, ''), 10);
    localStorage.setItem(`${movieName}`,`${event}`);
    alert(`you rated ${movieName} ${starID} Stars`)

}
const starSelectHandler =  (event)=>{
    let star = event.target.id;
    // let starID = star.replace(/\D/g, '');
    let starHolder = document.querySelector(".starHolder").children.length;
    // console.log(starHolder);
    const starID = parseInt(star.replace(/\D/g, ''), 10);
    const stars = document.querySelector(".starHolder").children;
    // console.log(starID);
    for (let i = 0; i < stars.length; i++) {
        if (i < starID) {
            stars[i].style.color = "yellow";
        } else {
            stars[i].style.color = "white";
        }
    }
    selectedStarId = star;

    const registerRating = document.querySelector("#registerRating");

    const cancelRating = document.querySelector("#cancelRating");

    registerRating.innerHTML=`<p>${starID} stars</p>`;

    registerRating.addEventListener("click",() => writeRatedStar(selectedStarId));

    cancelRating.addEventListener("click",()=>{
        selectedStarId = null;
        registerRating.innerHTML=`<p>no star selected</p>`
        for (let i=1 ; i <= 5 ; i++){
            const starEl = document.querySelector(`#star${i}`);
            if (starEl) {
                starEl.style.color = "white";
            }
        }
    });
    return selectedStarId;
};

const starRateHandler =  ()=>{
    let selectStars = document.querySelectorAll(".fa-star");
    selectStars.forEach( (star) => {
        return star.addEventListener("mouseover", starSelectHandler);
    });
    
};


const searchHandler=async ()=>{
    if(!document.querySelector("#name").value){
        alert("please enter movieName!")
    }
    if(!document.querySelector("#year").value){
        alert("please enter year!")
    }else{
        const currentData=await findMovie(name,year);
        console.log(currentData);
        if(currentData!=undefined){
            console.log("working");
            document.querySelector('#movie').style.display = "flex";
            movieNameIs = currentData.Title
            document.querySelector('#movieName').innerText= `${currentData.Title}`;
            document.querySelector('#releaseDate').innerText=`${currentData.Year}`;
            document.querySelector('#rate').innerText =`${currentData.Rated}`;
            document.querySelector('#movie').querySelector('img').src =`${currentData.Poster}`;
            document.querySelector('#actors').innerText= `${currentData.Actors}`;
            document.querySelector('#awards').innerText=`${currentData.Awards}`;
            document.querySelector('#country').innerText= `${currentData.Country}`;
            document.querySelector('#plot').innerText= `${currentData.Plot}`;
            const Ratings = currentData.Ratings;
            document.querySelector('#ratings').innerHTML= await rateSource(Ratings);
            emptyEntered();
            
        }else{
            console.log("not working")
        };
        
        return currentData
    }
}
document.querySelector("#search").addEventListener('click', searchHandler);


if(selectedStarId==null || cancelRating){
    starRateHandler();
}
else{
    console.log("already Rated");
}


