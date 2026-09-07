import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";

export const getSuggestConnections = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id).select("connections");
    const connections = currentUser?.connections || [];
    const suggestedUser = await User.find({
      _id: { $nin: [...connections, req.user._id] },
    })
      .select("name username profilePicture headline")
      .limit(4);
    res.status(200).json(suggestedUser);
  } catch (error) {
    console.error("Error fetching suggested connections:", error);
    res.status(500).json({ message: "Error fetching suggested connections" });
  }
};

export const searchUsers = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query || !query.trim()) {
      return res.status(200).json([]);
    }

    const searchRegex = new RegExp(query.trim(), "i");

    const users = await User.find({
      $or: [
        { name: searchRegex },
        { username: searchRegex },
        { headline: searchRegex },
        { skills: searchRegex },
      ],
    })
      .select("name username profilePicture headline location connections")
      .limit(20);

    res.status(200).json(users);
  } catch (error) {
    console.error("Error searching users:", error);
    res.status(500).json({ message: "Error searching users" });
  }
};

export const getPublicProfile = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).select(
      "-password",
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching public profile:", error);
    res.status(500).json({ message: "Error fetching public profile" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const allowedFields = [
      "name",
      "profilePicture",
      "bannerImg",
      "headline",
      "location",
      "about",
      "skills",
      "experience",
      "education",
      "username",
      "certifications",
    ];

    const updatedData = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updatedData[field] = req.body[field];
      }
    }

    if(req.body.profilePicture) {
        const result = await cloudinary.uploader.upload(req.body.profilePicture);
        updatedData.profilePicture = result.secure_url;
    }

    if(req.body.bannerImg) {
        const result = await cloudinary.uploader.upload(req.body.bannerImg);
        updatedData.bannerImg = result.secure_url;
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updatedData },
      { new: true },
    ).select("-password");

    res.json(user);

  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Error updating profile" });
  }
};
