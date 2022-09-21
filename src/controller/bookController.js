const BookModel = require('../model/booksModel')

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
        let allBooks = await BookModel.find({ $and: [queries, { isDeleted: false }] }).select({ title: 1, excerpt: 1, userId: 1, category: 1, releasedAt: 1, reviews: 1 });
        if (allBooks.length == 0) return res.status(404).send({ status: false, msg: "No book found" });;
        return res.status(200).send({ status: true, data: allBooks });
    } catch (error) {
        res.status(500).send({ status: false, error: error.message });
    }
}

///////////////////////////////////////////////////// grtBooks by Id //////////////////////////////////////////////////////

// const getBooksById = async function(req, res) {
//     try {

//     }
// }

module.exports = { createBook, getBooks }