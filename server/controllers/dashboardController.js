const Note = require("../models/Notes");
const mongoose = require("mongoose");

/**
 * GET /
 * Dashboard
 */
exports.dashboard = async (req, res) => {
  try {
    const perPage = 12;
    const page = req.query.page || 1;
    const userId = new mongoose.Types.ObjectId(req.user.id); // ✅ FIXED: Added 'new'

    const notes = await Note.aggregate([
      { $match: { user: userId } },
      { $sort: { updatedAt: -1 } },
      {
        $project: {
          title: { $substr: ["$title", 0, 30] },
          body: { $substr: ["$body", 0, 100] },
        },
      },
    ])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await Note.countDocuments({ user: userId });

    res.render("dashboard/index", {
      userName: req.user.firstName,
      notes,
      layout: "../views/layouts/dashboard",
      current: page,
      pages: Math.ceil(count / perPage),
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET / View Specific Note
 */
exports.dashboardViewNote = async (req, res) => {
  try {
    const noteId = new mongoose.Types.ObjectId(req.params.id); // ✅ FIXED: Added 'new'
    const userId = new mongoose.Types.ObjectId(req.user.id); // ✅ FIXED: Added 'new'

    const note = await Note.findOne({ _id: noteId, user: userId }).lean();

    if (note) {
      res.render("dashboard/view-note", {
        noteID: req.params.id,
        note,
        layout: "../views/layouts/dashboard",
      });
    } else {
      res.send("Something went wrong.");
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * PUT / Update Specific Note
 */
exports.dashboardUpdateNote = async (req, res) => {
  try {
    const noteId = new mongoose.Types.ObjectId(req.params.id); // ✅ FIXED: Added 'new'
    const userId = new mongoose.Types.ObjectId(req.user.id); // ✅ FIXED: Added 'new'

    await Note.findOneAndUpdate(
      { _id: noteId, user: userId },
      { title: req.body.title, body: req.body.body, updatedAt: Date.now() }
    );

    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
};

/**
 * DELETE / Delete Note
 */
exports.dashboardDeleteNote = async (req, res) => {
  try {
    const noteId = new mongoose.Types.ObjectId(req.params.id); // ✅ FIXED: Added 'new'
    const userId = new mongoose.Types.ObjectId(req.user.id); // ✅ FIXED: Added 'new'

    await Note.deleteOne({ _id: noteId, user: userId });

    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET / Add Notes
 */
exports.dashboardAddNote = async (req, res) => {
  res.render("dashboard/add", {
    layout: "../views/layouts/dashboard",
  });
};

/**
 * POST / Add Notes
 */
exports.dashboardAddNoteSubmit = async (req, res) => {
  try {
    req.body.user = new mongoose.Types.ObjectId(req.user.id); // ✅ FIXED: Added 'new'
    await Note.create(req.body);
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET / Search
 */
exports.dashboardSearch = async (req, res) => {
  try {
    res.render("dashboard/search", {
      searchResults: "",
      layout: "../views/layouts/dashboard",
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * POST / Search For Notes
 */
exports.dashboardSearchSubmit = async (req, res) => {
  try {
    const searchTerm = req.body.searchTerm;
    const searchNoSpecialChars = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const userId = new mongoose.Types.ObjectId(req.user.id); // ✅ FIXED: Added 'new'

    const searchResults = await Note.find({
      user: userId,
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChars, "i") } },
        { body: { $regex: new RegExp(searchNoSpecialChars, "i") } },
      ],
    });

    res.render("dashboard/search", {
      searchResults,
      layout: "../views/layouts/dashboard",
    });
  } catch (error) {
    console.log(error);
  }
};