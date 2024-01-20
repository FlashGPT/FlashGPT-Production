export async function modifyAuthCategory(categoryId: string, authId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/setAuthCategory`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        categoryId: categoryId,
        authId: authId,
      }),
    },
  );

  return response;
}
