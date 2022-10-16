import Music from "../db-models/musicModel.js";

// @desc    Fetch all music
// @route   GET /api/music
// @access  Public
const getMusic = async (req, res) => {
  const music = await Music.find({});

  res.json(music);
};

// @desc    Fetch single product
// @route   GET /api/music/:id
// @access  Public
const getMusicById = async (req, res) => {
  const music = await Music.findById(req.params.id);

  if (music) {
    res.json(music);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
};

// @desc    Delete a product
// @route   DELETE /api/music/:id
// @access  Private/Admin
const deleteMusic = async (req, res) => {
  const music = await Music.findById(req.params.id);
  if (music) {
    await music.remove();
    res.json({ message: "music removed" });
  } else {
    res.status(404);
    throw new Error("music not found");
  }
};

// @desc    Create music
// @route   POST /api/music
// @access  Private/Admin
const createMusic = async (req, res) => {
  const music = new Music({
    title: "sample title",
    artist: "sample artist",
    album: "sample album",
    genre: "sample genere",
    description: "sample disc",
    postedBy: req.user._id,
  });

  const createdMusic = await music.save();
  res.status(201).json(createdMusic);
};

// @desc    Update a music
// @route   PUT /api/music/:id
// @access  Private/Admin
const updateMusic = async (req, res) => {
  const music = await Music.findById(req.params.id);

  if (music) {
    music.title = req.body.title || music.title;
    music.artist = req.body.artist || music.artist;
    music.album = req.body.album || music.album;
    music.genre = req.body.genere || music.genre;
    music.description = req.body.description || music.description;

    const updatedMusic = await music.save();

    res.json(updatedMusic);
  } else {
    res.status(404);
    throw new Error("Music not found");
  }
};

export { getMusic, getMusicById, deleteMusic, createMusic, updateMusic };
