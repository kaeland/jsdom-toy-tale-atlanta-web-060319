const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

// OR HERE!
document.addEventListener("DOMContentLoaded", setupPage)

function setupPage() {
  toyForm.addEventListener("submit", addNewToy)

  fetchToys()
}

function fetchToys() {
  fetch("http://localhost:3000/toys")
    .then(function(res) {
      return res.json()
    })
    .then(displayToysOnPage)
}

function displayToysOnPage(toys) {
  toys.forEach(function(toy) {
    displayToyCard(toy)
  })
}

function displayToyCard(toy) {
  let toyCollection = document.querySelector("#toy-collection")
  
  let toyCard = document.createElement("div")
  toyCard.className = "card"
  toyCard.setAttribute("data-toy-id", toy.id)
  toyCard.setAttribute("data-toy-name", toy.name)
  toyCard.setAttribute("data-toy-image", toy.image)
  toyCard.setAttribute("data-toy-likes", toy.likes)
  
  let h2 = document.createElement("h2")
  h2.innerText = toy.name

  let img = document.createElement("img")
  img.src = toy.image
  img.className = "toy-avatar"

  let p = document.createElement("p")
  p.innerText = toy.likes

  let likeButton = document.createElement("button")
  likeButton.className = "like-btn"
  likeButton.innerText = "Like <3"
  likeButton.addEventListener("click", likeToy)

  toyCard.appendChild(h2)
  toyCard.appendChild(img)
  toyCard.appendChild(p)
  toyCard.appendChild(likeButton)
  

  toyCollection.appendChild(toyCard)

}

function addNewToy(e) {
  e.preventDefault()
  // debugger
  let name = e.target.name.value
  let image = e.target.image.value

  fetch("http://localhost:3000/toys", {
    method: "POST", 
    headers: {
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({
      name: name, 
      image: image,
      likes: 0
    })
  }).then(function(res) {
    return res.json()
  }).then(displayToyCard)
}

function likeToy(e) {
  let id = e.target.parentElement.dataset.toyId
  let likesDOMElement = e.target.parentElement.children[2]
  likes = parseInt(likesDOMElement.innerText)
  likes = likes + 1

  likesDOMElement.innerText = likes.toString()

  console.log("likes: ", likes)

  fetch(`http://localhost:3000/toys/${id}`, {
    method: "PATCH", 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      likes: likes 
    })
  }).then(function(res) {
    return res.json()
  }).then(console.log)
}

