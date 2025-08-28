// app/artists/actions.ts

'use server';

export async function getArtists(offset?: number) {
  const response = await fetch(
    `http://127.0.0.1:8000/api/public-artists/?limit=${10}&offset=${offset}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch artists');
  }

  return response.json();
}