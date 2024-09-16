import { Pagination as MuiPagination } from "@mui/material";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ page, totalPages, onPageChange }: PaginationProps) => {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    onPageChange(value);
  };

  return (
    <MuiPagination
      count={totalPages}
      page={page}
      onChange={handleChange}
      color="primary"
      sx={{ mt: 4, display: "flex", justifyContent: "center" }}
    />
  );
};

export default Pagination;
