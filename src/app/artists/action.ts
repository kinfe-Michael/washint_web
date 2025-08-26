// app/artists/actions.ts

'use server';

export async function getArtists(offset?: number,limit: number = 20) {
  const response = await fetch(
    `http://127.0.0.1:8000/api/public-artists/?limit=${limit}&offset=${offset}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch artists');
  }

  return response.json();
}