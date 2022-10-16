import User from "../db-models/userModel.js";
import Music from "../db-models/musicModel.js";
import generateToken from "../utils/generateToken.js";

// @desc    auth user and get token
// @route   POST api/users/login
// @access  Public
const authUser = async (req, res) => {
  const { email, password, isAdmin } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.json({
      _id: userExists._id,
      name: userExists.name,
      email: userExists.email,
      isAdmin: userExists.isAdmin,
      token: generateToken(userExists._id),
    });
  } else {
    const user = await User.create({
      email,
      password,
      isAdmin,
    });
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }
};

// @desc    get all song in like list
// @route   GET api/users/like
// @access  Public
const getAllLike = async (req, res) => {
  const user = req.user;
  if (user) {
    const ret = [];
    for (const l of user.liked) {
      const music = await Music.findById(l);
      ret.push(music);
    }
    res.json(ret);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};

// @desc    get all songs in dislike list
// @route   GET api/users/dislike
// @access  Public
const getAllDislike = async (req, res) => {
  const user = req.user;
  if (user) {
    const ret = [];
    for (const l of user.disliked) {
      const music = await Music.findById(l);
      ret.push(music);
    }
    res.json(ret);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};

// @desc    add song to like list
// @route   POST api/users/like/:id
// @access  Public
const addLike = async (req, res) => {
  const user = req.user;
  const already = user.liked.indexOf(req.params.id);
  if (already > -1) {
    res.json(user);
  } else {
    const music = await Music.findById(req.params.id);
    if (user) {
      const idx = user.disliked.indexOf(req.params.id);
      console.log(idx);
      if (idx > -1) {
        // only splice array when item is found
        user.disliked.splice(idx, 1); // 2nd parameter means remove one item only
      }
      await user.updateOne({ $push: { liked: music.id } });
      await user.save();
      const uuser = await User.findById(user.id);
      res.json(uuser);
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  }
};

// @desc    add song to dislike list
// @route   POST api/users/dislike/:id
// @access  Public
const addDislike = async (req, res) => {
  const user = req.user;
  const already = user.disliked.indexOf(req.params.id);
  if (already > -1) {
    res.json(user);
  } else {
    const music = await Music.findById(req.params.id);
    if (user) {
      const idx = user.liked.indexOf(req.params.id);
      console.log(idx);
      if (idx > -1) {
        // only splice array when item is found
        user.liked.splice(idx, 1); // 2nd parameter means remove one item only
      }
      await user.updateOne({ $push: { disliked: music.id } });
      await user.save();
      const uuser = await User.findById(user.id);
      res.json(uuser);
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  }
};

export { authUser, getAllLike, getAllDislike, addLike, addDislike };
