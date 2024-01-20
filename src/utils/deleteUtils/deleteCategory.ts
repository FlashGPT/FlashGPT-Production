/**
 * Delete category by Id
 * @param categoryId Id of the category to delete
 * @returns response of the query
 */
export async function deleteCategory(categoryId: string): Promise<Response> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/deleteCategory`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ categoryId: categoryId }),
    },
  );

  return response;
}
