import { TData } from "../api";

type TImage = TData<{
  formats: {
    small: { url: string };
    medium: { url: string };
    large: { url: string };
  };
}>;

export type { TImage };
