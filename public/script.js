// This code runs in the browser and handles user interactions


async function searchMovies (){
    const query= document.getElementById(`query`).value//get the html form input query
    const response = await fetch(`/movies?q=${encodeURIComponent(query)}`)
    const movie= await response.json()//waits for the response,converts to JSON 
    displayResults(movie)

//This function sends a fetch request to the server at the /movies endpoint 
//with the user's input as a query parameter 


// The server listens for GET requests, then extracts the q query parameter 
//using callback displayResults separates data fetching and displaying
    
}



async function searchSimilarMovies(){
    const query= document.getElementById(`query`).value
    const response = await fetch(`/movies/similar?q=${encodeURIComponent(query)}`)
    const movie= await response.json()
    displayResults(movie)
    
}



function displayResults(movie){

  const resultsDiv= document.getElementById('result')
  resultsDiv.innerHTML=''//create the inner HTML content of the resultsDiv 
  
  if (movie.length===0){
    resultsDiv.innerHTML= '<p> No results found </p>'
    return
  }


  movie.forEach(movies=>{
        const movieDiv= document.createElement('div')
        movieDiv.className='movie'

        const title = document.createElement('h2')
        title.textContent= movies.title//set text content
        movieDiv.appendChild(title)


        if(movies.poster_path){
            const poster= document.createElement('img')
            poster.src=`https://image.tmdb.org/t/p/w200${movies.poster_path}`
            poster.alt= movies.title
            movieDiv.append(poster)
        }

        const descrip= document.createElement('p')
        descrip.textContent= movies.overview
        movieDiv.appendChild(descrip)
        resultsDiv.appendChild(movieDiv)

    })



}