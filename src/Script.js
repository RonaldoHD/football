import { useAlert } from './contexts/AlertContext';

export const useFavorites = () => {
  const { showAlert } = useAlert();

  const toggleFavorite = (fixture) => {
    const existing = JSON.parse(localStorage.getItem("favorites") || "[]");
    const index = existing.findIndex((f) => f.fixture.id === fixture.fixture.id);

    let updated;
    if (index !== -1) {
      existing.splice(index, 1);
      showAlert("Removed from favorites");
      updated = existing;
    } else {
      existing.push(fixture);
      showAlert("Added to favorites");
      updated = existing;
    }

    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const isFavorite = (fixtureId) => {
    const existing = JSON.parse(localStorage.getItem("favorites") || "[]");
    return existing.some((f) => f.fixture.id === fixtureId);
  };

  return { toggleFavorite, isFavorite };
};
