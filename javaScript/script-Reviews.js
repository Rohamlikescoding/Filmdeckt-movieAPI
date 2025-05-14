console.log(localStorage);
function makeMovie(localStorage){
    for(movie in localStorage){
        if(movie=='length'){
            break
        }else{
            console.log(`${movie}: ${localStorage[movie]}`);
            
            let thisMakesMovies = new movieMaker(movie,localStorage[movie]);
            thisMakesMovies.make()
        }
    }
} ;
class movieMaker{
    constructor(name, rate){
        this.name = name;
        this.rate = parseInt(rate.toString().replace(/\D/g, ''), 10);
    }
    make(){
        const starIcons = Array.from({ length: 5 }, (_, i) => {
            const yellowClass = i < this.rate ? "yellow" : "";
            // console.log(yellowClass);
            return `<i class="fa-regular fa-star ${yellowClass}" id="star${i + 1}"></i>`;
        }).join("");

        const movieHTML = `
            <div class="movie">
                <p>${this.name} </p>
                <span>${starIcons}</span>
            </div>
        `;

        document.querySelector(".data-Holder").innerHTML += movieHTML;
    }
};
makeMovie(localStorage);