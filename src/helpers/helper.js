export function mapGenres(genresIds, genresList) {
  return genresIds.length
    ? genresList
      .filter((genre) => genresIds.includes(genre.id))
      .map((genre) => genre.name)
      .join(', ')
    : '';
}
