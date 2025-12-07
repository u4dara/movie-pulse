import { Client, TablesDB, ID, Query } from 'appwrite';

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const TABLE_ID = import.meta.env.VITE_APPWRITE_TABLE_ID;
const ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT;

const client = new Client().setEndpoint(ENDPOINT).setProject(PROJECT_ID);

const database = new TablesDB(client);

export const updateSearchCount = async (searchTerm, movie) => {
   try {
      // 1.Use Appwrite SDK to check if a document with the searchTerm exists in the collection.
      const result = await database.listRows({
         databaseId: DATABASE_ID,
         tableId: TABLE_ID,
         queries: [Query.equal('searchTerm', searchTerm)],
      });

      // 2.If it exists, update the document to increment the search count.
      if (result.rows.length > 0) {
         const record = result.rows[0];
         await database.updateRow({
            databaseId: DATABASE_ID,
            tableId: TABLE_ID,
            rowId: record.$id,
            data: { count: record.count + 1 },
         });

         // 3.If it does not exist, create a new document with the searchTerm.
      } else {
         await database.createRow({
            databaseId: DATABASE_ID,
            tableId: TABLE_ID,
            rowId: ID.unique(),
            data: {
               searchTerm,
               count: 1,
               movie_id: movie.id,
               poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            },
         });
      }
   } catch (e) {
      throw new Error('Failed to update search data in Appwrite.');
   }
};
