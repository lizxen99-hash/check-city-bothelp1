export default async function handler(req, res) {
  try {
    const { city } = req.body;

    if (!city) {
      return res.status(400).json({ result: "no", error: "no city provided" });
    }

    // 🔗 ВСТАВЬ СВОЮ ССЫЛКУ НА GOOGLE SHEETS
    const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQsZp8PjW_zRR4em-wEsk-5XwyHtQNeeK8wQELIR5P3yfzf4bOjO0O1pPzdLKYe1cHsWayfH4A4KyBv/pub?output=csv";

    const response = await fetch(SHEET_URL);
    const csv = await response.text();

    // Преобразуем CSV в список строк
    const list = csv
      .split("\n")
      .map(c => c.trim().toLowerCase())
      .filter(Boolean);

    // Проверяем совпадение
    const found = list.some(item => item === city.toLowerCase().trim());

    return res.status(200).json({ result: found ? "yes" : "no" });
  } catch (error) {
    console.error("Ошибка:", error);
    return res.status(500).json({ result: "error", details: error.message });
  }
}
