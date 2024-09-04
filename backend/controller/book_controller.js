const Book = require("../Model/book_model"); // Destructure removed

const getBook = async (req, res) => {
    try {
        const book= await Book.find(); // Fetch all books
        res.status(200).json(book);  // Send the books in the response
    } catch (error) {
        res.status(500).json({ message: "Error fetching books", error });
    }
};

module.exports = { getBook }; // Export using CommonJS
