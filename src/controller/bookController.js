const BookModel = require('../model/booksModel')
const ReviewModel = require('../model/reviewModel')
const ObjectId = require('mongoose').Types.ObjectId


/////////////////////////////////////////////////// Create Book /////////////////////////////////////////////////////////////

const createBook = async function(req, res) {
    try{
        const data = req.body
        const savedData = await BookModel.create(data)
        return res.status(201).send( {status: true, msg: savedData })
    } catch (error) {
        return res.status(500).send({ status: false, error: error.message })
    }  
}

////////////////////////////////////////////// getBooks By Filter ///////////////////////////////////////////////////////////

const getBooks = async (req, res) => {
    try {
        let queries = req.query;
        let allBooks = await BookModel.find({ $and: [queries, { isDeleted: false }] }).select({ title: 1, excerpt: 1, userId: 1, category: 1, releasedAt: 1, reviews: 1 }).sort({ title: 1 });
        if (allBooks.length == 0) return res.status(404).send({ status: false, msg: "No book found" });;
        return res.status(200).send({ status: true, data: allBooks });
    } catch (error) {
        res.status(500).send({ status: false, error: error.message });
    }
}

///////////////////////////////////////////////////// grtBooks by Id //////////////////////////////////////////////////////

const getBooksById = async function(req, res) {
    try {
        let bookId = req.params.bookId
        
        if (!ObjectId.isValid(bookId)) return res.status(400).send({ status: false, msg: "Invalid bookId" })

        let bookDetails = await BookModel.findById(bookId)
        if (!bookDetails || bookDetails.isDeleted === true ) {
            return res.status(400).send({ status: false, msg: "Book not found" })
        }

        let reviewDetails = await ReviewModel.find({ bookId: bookDetails._id, isDeleted: false });
    
  
      let bookDetails_withReview = { bookDetails, reviewsData: reviewDetails }
  
      return res.status(200).send({ status: true, data: bookDetails_withReview });
    } catch (error) {
      return res.status(500).send({ msg: error.message });
    }
}

module.exports = { createBook, getBooks, getBooksById }