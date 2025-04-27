

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
        document.querySelector('#movie').querySelector('img').src =`${currentData.Poster}`;
    }else{
        console.log("not working")
    };
    return currentData
}
document.querySelector("#search").addEventListener('click', searchHandler)


