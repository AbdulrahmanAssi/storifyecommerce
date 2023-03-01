const path = require("path");
const express = require("express");
const app = express();
const axios = require("axios");
// PokeAPI Link
// https://pokeapi.co/

// Documentation
// https://pokeapi.co/docs/v2
 

// EJS
app.set("view engine","ejs")
app.set('views',path.join(__dirname,'/pages'))
app.use(express.static(path.join(__dirname,'/public'))); // set path for assets folder

async function makeRequest() {
  // Configure request
  let pokiArr=[];
  const config = {
    method: "get", // request method (get, post, ...)
    url: "https://pokeapi.co/api/v2/pokemon/pikachu", // API link
  };
  const config2 = {
    method: "get", // request method (get, post, ...)
    url: "https://pokeapi.co/api/v2/pokemon/ditto", // API link
  };
  const config3 = {
    method: "get", // request method (get, post, ...)
    url: "https://pokeapi.co/api/v2/pokemon/charmander", // API link
  };

  pokiArr[0] = await axios(config);
  pokiArr[1] = await axios(config2);
  pokiArr[2] = await axios(config3);
  for(let i=0;i<3;i++){
  console.log("Response Data");
  console.log("--------------------");
  console.log("Extracted info from response data:");
  console.log("--------------------");
  console.log(`Pokemon Name: ${pokiArr[i].data.name}`);
  console.log(`Pokemon Order: ${pokiArr[i].data.order}`);
  console.log(`Pokemon Species: ${pokiArr[i].data.species.name}`);
  console.log(`Pokemon Species URL: ${pokiArr[i].data.species.url}`);
  }
  return pokiArr;
}

//Routes
app.get("/", async (req, res) => {
  var pokiArr = await makeRequest();
  res.render("home", {
    title: "My Pokimons Showcase",
    pokimons:[pokiArr[0],pokiArr[1],pokiArr[2]]
  });
});

app.listen(3000)
