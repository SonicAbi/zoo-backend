import { faker, fakerDE } from "@faker-js/faker";
import { getClient } from "./db.js";
import type { QueryConfig } from "pg";
import type { AnimalType } from "../types.js";


const ANIMAL_NUMBER = 56

function generateAnimals(n: number): AnimalType[] {
  let animals: AnimalType[] = [];
  for (let i = 0; i < n; i++) {
    const getRandomGender = () => (Math.random() < 0.5 ? "male" : "female");
      animals.push({
          name: fakerDE.animal.petName(),
        birthDate: fakerDE.date.birthdate().toISOString(),
        gender: getRandomGender(),
        species: fakerDE.animal.type(),
        feedingcost: faker.number.int(100)
    });
  }
  return animals;
}


async function seed() {
  try {
    // Connect to the database
    const db = getClient();
    await db.connect();

    console.info("🔌 Connected to the Database.");

    // Generate subscribers
    const animals = generateAnimals(ANIMAL_NUMBER)

    // Generate placeholders ($1, $2, ..., $N usw.)
    const values = animals.flatMap((s) => [s.name, s.birthDate, s.feedingcost, s.gender, s.species]);
    const placeholders = animals
      .map(
        (_, i) =>
          `($${i * 5 + 1}, $${i * 5 + 2}, $${i * 5 + 3}, $${i * 5 + 4}, $${i * 5 + 5})`
      )
      .join(",");
    //@ * 4 because we have 4 values per subscriber and we need to skip to the next subscriber

    // Build the bulk insert query
    const query: QueryConfig = {
      text: `INSERT INTO animal (name, birth_date, feeding_cost, gender, species) VALUES ${placeholders}`,
      values,
    };

    // Execute the query
    await db.query(query);

    // Now, let's seed the newsletter table
    // const news = generateNewsletter();
    // const newsValues = news.flatMap((n) => [
    //   n.author,
    //   n.category,
    //   n.content,
    //   n.created_at,
    //   n.updated_at,
    // ]);
    // const newsPlaceholders = news
    //   .map(
    //     (_, i) =>
    //       `($${i * 5 + 1}, $${i * 5 + 2}, $${i * 5 + 3}, $${i * 5 + 4}, $${
    //         i * 5 + 5
    //       })`
    //   )
    //   .join(",");

    // const newsQuery: QueryConfig = {
    //   text: `INSERT INTO newsletter (author, category, content, created_at, updated_at) VALUES ${newsPlaceholders}`,
    //   values: newsValues,
    // };

    // await db.query(newsQuery);

    // // Now connect the subscribers to the newsletters
    // const subscriberNewsletter: QueryConfig = {
    //   text: `INSERT INTO subscriber_newsletter (newsletter, subscriber) SELECT (SELECT id FROM NEWSLETTER ORDER BY random() LIMIT 1), id FROM subscriber`,
    // };

    // await db.query(subscriberNewsletter);

    console.info("🌱 Seeding completed.");
  } catch (error) {
    console.error("🚨 Seeding failed.", error);
  } finally {
    // Close the connection
    getClient().end();
    console.info("🔌 Disconnected from the Database.");
  }
}

seed();
