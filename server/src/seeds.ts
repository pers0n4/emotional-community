type GenreNames =
  | "댄스/팝"
  | "발라드"
  | "랩/힙합"
  | "알앤비/소울"
  | "포크/어쿠스틱"
  | "인디";

type Genre = {
  name: GenreNames;
  path: string;
};

export const genres: Genre[] = [
  {
    name: "댄스/팝",
    path: "dance",
  },
  {
    name: "발라드",
    path: "ballad",
  },
  {
    name: "랩/힙합",
    path: "rnh",
  },
  {
    name: "알앤비/소울",
    path: "rns",
  },
  {
    name: "포크/어쿠스틱",
    path: "folk",
  },
  {
    name: "인디",
    path: "indie",
  },
];
