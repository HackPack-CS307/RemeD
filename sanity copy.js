import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "@sanity/client";

const client = createClient({
  projectId: "projId",
  dataset: "production",
  useCdn: true,
  apiVersion: "2021-10-21",
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);

// RUN this to add exception for localhost 3000 CORS policy
// sanity cors add https://localhost:3000

export default client;
