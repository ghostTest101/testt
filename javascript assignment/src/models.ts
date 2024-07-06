import { Schema, model } from 'mongoose';

export interface IBookCategory {
  name: string;
}

export interface IBook {
  title: string;
  author: string;
  description: string;
  category: string;
}

const BookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
});
export const Book = model('Book', BookSchema);