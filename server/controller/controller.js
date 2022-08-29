var Bookdb = require('../model/model');

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({message: 'Content cannot be empty!'});
        return;
    };

    const book = new Bookdb({
        title: req.body.title,
        author: req.body.author,
        year: req.body.year,
        genre: req.body.genre,
        type: req.body.type
    });

    book
        .save(book)
        .then(data => {
            res.redirect('/add-book');
        })
        .catch(err => {
            res.status(500).send({message: err.message || 'Error occurred during Create operation.'});
        });
};

exports.find = (req, res) => {
    if (req.query.id) {
        const id = req.query.id;

        Bookdb.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({message: 'Book not found.'});
                } else {
                    res.send(data);
                };
            })
            .catch(err => {
                res.status(500).send({message: err.message || 'Error retrieving book with ID:' + id});
            });
    } else {
        Bookdb.find()
            .then(book => {
                res.send(book);
            })
            .catch(err => {
                res.status(500).send({message: err.message || 'Error occurred during Read operation.'});
            });
    };
};

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({message: 'Data cannot be empty!'});
    };

    const id = req.params.id;

    Bookdb.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then(data => {
            if (!data) {
                res.status(404).send({message: `Unable to update book with ${id}.`});
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({message: err.message || 'Error occurred during Update operation.'});
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Bookdb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({message: `Unable to delete book with ${id}.`});
            } else {
                res.send({message: 'Book successfully deleted.'});
            }
        })
        .catch(err => {
            res.status(500).send({message: err.message || 'Error occurred during Delete operation.'});
        });
};