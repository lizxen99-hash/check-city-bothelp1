export default async function handler(req, res) {
  try {
    // Получаем город из query или body
    const city = req.query.city || (req.body && req.body.city);

    if (!city) {
      return res.status(400).json({ result: "error", details: "Не указан город" });
    }

    // Ссылка на опубликованную Google-таблицу (CSV)
    const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQsZp8PjW_zRR4em-wEsk-5XwyHtQNeeK8wQELIR5P3yfzf4bOjO0O1pPzdLKYe1cHsWayfH4A4KyBv/pub?output=csv";

    // Загружаем CSV из таблицы
    const response = await fetch(sheetUrl);
    const text = await response.text();

    // Преобразуем список городов
    const rows = text.split("\n").map(r => r.trim().toLowerCase());
    const exists = rows.includes(city.toLowerCase());

    // Возвращаем результат
    res.status(200).json({
      result: "ok",
      city,
      exists
    });
  } catch (error) {
    res.status(500).json({ result: "error", details: error.message });
  }
}
