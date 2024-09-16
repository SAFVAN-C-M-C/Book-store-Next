import client from "@/infrastructure/elasticsearch";

const createIndex = async () => {
  try {
    await client.indices.create({
      index: "books",
      body: {
        mappings: {
          properties: {
            title: { type: "text" },
            author: { type: "text" },
            publicationYear: { type: "integer" },
            isbn: { type: "keyword" },
            description: { type: "text" },
            cover: { type: "text" },
          },
        },
      },
    });
    console.log("Index created");
  } catch (err: any) {
    if (err.meta.body.error.type === "resource_already_exists_exception") {
      console.log("Index already exists");
    } else {
      console.error("Error creating index:", err);
    }
  }
};

createIndex();
