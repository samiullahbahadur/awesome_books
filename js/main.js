class Books {
  constructor(title = '', author = '') {
    this.title = title;
    this.author = author;
  }

  saveBook(BTSave) {
    const storeBook = JSON.stringify(BTSave);
    localStorage.setItem('books', storeBook);
  }

  addBook() {
    if (
      localStorage.getItem('books') === null
      || JSON.parse(localStorage.getItem('books')).length <= 0
    ) {
      const books = [
        {
          Id: 1,
          Btitle: this.title,
          Bauthor: this.author,
        },
      ];
      this.saveBook(books);
    } else {
      const books = JSON.parse(localStorage.getItem('books'));

      const lastId = books[books.length - 1].Id + 1;
      const book = {
        Id: lastId,
        Btitle: this.title,
        Bauthor: this.author,
      };

      books.push(book);
      this.saveBook(books);
    }
  }

  removeBook(bookId) {
    const books = JSON.parse(localStorage.getItem('books'));
    const remove = books.filter((book) => book.Id !== Number(bookId));
    this.saveBook(remove);
  }
}

//  display all the books;

function displayBook() {
  if (localStorage.getItem('books') !== null) {
    const books = JSON.parse(localStorage.getItem('books'));
    for (let i = 0; i < books.length; i += 1) {
      const list = document.querySelector('.books_table');
      const row = document.createElement('tr');
      row.innerHTML = ` <td>${books[i].Btitle}</td> 
      <td>${books[i].Bauthor}</td> <td>
      <button type="submit" id="${books[i].Id}" class="btn">Remove</button></td> `;
      list.appendChild(row);
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
    const addBk = new Books(title.value, author.value);
    addBk.addBook();
  }
});

// Remove book function

const btn = document.querySelectorAll('.btn');
btn.forEach((element) => {
  element.addEventListener('click', function rem() {
    const removeBk = new Books();
    removeBk.removeBook(this.id);
    this.parentNode.parentNode.remove();
  });
});
