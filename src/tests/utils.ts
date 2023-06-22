export function mockFetchResponse(data) {
  return { json: () => new Promise((resolve) => resolve(data)) };
}
