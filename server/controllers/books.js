/*File: controllers/books.js
Author Name: Kiruthika Varathanthan
Student ID: 301200412
Web App Name: COMP229-Midterm-301200412
Date: 2022-10-28*/

// define the book model
import booksModel from '../models/books.js';

/* GET books List page. READ */
export function displayBookList(req, res, next) {
    // find all books in the books collection
    booksModel.find((err, booksCollection) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'Book List', page: 'books/list', books: booksCollection });
    });
}

//  GET the Book Details page in order to add a new Book
export function displayAddPage(req, res, next) {

    //renders the book details page
    res.render('index', { title: 'Add Book', page: 'books/add', book: {} })
}

// POST process the Book Details page and create a new Book - CREATE
export function processAddPage(req, res, next) {

    //processes the insertion of a new book into the database
    let newBook = booksModel({
        name: req.body.name,
        author: req.body.author,
        published: req.body.published,
        description: req.body.description,
        price: req.body.price
    });

    booksModel.create(newBook, (err, Book) => {
        
        if(err){
            console.error(err);
            res.end(err);
        };
        //redirect to list page
        res.redirect('/books/list');
    })

}

// GET the Book Details page in order to edit an existing Book
export function displayEditPage(req, res, next) {

    //renders the book details page and uses the id from the URL to select the book 
    //to document to be updated and provides an error msg
    //uses a specific id to find the specific book
    let id = req.params.id;

    booksModel.findById(id, (err, books) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        //redners page with criteria
        res.render('index', { title: 'Edit Book', page: 'books/edit', book: Book });
    });

}

// POST - process the information passed from the details form and update the document
export function processEditPage(req, res, next) {
    //processes the update request of an existing book by using its id property
    let id = req.params.id;

    let newBook = booksModel({
        _id: req.body.id,
        name: req.body.name,
        author: req.body.author,
        published: req.body.published,
        description: req.body.description,
        price: req.body.price
    });

    booksModel.updateOne({_id: id}, newBook, (err, Book) => { 
        if(err) {
            console.error(err);
            res.end(err);
        };
        //redirect back to list page
        res.redirect('/books/list');
    })
}

// GET - process the delete by user id
export function processDelete(req, res, next) {
    //logic that processes the user’s delete request and removes an 
    //existing book from database by using its id property
    let id = req.params.id;

    booksModel.remove({ _id: id }, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        //redirect back to list page
        res.redirect('/books/list');
    })

}