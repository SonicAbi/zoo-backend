import { Hono } from "hono";
import { AnimalModel } from "../models/animalModel.js";
import type { AnimalType } from "../types.js";

export const animalRouter = new Hono()

animalRouter.get('/', async (c) => {
    const allAnimals = await AnimalModel.findAll()
    try {
        return c.json({
            data: allAnimals
        }, 200)
    } catch (error) {
        console.error(error)
        return c.json({ error: error }, 400);
    }

})

animalRouter.post('/', async (c) => {
    try {
        const newAnimal: AnimalType = await c.req.json()
        const addAnimal = await AnimalModel.addAnimal(newAnimal)
        return c.json({... addAnimal, data: newAnimal}, 200)
    } catch (error) {
        console.error(error)
        return c.json({error:error}, 400)
    }
})

animalRouter.delete('/:id', async (c) => {
    try {
        const animalID = parseInt(c.req.param('id'))
        const dellAnimal = await AnimalModel.deleteAnimal(animalID)
        return c.json({message: "Animal succesfully deleted"}, 200)
    } catch (error) {
        console.error(error)
        return c.json({ error: error }, 400)
    }
})
