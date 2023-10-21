
document.querySelector('button').addEventListener('click', getFetch)
//adds event listener for input bar (click)
document.querySelector("html").addEventListener("keypress", function (press) {
	if (press.key === "Enter") {
		getFetch();
	}
}); //adds event listener for input bar (click)
document.querySelectorAll('li').addEventListener('click', getFetch)
//adds event listener for nav bar (click) DOESNT WORK nav bar needs anchor tags? maybe a class? needs to change choice to clicked value instead of input value

function getFetch(){
  const choice = document.querySelector('input').value.toLowerCase() //user input
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='+ choice //appends api endpoint with user choice

  

  fetch(url)
      .then(res => res.json()) // parse response as JSON   
      .then(data => {
        console.log(data) 

        document.querySelector('img').src = `${data.drinks[0].strDrinkThumb}` //adds picture to dom

        document.querySelector('h2').innerText = data.drinks[0].strDrink //adds drink name to dom

        document.querySelector('.steps').innerText = data.drinks[0].strInstructions //adds drink instructions to dom
        document.querySelector('ul').innerHTML = ''
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
        document.querySelector('#otherBevs').innerHTML = ''
        for (let i=1; i<data.drinks.length; i++) { //adds similar query responses to nav bar

            let li = document.createElement('li')

            li.textContent = data.drinks[i].strDrink

            document.querySelector('#otherBevs').append(li)
        }
         
      })
      .catch(err => {
          console.log(`error ${err}`)
      });

      document.querySelector('main').classList.remove('off')
      
}

