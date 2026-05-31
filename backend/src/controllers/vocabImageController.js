import VocabImage from "../models/VocabImage.js";

const UNSPLASH_KEY = process.env.UNSPLASH_ACCESS_KEY;

// GET /api/vocab-images/:level — return all cached images for a level
export const getImages = async (req, res) => {
  try {
    const images = await VocabImage.find({ level: req.params.level });
    const map = {};
    images.forEach(img => { map[img.word] = img.imageUrl; });
    res.json(map);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// POST /api/vocab-images/fetch — fetch + cache one image
export const fetchImage = async (req, res) => {
  const { word, level } = req.body;
  if (!word || !level) return res.status(400).json({ error: "word and level required" });

  // ADD THIS LOG
  console.log("UNSPLASH_KEY present:", !!process.env.UNSPLASH_ACCESS_KEY);
  console.log("Fetching image for word:", word, "level:", level);
  
  try {
    // Return cached if exists
    const cached = await VocabImage.findOne({ word, level });
    if (cached) return res.json({ imageUrl: cached.imageUrl });

    if (!UNSPLASH_KEY) return res.status(500).json({ error: "UNSPLASH_ACCESS_KEY not set" });

    // Strip German articles for better search (der/die/das)
    const searchWord = word.replace(/^(der|die|das|ein|eine)\s+/i, "").trim();

    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(searchWord)}&per_page=1&orientation=landscape`,
      { headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` } }
    );

    if (!response.ok) throw new Error(`Unsplash error: ${response.status}`);

    const data = await response.json();
    const imageUrl = data?.results?.[0]?.urls?.regular;

    if (!imageUrl) return res.status(404).json({ error: "No image found" });

    // Save to MongoDB
    await VocabImage.create({ word, level, imageUrl });

    res.json({ imageUrl });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};