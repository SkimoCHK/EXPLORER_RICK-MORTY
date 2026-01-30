export interface Character {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  gender: "Female" | "Male" | "Genderless" | "unknown";
  species: string;
  image: string;
  origin: {
    name: string;
  };
  created: string;
}
