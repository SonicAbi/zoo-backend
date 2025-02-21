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
};

export type StaffType = {
  name: string;
  role: string | Role;
  salary: number;
};

export enum Role {
  zookeeper = "zookeeper",
  veterinarian = "veterinarian",
  seller = "seller",
  regular = "regular",
}
