import { ElasticsearchHit } from "@/domain/entities";
import { Card, CardContent, Typography, CardMedia } from "@mui/material";
import { useRouter } from "next/navigation";

interface SearchBookCardProps {
  book: ElasticsearchHit;
}

const SearchBookCard = ({ book }: SearchBookCardProps) => {
  
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
        image={book._source.cover || "/default-cover.jpg"}
        alt={`${book._source.title} cover`}
      />
      <CardContent>
        <Typography variant="h6">{book._source.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          by {book._source.author}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Published in {book._source.publicationYear}
        </Typography>
      </CardContent>
    </Card>
    </>
  );
};

export default SearchBookCard;
