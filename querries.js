
// Task 2: Basic CRUD
// 1. Find all books in a specific genre
db.books.find({ genre: "Fiction" });

// 2. Find books published after a certain year
db.books.find({ published_year: { $gt: 2010 } });

// 3. Find books by a specific author
db.books.find({ author: "Paulo Coelho" });

// 4. Update the price of a specific book
db.books.updateOne({ title: "Sapiens" }, { $set: { price: 17.99 } });

// 5. Delete a book by its title
db.books.deleteOne({ title: "The Catcher in the Rye" });

// Task 3: Advanced Queries
// 1. Books in stock and published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } });

// 2. Projection
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 });

// 3. Sort by price
db.books.find().sort({ price: 1 }); // ascending
db.books.find().sort({ price: -1 }); // descending

// 4. Pagination (5 per page)
db.books.find().skip(0).limit(5); // page 1
db.books.find().skip(5).limit(5); // page 2

// Task 4: Aggregation
// 1. Average price by genre
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
]);

// 2. Author with most books
db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
]);

// 3. Group by decade
db.books.aggregate([
  { $group: { _id: { $floor: { $divide: ["$published_year", 10] } }, count: { $sum: 1 } } },
  { $project: { decade: { $concat: [{ $toString: { $multiply: ["$_id", 10] } }, "s"] }, count: 1, _id: 0 } }
]);

// Task 5: Indexing
db.books.createIndex({ title: 1 });
db.books.createIndex({ author: 1, published_year: 1 });
db.books.find({ title: "Sapiens" }).explain("executionStats");
