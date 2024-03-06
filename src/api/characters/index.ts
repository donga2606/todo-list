import { TCharacter } from "@/types/entities/character";
import instance from "../instance";
import { TApiReponse } from "@/types/api";

async function get() {
  try {
    const response =
      await instance.get<TApiReponse<TCharacter[]>>("characters");
    return response;
  } catch (error) {
    console.error(error);
  }
}

async function getById(id: number) {
  try {
    const response = await instance.get<TApiReponse<TCharacter>>(
      `characters/${id}?populate=image`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}

const characters = {
  get,
  getById,
};

export { characters };
