import { getPool } from "../db/db.js";
import type { EnclosureType } from "../types.js";

export class EnclosureModel {
  static async findAll() {
    const query = {
      name: "find-all-enclo",
      text: "SELECT * FROM enclosure",
    };
    const result = await getPool().query(query);
    return result.rows;
  }
  static async addEnclosure({ cost, name, size }: EnclosureType) {
    const query = {
      name: "add-enclosure",
      text: "INSERT INTO enclosure(cost, name, size) VALUES ($1, $2, $3)",
      values: [cost, name, size],
    };
    try {
      getPool().query(query);
      return "Enclosure successfully added.";
    } catch (error) {
      return error;
    }
  }

  static async deleteEnclosure(id: number) {
    const query = {
      name: "delete-enclosure",
      text: "DELETE FROM enclosure WHERE id = $1",
      values: [id],
    };
    try {
      getPool().query(query);
      return "Enclosure successfully deleted.";
    } catch (error) {
      return error;
    }
  }
}
