import { createClient } from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";

export const config: any = {
  dataset: process.env.SANITY_STUDIO_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID,
  apiVersion: process.env.SANITY_STUDIO_API_VERSION || "2021-06-07",
  useCdn: process.env.NODE_ENV === "production",
}

export const sanityClient = createClient(config);

export const urlFor = (source: any) => 
  createImageUrlBuilder(config).image(source);
