export function mapGenres(genresIds, genresList) {
  return genresIds.length
    ? genresList
      .filter((genre) => genresIds.includes(genre.id))
      .map((genre) => genre.name)
      .join(', ')
    : '';
}

export function cleanFromDuplicates(itemsList, newItems) {
  const newItemsList = [...itemsList];

  for (const item of newItems) {
    if (newItemsList.findIndex((elem) => elem.id === item.id) < 0) {
      newItemsList.push(item);
    }
  }

  return newItemsList;
}
