import {Router} from "express";
const bookRouters = Router();
import {Book} from "../schemas/book.model";
import multer from 'multer';
const upload = multer();

bookRouters.get('/create', (req, res) => {
    res.render('createBook');
});

bookRouters.post('/create', upload.none(), async (req, res) => {
    try {

        //
        // const authorNew = new Author({
        //
        //     name: req.body.author
        //
        // })
            const bookNew = new Book({
                title: req.body.title,
                description: req.body.description,
                author: req.body.author,
            });
            bookNew.keywords.push({keyword: req.body.keyword});
            const book = await bookNew.save();
            if(book) {
                res.render("success");
            } else {
                res.render("error");
            }
        }
    catch
        (err)
        {
            res.render("error");
        }
    }
)
    ;

    bookRouters.post('/update', upload.none(), async (req, res) => {
        try {
            const book = await Book.findOne({_id: req.body.id});
            book.title = req.body.title;
            book.description = req.body.description;
            book.author = req.body.author;
            await book.save();
            if (book) {
                res.render("success");
            } else {
                res.render('error');
            }
        } catch (err) {
            res.render("error");
        }
    });

    bookRouters.get('/list', async (req, res) => {
        try {
            const books = await Book.find();
console.log(books[5].keywords[0].keyword)
            res.render("listBook", {books: books});
        } catch {
            res.render("error");

        }

    });

    bookRouters.get('/update/:id', async (req, res) => {
        try {
            const book = await Book.findOne({_id: req.params.id});
            console.log(book, 'book')
            if (book) {
                res.render('updateBook', {book: book})
            } else {
                res.render('error');
            }
        } catch (err) {
            res.render('error');
        }
    });

    bookRouters.delete('/delete/:id', async (req, res) => {
        try {
            const book = await Book.findOne({_id: req.params.id});
            if (book) {
                await book.remove();
                res.status(200).json({message: 'success'});
            } else {
                res.render('error');
            }
        } catch (err) {
            res.render('error')
        }
    });

    export default bookRouters;

