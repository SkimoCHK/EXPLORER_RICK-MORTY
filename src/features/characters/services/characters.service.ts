import { httpClient } from "../../../core/http/httpClient";
import type { CharactersResponse } from "../models/CharactersResponse";
import type { Character } from "../models/Character";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const charactersService = {
  getCharacters(params: { page?: number; name?: string }) {
    return httpClient<CharactersResponse>(`${BASE_URL}/character`, { params });
  },

  getCharacterById(id: number) {
    return httpClient<Character>(`${BASE_URL}/character/${id}`);
  },
};
