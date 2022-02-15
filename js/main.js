function addBook(title, author) {
  if (
    localStorage.getItem('books') === null
    || JSON.parse(localStorage.getItem('books')).length <= 0
  ) {
    const books = [
      {
        Id: 1,
        Btitle: title,
        Bauthor: author,
      },
    ];
    const storeBook = JSON.stringify(books);
    localStorage.setItem('books', storeBook);
  } else {
    const books = JSON.parse(localStorage.getItem('books'));

    const lastId = books[books.length - 1].Id + 1;
    const book = {
      Id: lastId,
      Btitle: title,
      Bauthor: author,
    };

    books.push(book);
    const storeBook = JSON.stringify(books);
    localStorage.setItem('books', storeBook);
  }
}

function removeBook(bookId) {
  const books = JSON.parse(localStorage.getItem('books'));
  const remove = books.filter((book) => book.Id !== bookId);
  const storeBook = JSON.stringify(remove);
  localStorage.setItem('books', storeBook);
}

//  display all the books;

function displayBook() {
  if (localStorage.getItem('books') !== null) {
    const books = JSON.parse(localStorage.getItem('books'));
    for (let i = 0; i < books.length; i = +1) {
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
    e.preventDefault();
  } else {
    addBook(title.value, author.value);
  }
});

// Remove book function

const btn = document.querySelectorAll('.btn');
btn.forEach((element) => {
  element.addEventListener('click', () => {
    removeBook(this.id);
  });
});
