"use server";

import connectMongoDB, { getDBConnection } from "./connection";

export const getGridFSBucket = async () => {
  await connectMongoDB()
  const conn = await getDBConnection();
  return conn.gridfsBucket;
};

export default getGridFSBucket;
