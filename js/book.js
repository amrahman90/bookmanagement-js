var books = [];
var editId;

// TODO edit API url's & ACTION_METHODS
const API = {
    CREATE: "./api/add.json",
    READ: "./api/add.json",
    UPDATE: "./api/update.json",
    DELETE: "./api/delete.json"
};
const ACTION_METHODS = {
    CREATE: "GET",
    READ: "GET",
    UPDATE: "GET",
    DELETE: "GET"
};

const numberLettersMap = new Map([["0", []], ["1", []], ["2", ["a","b","c"]], ["3", ["d","e","f"]], ["4", ["g","h","i"]], 
["5", ["j","k","l"]], ["6", ["m","n","o"]], ["7", ["p","q","r","s"]], ["8", ["t","u","v"]], ["9", ["w","x","y","z"]]]);

window.Book = {
    getRow: function(book) {
        // ES6 string template
        return `<tr>
            <td>${book.bookName}</td>
            <td>${book.authorName}</td>
            <td>${book.dateOfPublication}</td>
        </tr>`;
    },

    load: function () {
        fetch(API.READ).then(response => response.json())
        .then(res => {
            BookLocalActions.load(res);
            Book.display(res);
        });
    },

    delete: function(id) {
        $.ajax({
            url: API.DELETE,
            method: ACTION_METHODS.DELETE,
            data: {
                id: id
            }
        }).done(function (response) {
            if (response.success) {
                BookLocalActions.delete(id);
            }
        });
    },

    add: function(book) {
        Book.cancelEdit();
        BookLocalActions.add(book);
    },

    update: function(book) {
        $.ajax({
            url: API.UPDATE,
            method: ACTION_METHODS.UPDATE,
            data: book
        }).done(function (response) {
            if (response.success) {
                Book.cancelEdit();
                BookLocalActions.update(book);
            }
        });
    },

    bindEvents: function() {
        $('#book tbody').delegate('a.edit', 'click', function () {
            var id = $(this).data('id');
            Book.startEdit(id);
        });

        $('#book tbody').delegate('a.delete', 'click', function () {
            var id = $(this).data('id');
            console.info('click on ', this, id);
            Book.delete(id);
        });

        $(".add-form").submit(function() {
            const book = {
                bookName: $('input[name=bookName]').val(),
                authorName: $('input[name=authorName]').val(),
                dateOfPublication: $('input[name=dateOfPublication]').val()
            };

            if (editId) {
                book.id = editId;
                Book.update(book);
            } else {
                Book.add(book);
            }
        });

        document.getElementById('search').addEventListener('input', function(ev) {
            //const value = document.getElementById('search').value;
            const value = this.value;
            Book.search(value);
        });
        document.querySelector('.add-form').addEventListener('reset', function(ev) {
            Book.search("");
        });
    },

    startEdit: function (id) {
        // ES5 function systax inside find
        var editbook = books.find(function (book) {
            console.log(book.bookName);
            return book.id == id;
        });
        console.debug('startEdit', editBook);

        $('input[name=bookName]').val(editBook.bookName);
        $('input[name=authorName]').val(editBook.authorName);
        $('input[name=dateOfPublication]').val(editBook.dateOfPublication);
        editId = id;
    },

    cancelEdit: function() {
        editId = '';
        document.querySelector(".add-form").reset();
    },

    display: function(books) {
        var rows = '';

        // ES6 function systax inside forEach
        books.forEach(book => rows += Book.getRow(book));

        $('#book tbody').html(rows);
    },

    search: function (value) {
        value = value.toLowerCase();
        var filtered;

        if(isNaN(value)) {
            filtered = books.filter(function (book) {
                return book.bookName.toLowerCase().includes(value) ||
                    book.authorName.toLowerCase().includes(value);
            });
        }
        else {
            var charArr = [];
            for(let i=0; i<value.length; i++) {
                var num = value[i];
                var chars = numberLettersMap.get(num);
                charArr.push(chars);
            }
            var combinations = createCombinations(charArr, []);
            filtered = books.filter(function (book) {
                return combinations.some(val => book.bookName.toLowerCase().includes(val) || 
                    book.authorName.toLowerCase().includes(val)) || book.dateOfPublication.toLowerCase().includes(value);
            });
        }
    
        Book.display(filtered);
    }
};

function createCombinations(fields, currentCombinations) {
    var tempFields = fields.slice();

    if (!tempFields || tempFields.length == 0) {
      return currentCombinations;
    }
    else {
      var combinations = [];
      var field = tempFields.pop();
  
      for (var valueIndex = 0; valueIndex < field.length; valueIndex++) {
        var valueName = field[valueIndex];
  
        if (!currentCombinations || currentCombinations.length == 0) {
          var combinationName = valueName;
          combinations.push(combinationName);
        }
        else {
          for (var combinationIndex = 0; combinationIndex < currentCombinations.length; combinationIndex++) {
            var currentCombination = currentCombinations[combinationIndex];
            var combinationName = valueName + currentCombination;
            combinations.push(combinationName);
          }
        }
      }
      return createCombinations(tempFields, combinations);
    }
  }


// ES6 functions
window.BookLocalActions = {
    load: (books) => {
        // save in books as global variable
        window.books = books;
    },
    // ES6 functions (one param - no need pharanteses for arguments)
    add: book => {
        book.id = new Date().getTime();
        books.push(book);
        Book.display(books);
    },
    delete: id => {
        var remainingBooks = books.filter(book => book.id !== id);
        window.books = remainingBooks;
        Book.display(remainingBooks);
    },
    update: book => {
        const id = book.id;
        var bookToUpdate = books.find(book => book.id === id);
        bookToUpdate.bookName = book.bookName;
        bookToUpdate.authorName = book.authorName;
        bookToUpdate.dateOfPublication = book.dateOfPublication;
        Book.display(books);
    }
}

Book.load();
Book.bindEvents();