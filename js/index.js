document.addEventListener("DOMContentLoaded", function() {});

//DOM elements
const bookUl = document.querySelector("ul")
const showPanel = document.querySelector("#show-panel")
//event listeners

bookUl.addEventListener("click", fetchBook)

//get book to like

function getBookToLike(event){
    const id = event.target.dataset.id
    //  fetch(`http://localhost:3000/books/${id}`)
    // .then(response => response.json())
    // .then(book => {
    //     updateUsers(book)
    //     console.log('Book to update:', book);
    //   })
    if (event.target.textContent === "Like"){
        event.target.textContent = "Unlike"
        fetch(`http://localhost:3000/books/${id}`)
        .then(response => response.json())
        .then(book => {
            likeBook(book)
            console.log('Book to like:', book);
          })
    } else if (event.target.textContent === "Unlike"){
        event.target.textContent = "Like"
        fetch(`http://localhost:3000/books/${id}`)
        .then(response => response.json())
        .then(book => {
            unlikeBook(book)
            console.log('Book to Unlike:', book);
          })
    }

    }

    //update users that like the book

function likeBook(book){
    const currentUser = {id:1, username:"pouros"}
    if (book.users.some(obj => obj.username === currentUser.username)){
        book.users
    } else if (book.users.push(currentUser))
    fetch(`http://localhost:3000/books/${book.id}`, {
    method: 'PATCH', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({users:book.users}),
    })
    .then(response => response.json())
    .then(updatedBook => {
        displayBookInfo(updatedBook)
    console.log('Updated Book:', updatedBook);
    })
    .catch((error) => {
    console.error('Error:', error);
    });
}
    
// update users that unlike the book

function unlikeBook(book){
    const currentUser = {id:1, username:"pouros"}
    if (book.users.some(obj => obj.username === currentUser.username)){
        book.users = book.users.filter(obj => obj.username !== currentUser.username)
    } else if (book.users)
    fetch(`http://localhost:3000/books/${book.id}`, {
    method: 'PATCH', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(console.log({users:book.users})),
    })
    .then(response => response.json())
    .then(updatedBook => {
        displayBookInfo(updatedBook)
    console.log('Updated Book:', updatedBook);
    })
    .catch((error) => {
    console.error('Error:', error);
    });
}
    

//display book info

function displayBookInfo(book){
    showPanel.innerHTML = ""
    const img = document.createElement("img")
    img.src = book.img_url
    const h2Title = document.createElement("h2")
    h2Title.textContent = book.title
    const h3Subtitle = document.createElement("h3")
    h3Subtitle.textContent = book.subtitle
    const h3Author = document.createElement("h3")
    h3Author.textContent = book.author
    const p = document.createElement("p")
    p.textContent = book.description
    const list = document.createElement("ul")
    const likeBtn = document.createElement("button")
    likeBtn.textContent = "Like"
    likeBtn.dataset.id = book.id
    showPanel.append(img, h2Title, h3Subtitle, h3Author, p, list, likeBtn)
    // let users = book.users
    likeBtn.addEventListener("click", getBookToLike)
    
    //create user list
    book.users.forEach(user =>{
        const li = document.createElement("li")
        li.textContent = user.username
        list.append(li)
    })
    // likeBtn.addEventListener("click", function(){
    //     const currentUser = {id:1, username:"pouros"}
    //     debugger
    // })
}

//fetch book info

function fetchBook(event){
    if (event.target.tagName === "LI") {
        const id = event.target.dataset.id
        fetch(`http://localhost:3000/books/${id}`)
        .then(response => response.json())
        .then(returnedBook => {
            displayBookInfo(returnedBook)
            console.log('Success:', returnedBook);
        })
    }
}


// create book list

function createBookLi(book){
    const li = document.createElement("li")
    li.textContent = book.title
    li.dataset.id = book.id
    bookUl.append(li)
}

function renderBooks(booksArray){
    booksArray.forEach(createBookLi)
}


//initial fetch

function initialize(){
    fetch('http://localhost:3000/books')
    .then(response => response.json())
    .then(booksArray => {
        renderBooks(booksArray)
        console.log('Success:', booksArray);
      })
    // .then(booksArray => renderBookList(booksArray));
}
initialize()