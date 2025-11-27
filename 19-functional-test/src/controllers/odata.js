const { queryBooks } = require('../services/books');

function getBooks(req, res) {
  const { $filter, $select, $orderby, $top, $skip } = req.query;

  const { value, count, applied } = queryBooks({
    filter: $filter,
    select: $select,
    orderby: $orderby,
    top: $top,
    skip: $skip,
  });

  return res.status(200).json({ value, count, applied });
}

function getRoot(req, res) {
  return res.status(200).json({
    message: 'Mini API OData-like. Usa /odata/books con $filter, $select, $orderby, $top, $skip.',
    example: '/odata/books?$filter=rating gt 4.5&$select=title,rating',
  });
}

module.exports = { getBooks, getRoot };
