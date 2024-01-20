/**
 * Checks if the provider is valid
 * @param providerName name of the provider
 * @returns boolean of whether the provider is valid
 */
export function checkValidProvider(providerName: string) {
  const providers = ["google", "github"];
  return providers.includes(providerName);
}
