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

type Track = {
  title: string;
  artist: string;
  genres: GenreNames[];
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

export const tracks: Track[] = [
  {
    title: "BOP BOP!",
    artist: "VIVIZ",
    genres: ["댄스/팝", "알앤비/소울"],
  },
  {
    title: "박수",
    artist: "세븐틴(SEVENTEEN)",
    genres: ["댄스/팝"],
  },
  {
    title: "선물",
    artist: "멜로망스(MeloMance)",
    genres: ["인디", "발라드"],
  },
  {
    title: "Next Level",
    artist: "aespa",
    genres: ["댄스/팝"],
  },
  {
    title: "봄여름가을겨울 (Still Life)",
    artist: "BIGBANG (빅뱅)",
    genres: ["댄스/팝"],
  },
  {
    title: "나비와 고양이",
    artist: "볼빨간 사춘기",
    genres: ["인디", "포크/어쿠스틱"],
  },
  {
    title: "That That",
    artist: "싸이 (PSY)",
    genres: ["댄스/팝", "랩/힙합", "알앤비/소울"],
  },
  {
    title: "Dynamite",
    artist: "방탄소년단",
    genres: ["댄스/팝"],
  },
  {
    title: "신호등",
    artist: "이무진",
    genres: ["댄스/팝"],
  },
  {
    title: "FEARLESS",
    artist: "LE SSERAFIM (르세라핌)",
    genres: ["댄스/팝"],
  },
  {
    title: "GANADARA",
    artist: "박재범",
    genres: ["알앤비/소울"],
  },
  {
    title: "하늘 땅 바다만큼",
    artist: "마마무(Mamamoo)",
    genres: ["댄스/팝", "발라드", "알앤비/소울"],
  },
  {
    title: "TOMBOY",
    artist: "(여자)아이들",
    genres: ["댄스/팝", "랩/힙합", "알앤비/소울"],
  },
  {
    title: "GingaMingaYo (the strange world)",
    artist: "Billlie (빌리)",
    genres: ["댄스/팝", "랩/힙합", "알앤비/소울"],
  },
  {
    title: "Tempo",
    artist: "EXO",
    genres: ["댄스/팝"],
  },
  {
    title: "밤편지",
    artist: "아이유(IU)",
    genres: ["발라드"],
  },
  {
    title: "LOVE DIVE",
    artist: "IVE (아이브)",
    genres: ["댄스/팝"],
  },
  {
    title: "Feel My Rhythm",
    artist: "Red Velvet (레드벨벳)",
    genres: ["댄스/팝"],
  },
  {
    title: "INVU",
    artist: "태연 (TAEYEON)",
    genres: ["댄스/팝", "발라드"],
  },
  {
    title: "Alcohol-Free",
    artist: "TWICE (트와이스)",
    genres: ["댄스/팝"],
  },
];
