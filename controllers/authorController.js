const { body, validationResult } = require("express-validator");
const Author = require("../models/author");

exports.author_list = function (req, res) {
  res.send("NOT IMPLEMENTED: Author list");
};

exports.author_detail = function (req, res) {
  res.send("NOT IMPLEMENTED: Author detail: " + req.params.id);
};

// Display Author create form on GET.
exports.author_create_get = function (req, res, next) {
  res.render("author_form", { title: "Create Author" });
};

exports.author_create_post = [
  body("first_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("First name must be specified.")
    .isAlphanumeric()
    .withMessage("First name has non-alphanumeric characters."),
  body("family_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Family name must be specified.")
    .isAlphanumeric()
    .withMessage("Family name has non-alphanumeric characters."),
  body("date_of_birth", "Invalid date of birth")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),
  body("date_of_death", "Invalid date of death")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render('author_form', {title: 'Create Author', author: req.body, errors:errors.array()})
      return;
    } else {
      const author = new Author(
        {
          first_name: req.body.first_name,
          family_name: req.body.family_name,
          date_of_birth: req.body.date_of_birth,
          date_of_death: req.body.date_of_death,
        }
      );
      author.save(function(err) {
        if(err) {return next(err)}
        res.redirect(author.url);
      })
    }
  }
];

exports.author_delete_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Author delete GET");
};

exports.author_delete_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Author delete GET");
};

exports.author_update_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Author update GET");
};

exports.author_update_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Author update POST");
};
