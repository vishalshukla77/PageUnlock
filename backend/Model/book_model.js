const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    image: String,
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;  // Use module.exports to export the Book model
