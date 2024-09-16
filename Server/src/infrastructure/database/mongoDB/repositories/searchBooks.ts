import { ElasticsearchHit, IBook } from "@/domain/entities";
import client from "@/infrastructure/elasticsearch";

export const searchBooks = async (query: string): Promise<ElasticsearchHit[]> => {
  try {
    // Perform the search operation
    const result = await client.search({
      index: 'books',
      body: {
        query: {
          multi_match: {
            query,
            fields: ['title', 'author', 'description'],
          },
        },
      },
    });

    // Extract and format hits from the response
    const hits: ElasticsearchHit[] = result.hits.hits
      .filter(hit => hit._id && hit._source) // Ensure _id and _source are defined
      .map(hit => ({
        _id: hit._id as string, // Assert _id is a string
        _source: hit._source as IBook, // Assert _source is of type IBook
      }));

    return hits;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};
