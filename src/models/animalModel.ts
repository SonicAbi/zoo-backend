import { getPool } from "../db/db.js";
import type { AnimalType } from "../types.js";

export class AnimalModel {
  static async findAll() {
    const query = {
      text: "SELECT * FROM animal",
    };
    const result = await getPool().query(query);
    return result.rows;
  }

  static async addAnimal({
    feedingcost,
    name,
    gender,
    birthDate,
    species,
  }: AnimalType) {
    const query = {
      name: "post-animal",
      text: "INSERT INTO animal(feeding_cost, name, gender, birth_date, species) VALUES ($1, $2, $3, $4, $5)",
      values: [feedingcost, name, gender, birthDate, species],
    };
    try {
      const result = await getPool().query(query);
      return {
        message: "Animal successfully added!",
      };
    } catch (error) {
      console.error(error);
    }
  }

  static async deleteAnimal(id: number) {
    const query = {
      name: "delete-animal",
      text: "DELETE FROM Animal WHERE id = $1",
      values: [id],
    };

    try {
      const result = await getPool().query(query);
      return { message: "Animal succesfully deleted." };
    } catch (error) {
      console.error(error);
    }
  }
}
