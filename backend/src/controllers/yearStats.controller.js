import { scrapeDayDetails } from "../scrapers.js";

export const yearStats = async (req, res) => {
    try {
        const { year, month, day } = req.params;
        const data = await scrapeDayDetails(year, month, day);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}