import axios from "axios";
import { config, URL } from "./bookService";


export const getSignedUrl = async (
): Promise<{ url: string; media: string }> => {
  const { data } = await axios.get(
    `${URL}/api/get/signedUrl`,
    config
  );
  console.log(data);
  
  return data.data;
};
