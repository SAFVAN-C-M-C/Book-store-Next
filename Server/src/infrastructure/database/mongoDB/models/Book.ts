import client from "@/infrastructure/elasticsearch";
import { Document, ObjectId, Schema, model } from "mongoose";

interface IBook extends Document {
  _id: ObjectId;
  title: string;
  author: string;
  cover: string;
  publicationYear: number;
  isbn: string;
  description: string;
}

const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    publicationYear: { type: Number, required: true },
    isbn: { type: String, required: true },
    description: { type: String, required: true },
    cover: { type: String, required: false,default:"" },
  },
  {
    timestamps: true,
  }
);


// Create a compound index for the combination of `author` and `title` to be unique
bookSchema.index({ author: 1, title: 1 }, { unique: true });

// Middleware to index a new book
bookSchema.post('save', async function (doc: IBook) {
  await client.index({
    index: 'books',
    id: doc._id.toString(),
    body: {
      title: doc.title,
      author: doc.author,
      publicationYear: doc.publicationYear,
      isbn: doc.isbn,
      description: doc.description,
      cover: doc.cover,
    },
  });
});

// Middleware to delete a book from Elasticsearch before deletion
bookSchema.pre('findOneAndDelete', async function (next) {
  try {
    const doc = await this.model.findOne(this.getQuery()); // Use model to find the document
    if (doc) {
      await client.delete({
        index: 'books',
        id: doc._id.toString(),
      });
    }
    next();
  } catch (err:any) {
    next(err);
  }
});
export const Books = model<IBook>("books",bookSchema);
