class Books {
  constructor(title = '', author = '') {
    this.title = title;
    this.author = author;
    this.books = localStorage.getItem('books') !== null
      ? JSON.parse(localStorage.getItem('books'))
      : '';
  }

  saveBook(BTSave = this.books) {
    const storeBook = JSON.stringify(BTSave);
    localStorage.setItem('books', storeBook);
  }

  addBook() {
    if (this.books === '' || this.books.length <= 0) {
      this.books = [
        {
          Id: 1,
          Btitle: this.title,
          Bauthor: this.author,
        },
      ];
      this.saveBook();
    } else {
      const lastId = this.books[this.books.length - 1].Id + 1;
      const book = {
        Id: lastId,
        Btitle: this.title,
        Bauthor: this.author,
      };
      this.books.push(book);
      this.saveBook();
    }
  }

  removeBook(bookId) {
    const remove = this.books.filter((book) => book.Id !== Number(bookId));
    this.saveBook(remove);
  }

  static displayBook(book) {
    const list = document.querySelector('.books_table');
    const row = document.createElement('tr');
    row.innerHTML = ` <td>${book.Btitle}</td> 
    <td>${book.Bauthor}</td> <td>
    <button type="submit" id="${book.Id}" class="btn">Remove</button></td> `;
    list.appendChild(row);
  }
}

//  display all the books;

if (localStorage.getItem('books') !== null) {
  const books = JSON.parse(localStorage.getItem('books'));
  books.forEach((element) => {
    Books.displayBook(element);
  });
}

// add book function

const title = document.getElementById('title');
const author = document.getElementById('author');

document.querySelector('#book-form').addEventListener('submit', (e) => {
  if (title.value === '' || author.value === '') {
    const error = document.getElementById('error');
    error.textContent = 'Title and Author fields must be filled out';
    error.style.color = 'red';
    e.preventDefault();
  } else {
    const addBk = new Books(title.value, author.value);
    addBk.addBook();
  }
});

// Remove book function

function removeBk() {
  const Book = new Books();
  Book.removeBook(this.id);
  this.parentNode.parentNode.remove();
}

const btn = document.querySelectorAll('.btn');
btn.forEach((element) => {
  element.addEventListener('click', removeBk);
});

// navbar section

const links = document.querySelectorAll('.links');

function showBlock(e) {
  const sectionList = document.getElementById('list');
  const sectionAdd = document.getElementById('add_book');
  const sectionContact = document.getElementById('contact');
  switch (e) {
    case 'list-link':
      sectionList.style.display = 'block';
      sectionAdd.style.display = 'none';
      sectionContact.style.display = 'none';
      break;

    case 'add-link':
      sectionAdd.style.display = 'block';
      sectionList.style.display = 'none';
      sectionContact.style.display = 'none';
      break;

    case 'contact-link':
      sectionContact.style.display = 'flex';
      sectionAdd.style.display = 'none';
      sectionList.style.display = 'none';
      break;

    default:
      sectionList.style.display = 'block';
      sectionAdd.style.display = 'none';
      sectionContact.style.display = 'none';
      break;
  }
}

links.forEach((element) => {
  element.addEventListener('click', function () {
    showBlock(element.id);
    const current = document.getElementsByClassName('active');
    current[0].className = current[0].className.replace(' active', '');
    this.className += ' active';
  });
});
