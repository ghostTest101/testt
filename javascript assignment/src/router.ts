import express from 'express';
import { Book } from './models';

const router = express.Router();

// Get all books
router.get('/books', async (req, res) => {
  try {
    const { category, page, limit } = req.query;
    const query: any = {};
    if (category) {
      query.category = category;
    }
    const books = await Book.find(query)
      .skip((parseInt(page as string) - 1) * parseInt(limit as string))
      .limit(parseInt(limit as string));
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching books' });
  }
});

// Create a new book
router.post('/books', async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating book' });
  }
});

// Update an existing book
router.put('/books/:id', async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(updatedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating book' });
  }
});

// Soft delete an existing book
router.delete('/books/:id', async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true });
    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting book' });
  }
});

export default router;