import { Genre } from "./genres/entities/genre.entity";

export const genres = [
  {
    name: "댄스/팝",
    path: "dance",
  },
  {
    name: "발라드",
    path: "ballad",
  },
  {
    name: "알앤비/소울",
    path: "rnb",
  },
  {
    name: "포크/어쿠스틱",
    path: "folk",
  },
  {
    name: "인디",
    path: "indie",
  },
].map(({ name, path }) => {
  const genre = new Genre();
  genre.name = name;
  genre.path = path;
  return genre;
});
