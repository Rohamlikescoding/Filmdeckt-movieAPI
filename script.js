

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
// const findPoster =async function (){
//     let baseUrl="http://img.omdbapi.com/?apikey=3bc0d31c&t=";
//     // http://www.omdbapi.com/?apikey=3bc0d31c&t=La+la+land&y=2016
//     let n = document.querySelector("#name").value;
//     let year = document.querySelector("#year").value;
//     const movieName = n.replace(/ /g, "+");
//     const fullUrl = `${baseUrl}${movieName}&y=${year}`;
//     console.log(fullUrl);
    
//     const response=await fetch(fullUrl);
//     const json=await response.json();
//     return json;
    
// }
// const showDisplay = async function(dataIS) {
//     if(dataIS){ data => {
//         document.querySelector('#movie').style.display = "flex";
//         document.querySelector('#movieName').innerText+= `${data.Title}`;
//         document.querySelector('#releaseDate').innerText+=`${data.year}`;
//         document.querySelector('#movie').innerHTML+=`<img src="${data.poster}" alt="${movie.name}"></img>`;
//         }
//     }else{
//         console.log("not working");
//     }
    
// }
class rate{
    constructor(source, value){
        this.source = source;
        this.value = value;
    }
    async makeRate(){   
        const s = await this.source;
        const v = await this.value;
        let answerBack= `<p> ${s}=${v}</p> `;
        console.log(answerBack);
        return  answerBack;
    }
}
// let dataNotSet = [];

const rateSource=async (dataNotSet)=>{
    

    let dataSet =[... new Set(dataNotSet)];
    dataSet.map(async (data) => {
        console.log(await data);
        console.log(await data.Source);
        const newRate = new rate(await data.Source,await data.Value);
        return await newRate.makeRate()
    })
}

const searchHandler=async ()=>{
    // if(!movieName){
    //     alert("please enter movieName!")
    // }
    // if(!year){
    //     alert("please enter year!")
    // }
    
    const currentData=await findMovie(name,year);
    console.log(currentData);
    if(currentData!=undefined){
        console.log("working");
        document.querySelector('#movie').style.display = "flex";
        // document.querySelector('#movie').style.flexDirection = "column";
        document.querySelector('#movieName').innerText= `${currentData.Title}`;
        document.querySelector('#releaseDate').innerText=`${currentData.Year}`;
        // document.querySelector('#movie').innerHTML+=`<img src="${currentData.Poster}" alt="${movie.name}"></img>`;
        document.querySelector('#rate').innerText =`${currentData.Rated}`;
        document.querySelector('#movie').querySelector('img').src =`${currentData.Poster}`;
        document.querySelector('#actors').innerText= `${currentData.Actors}`;
        document.querySelector('#awards').innerText=`${currentData.Awards}`;
        document.querySelector('#country').innerText= `${currentData.Country}`;
        document.querySelector('#plot').innerText= `${currentData.Plot}`;
        const Ratings = currentData.Ratings;
        document.querySelector('#ratings').innerHTML=await rateSource(Ratings);

    }else{
        console.log("not working")
    };
    return currentData
}
document.querySelector("#search").addEventListener('click', searchHandler)


