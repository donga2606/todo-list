import { TData } from "../api";
import { TAnime } from "./anime";
import { TImage } from "./image";

type TCharacter = TData<{
  name: string;
  anime: TAnime;
  image: { data: TImage };
}>;

export type { TCharacter };
