type TData<T> = {
  id: number;
  attributes: T;
};

type TApiReponse<T> = {
  data: T;
};

export type { TData, TApiReponse };
