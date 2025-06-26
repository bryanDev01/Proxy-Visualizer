import { scrapeTopSites } from "../scrapers.js";

export const topSitesStats = async (req, res) => {
    try {
        const { mode } = req.params;
        const data = await scrapeTopSites(mode);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}