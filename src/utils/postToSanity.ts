/**
 * Basic function to send a post request to sanity
 * @param mutations mutations to send
 * @param returnIds whether to return ids in the response, default=true
 * @returns a promise of a response
 */
export function postToSanity(
  mutations: any,
  isReturnIds: boolean = true,
  isDryRun: boolean = false,
): Promise<Response> {
  const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
  const datasetName = process.env.SANITY_STUDIO_DATASET;
  const apiVersion = process.env.SANITY_STUDIO_API_VERSION;
  const tokenWithWriteAccess = process.env.SANITY_STUDIO_API_TOKEN;

  return fetch(
    `https://${projectId}.api.sanity.io/v${apiVersion}/data/mutate/${datasetName}?returnIds=${isReturnIds}`,
    {
      method: "post",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${tokenWithWriteAccess}`,
      },
      body: JSON.stringify({ mutations }),
    },
  );
}
