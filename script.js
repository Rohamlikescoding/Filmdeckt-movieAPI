

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
const findPoster =async function (){
    let baseUrl="http://img.omdbapi.com/?apikey=3bc0d31c&t=";
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
const searchHandler=async ()=>{
    // if(!movieName){
    //     alert("please enter movieName!")
    // }
    // if(!year){
    //     alert("please enter year!")
    // }
    const currentData=await findMovie(name,year);
    console.log(currentData)

    const currentData2=await findPoster(name,year);
    console.log(currentData)
    
}

document.querySelector("#search").addEventListener('click', searchHandler)
