//This code runs on the server and handles HTTP requests

const express= require('express')
const axios= require ('axios')
const path = require('path');
require('dotenv').config()


//axios is a better option then 'node-fetch' because it 
//simplifies requests & automates JSON 
// dotev load variables from  .env file


// **add .env to .gitignore file


const app= express()
const PORT= 3000
const API= process.env.API_KEY
app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')));

// path module handle and transform file path 
// express.static (middleware) serves static files 
// path.join(__dirname, constructs  path to file (public)


app.get('/movies', async(req,res)=>{
const query= req.query.q
//retrieve query parameters named q from the URL of an incoming HTTP request

const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1&api_key=${API}`;

    
// (try) the code that you want to execute
// If any error occurs within try block, the (catch) block takes control 

    try{
        
        const response = await axios.get(url); //make an HTTP GET request
        res.send(response.data.results) 

       //response  is a object with a data structure returned by  axios
       // contains the HTTP response including status,
      //headers, and the actual payload (data) received from the API


    }catch(error){
        res.status(500).json({error:"Movie List could not be reached"})
    }

})



app.get('/movies/similar', async (req,res)=>{
const query= req.query.q
const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1&api_key=${API}`;


        try{
            const response = await axios.get(url);

            if (response.data.results.length===0){
            return res.status(404).json({error:"Movie  could not be found"})
            }
            const movieId=response.data.results[0].id
            //extracts the id of the first movie from the results from the api data
 
            const similarUrl=`https://api.themoviedb.org/3/movie/${encodeURIComponent(movieId)}/similar?language=en-US&page=1&api_key=${API}`;
            const similarResponse = await axios.get(similarUrl)
            res.json(similarResponse.data.results)

        }catch(error){
            res.status(500).json({error:"Similar Movies could not be reached"})
        }

})




app.listen(PORT,()=>{
console.log(`Server running on port ${PORT}`)
})

