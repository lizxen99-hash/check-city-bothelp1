export default async function handler(req, res) {
  try {
    const city = req.query.city || (req.body && req.body.city);
    if (!city) {
      return res.status(400).json({ result: "error", details: "Не указан город" });
    }

    const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQsZp8PjW_zRR4em-wEsk-5XwyHtQNeeK8wQELIR5P3yfzf4bOjO0O1pPzdLKYe1cHsWayfH4A4KyBv/pub?output=csv";
    const response = await fetch(sheetUrl);
    const text = await response.text();
    const rows = text.split("\n").map(r => r.trim().toLowerCase());
    const exists = rows.includes(city.toLowerCase());

    // 🔹 Ключевой момент — возвращаем ответ в строковом формате:
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify({
      result: "ok",
      city,
      exists: exists ? "true" : "false"   // 👈 делаем строкой
    }));
  } catch (error) {
    res.status(500).send(JSON.stringify({
      result: "error",
      details: error.message
    }));
  }
}
