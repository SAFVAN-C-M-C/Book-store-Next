import { IBook } from "@/domain/entities";
import { Card, CardContent, Typography, CardMedia } from "@mui/material";
import { useRouter } from "next/navigation";

interface BookCardProps {
  book: IBook;
}

const BookCard = ({ book }: BookCardProps) => {
  
    const router = useRouter();

    const handleClick = () => {
      router.push(`/books/${book._id}`);
    };
  return (
    <>
    <Card onClick={handleClick} style={{ cursor: 'pointer' }}>
      <CardMedia
        component="img"
        height="140"
        image={book.cover || "/default-cover.jpg"}
        alt={`${book.title} cover`}
      />
      <CardContent>
        <Typography variant="h6">{book.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          by {book.author}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Published in {book.publicationYear}
        </Typography>
      </CardContent>
    </Card>
    </>
  );
};

export default BookCard;
