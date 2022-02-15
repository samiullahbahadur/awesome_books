class Books {
  constructor(title ='', author=''){
    this.title = title;
    this.author = author;
  }

  addBook () {
    if (localStorage.getItem('books') === null || JSON.parse(localStorage.getItem('books')).length <= 0) {
      const books = [
        {
          Id : 1,
          Btitle : this.title,
          Bauthor : this.author,
        }
      ]
      const storeBook = JSON.stringify(books);
      localStorage.setItem('books', storeBook);
    }else {
      const books = JSON.parse(localStorage.getItem('books'));

      let lastId = books[books.length -1].Id +1;
      const book = {
          Id : lastId,
          Btitle : this.title,
          Bauthor : this.author,
        }

      books.push(book);
      const storeBook = JSON.stringify(books);
      localStorage.setItem('books', storeBook);
    }
  }

  removeBook (bookId) {
    const books = JSON.parse(localStorage.getItem('books'));
    const remove = books.filter(book => book.Id != Number(bookId));
    const storeBook = JSON.stringify(remove);
    localStorage.setItem('books', storeBook);
  }
}

//  display all the books;

function displayBook(){
  if (localStorage.getItem('books') !== null) { 
    const books = JSON.parse(localStorage.getItem('books'));
    for (let i = 0; i < books.length; i++) {
      const Pbook = `
      <div class="book">
      <div class="title">  Title: ${books[i].Btitle}</div>
      <div class="auther"> Author: ${books[i].Bauthor}</div>
      <button type="button" class="btn" id="${books[i].Id}">Remove</button>
      <hr>
    </div>`;
      const container = document.querySelector('.books_container');
      container.insertAdjacentHTML('beforeend', Pbook);
    }
  }
}

displayBook();

// add book function

const title = document.getElementById('title');
const author = document.getElementById('author');

document.querySelector('#book-form').addEventListener('submit', (e) => { 
  if (title.value === '' || author.value === '') {
    alert('Title and Author fields must be filled out');
    e.preventDefault()
  }else {
    let addBk = new Books(title.value, author.value);
    addBk.addBook();
  }
});


// Remove book function

const btn = document.querySelectorAll('.btn');
btn.forEach(element => {
  element.addEventListener('click',function(){
    let removeBk = new Books();
    removeBk.removeBook(this.id);
    this.parentNode.remove();
  });
});
