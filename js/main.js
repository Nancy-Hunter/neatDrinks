
let choice 

document.querySelector('button').addEventListener('click', function () {
  document.querySelector('#otherBevs').innerHTML = '' //empties previous responses
  //document.querySelector('span').innerHTML = ""
  choice = document.querySelector('input').value.toLowerCase() //user input
  getFetch()
})
//adds event listener for input bar (click)
document.querySelector("html").addEventListener("keypress", function (press) {
  document.querySelector('#otherBevs').innerHTML = '' //empties previous responses
 // document.querySelector('span').innerHTML = ""
	if (press.key === "Enter") {
    choice = document.querySelector('input').value.toLowerCase()
		getFetch()
	}
}) //adds event listener for input bar (click)


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

        
        for (let i=1; i<data.drinks.length; i++) { //adds similar query responses to nav bar

            let li = document.createElement('li')

            li.textContent = data.drinks[i].strDrink

            document.querySelector('#otherBevs').append(li)
            document.getElementById('otherBevs').addEventListener('click', function (e) {
              //adds eventlistners to navigation bar drinks
                if(e.target && e.target.nodeName == "LI") {
                // List item found!  Output the ID!
                    console.log(e.target.textContent);
                }
                choice =  e.target.textContent
                getFetch () //does getFetch with new choice
              })
        }

        
        // if (data.drinks.length>1) {
        //   document.querySelector('span').innerHTML = "" IS THIS NECESSARY?
        //   document.querySelector('span').innerHTML = "Next >>>>"
        //    } else {
        //       document.querySelector('span').innerHTML = ""
        //    } 

        // document.querySelector('span').addEventListener('click', function (e) {
        //     let drinkList = KEY OF DRINK 
        //     if (drinkList<data.drinks.length-1) {
        //       drinkList++
        //       choice =  data.drinks[drinkList].strDrink
        //       console.log(drinkList)) //TEST HERE TO DETERMINE WHICH KEY IS FOUND
        //       getFetch ()  
        //     } else {
        //        choice = data.drinks[0].strDrink
        //        getFetch()
      //        }
        //   })




       })

      .catch(err => {
          console.log(`error ${err}`)
      });

      document.querySelector('main').classList.remove('off')
      
}

