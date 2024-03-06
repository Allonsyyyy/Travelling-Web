import { Router } from "express";
import hotelsController from "../Controllers/hotels.js";

const router = Router();

router.get('/list', async (req, res) => {
    const result = await hotelsController.getAllHotels();
    res.status(result.status).json(result);
});

router.get("/getById", async (req, res) => {
    let id = req.query.id;
    const result = await hotelsController.getHotelById(id);
    res.status(result.status).json(result);
});

router.post("/create", async (req, res) => {
    let body = req.body;
    const result = await hotelsController.createHotel(body);
    res.status(result.status).json(result);
});

router.put("/update", async (req, res) => {
    let id = req.query.id;
    let body = req.body;
    const result = await hotelsController.updateHotel(id,body);
    res.status(result.status).json(result);
});

router.delete("/delete", async (req, res) => {
    let id = req.query.id;
    const result = await hotelsController.deleteHotel(id);
    res.status(result.status).json(result);
});

export default router;