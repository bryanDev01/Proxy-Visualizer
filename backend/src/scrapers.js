import axios from "axios";
import * as cheerio from "cheerio";

// Función para hacer scraping de la página principal
export async function scrapeMainPage() {
  try {
    const response = await axios.get("https://internetapn.idsvc.alinet.cu/");
    const $ = cheerio.load(response.data);

    // Extraer datos de la tabla principal
    const dailyStats = [];
    $("table.stat tbody tr").each((i, row) => {
      // Ignorar la fila de totales
      if ($(row).hasClass("total")) return;

      const date = $(row).find("td").eq(0).text().trim();
      const users = $(row).find("td").eq(1).text().trim();
      const exceeded = $(row).find("td").eq(2).text().trim();
      const bytes = $(row).find("td").eq(3).text().trim();
      const average = $(row).find("td").eq(4).text().trim();
      const hitPercentage = $(row).find("td").eq(5).text().trim();

      if (date && users) {
        dailyStats.push({
          date,
          users: parseInt(users),
          exceeded: parseInt(exceeded),
          bytes,
          average,
          hitPercentage,
          detailUrl: $(row).find("td").eq(0).find("a").attr("href"),
        });
      }
    });

    // Extraer datos de sitios top
    const topSites = {
      year: $('table.sites a[href*="topsites.cgi?mode=year"]').attr("href"),
      month: $('table.sites a[href*="topsites.cgi?mode=month"]').attr("href"),
    };

    // Extraer información del período
    const period = $("h2").text().trim();

    return {
      period,
      dailyStats,
      topSites,
    };
  } catch (error) {
    console.error("Error scraping main page:", error);
    throw error;
  }
}

// Función para obtener detalles de un día específico
export async function scrapeDayDetails(year, month, day) {
  try {
    const response = await axios.get(
      `https://internetapn.idsvc.alinet.cu/day_detail.cgi?year=${year}&month=${month}&day=${day}`
    );
    const $ = cheerio.load(response.data);

    const ipDetails = [];
    $("table.stat tbody tr").each((i, row) => {
      if ($(row).hasClass("total")) return;

      const ip = $(row).find("td").eq(0).text().trim();
      const bytes = $(row).find("td").eq(1).text().trim();
      const sites = $(row).find("td").eq(2).text().trim();

      if (ip) {
        ipDetails.push({
          ip,
          bytes,
          sites: parseInt(sites),
          detailUrl: $(row).find("td").eq(0).find("a").attr("href"),
        });
      }
    });

    return ipDetails;
  } catch (error) {
    console.error("Error scraping day details:", error);
    throw error;
  }
}

// Función para obtener sitios top
export async function scrapeTopSites(mode = "month") {
  try {
    const response = await axios.get(
      `https://internetapn.idsvc.alinet.cu/topsites.cgi?mode=${mode}`
    );
    const $ = cheerio.load(response.data);

    const topSites = [];
    $("table.stat tbody tr").each((i, row) => {
      if ($(row).hasClass("total")) return;

      const site = $(row).find("td").eq(0).text().trim();
      const hits = $(row).find("td").eq(1).text().trim();
      const bytes = $(row).find("td").eq(2).text().trim();

      if (site) {
        topSites.push({
          site,
          hits: parseInt(hits),
          bytes,
        });
      }
    });

    return topSites;
  } catch (error) {
    console.error("Error scraping top sites:", error);
    throw error;
  }
}
