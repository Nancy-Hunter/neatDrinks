
let choice 
let drinkSet = []

document.querySelector('button').addEventListener('click', function () {
  document.querySelector('#otherBevs').innerHTML = '' //empties previous responses
  //document.querySelector('span').innerHTML = ""
  choice = document.querySelector('input').value.toLowerCase() //user input
  getFetch()
  addNavigationBar()
})
//adds event listener for input bar (click)
document.querySelector("html").addEventListener("keypress", function (press) {
  document.querySelector('#otherBevs').innerHTML = '' //empties previous responses
 // document.querySelector('span').innerHTML = ""
	if (press.key === "Enter") {
    choice = document.querySelector('input').value.toLowerCase()
		getFetch()
    addNavigationBar()
	}
}) //adds event listener for input bar (click)
document.querySelector('.previous').addEventListener('click', backwards)
document.querySelector('.next').addEventListener('click', forwards)

function getFetch(){
 
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='+ choice //appends api endpoint with user choice

  fetch(url)
      .then(res => res.json()) // parse response as JSON   
      .then(data => {
        console.log(data) 

        document.querySelector('img').src = `${data.drinks[0].strDrinkThumb}` //adds/replaces picture to dom

        document.querySelector('h2').innerText = data.drinks[0].strDrink //adds/replaces drink name to dom

        document.querySelector('.steps').innerText = data.drinks[0].strInstructions //adds/replaces drink instructions to dom

        document.querySelector('ul').innerHTML = '' //clears old ingredients if any
          for (let i = 1; i<= 15; i++) { //adds list of ingredients
            let ingredients = data.drinks[0][`strIngredient${i}`]
            let measurements = data.drinks[0][`strMeasure${i}`]

            if (measurements && ingredients) { //adds ingredients with measurements 

              let li = document.createElement('li')

              li.innerHTML = `${measurements} ${ingredients}`

              document.querySelector('ul').append(li)
            
            } else if (ingredients) { //adds ingredients without measurements
              let li = document.createElement('li')

              li.innerHTML = ingredients

              document.querySelector('#ingredients').append(li)
            }
          }

       })

      .catch(err => {
          console.log(`error ${err}`)
      });

      document.querySelector('main').classList.remove('off')
      
}

function addNavigationBar () {
const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='+ choice //appends api endpoint with user choice

  fetch(url)
      .then(res => res.json()) // parse response as JSON   
      .then(data => {
         
        drinkSet = [data.drinks[0].strDrink]
            

        for (let i=1; i<data.drinks.length; i++) { //adds similar query responses to nav bar

            let li = document.createElement('li')

            li.textContent = data.drinks[i].strDrink

            document.querySelector('#otherBevs').append(li)
            
            drinkSet.push(data.drinks[i].strDrink)// adds nav list to an array
        }

       
        document.getElementById('otherBevs').addEventListener('click', function (e) {
        //adds eventlistners to navigation bar drinks
            if(e.target && e.target.nodeName == "LI") {
            // List item found!  Output the ID!
                console.log(e.target.textContent);
                choice =  e.target.textContent
                getFetch () //does getFetch with new choice
            }
        })

       })

      .catch(err => {
          console.log(`error ${err}`)
      });   
}


function backwards() {

            let current = document.querySelector('h2').textContent
            let currentIndex = drinkSet.findIndex(x=>x==current)
            currentIndex--     
            if (currentIndex==-1) {
            choice = drinkSet[drinkSet.length-1]
            getFetch()
            } else if (currentIndex< drinkSet.length) {
                choice = drinkSet[currentIndex]
                getFetch()
            }     
        }  
function forwards() {

            let current = document.querySelector('h2').textContent
            let currentIndex = drinkSet.findIndex(x=>x==current)
            currentIndex++       
            if (currentIndex< drinkSet.length) {
                choice = drinkSet[currentIndex]
                getFetch()
            } else {
                choice = drinkSet[0]
                getFetch()
            }  
        }             


















//unused function that returns key from key value pair

const findPath = (ob, key, value) => {
    const path = [];
    const keyExists = (obj) => {
      if (!obj || (typeof obj !== "object" && !Array.isArray(obj))) {
        return false;
      }
      else if (obj.hasOwnProperty(key) && obj[key] === value) {
        return true;
      }
      else if (Array.isArray(obj)) {
        let parentKey = path.length ? path.pop() : "";
  
        for (let i = 0; i < obj.length; i++) {
          path.push(`${parentKey}[${i}]`);
          const result = keyExists(obj[i], key);
          if (result) {
            return result;
          }
          path.pop();
        }
      }
      else {
        for (const k in obj) {
          path.push(k);
          const result = keyExists(obj[k], key);
          if (result) {
            return result;
          }
          path.pop();
        }
      }
  
      return false;
    };
  
    keyExists(ob);
  
    return path.join(".");
  }