import { scrapeMainPage } from "../scrapers.js";

export const dailyStats = async (req, res) => {
    try {
        const data = await scrapeMainPage();
        console.log("Esta es la data obtenida de la pagina", data)
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}