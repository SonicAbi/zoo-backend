export type AnimalType = {
  feedingcost: number;
  name: string;
  birthDate: string;
  gender: string;
  species: string;
  veterinarianID?: number;
  enclosureID?: number;
};

export type EnclosureType = {
  name: string;
  cost: number;
  size: number;
}