// import admin from "../model/adminModel.js";
import User from "../model/userModel.js";

//login getMethod
export const adminLog = async (req, res) => {
  res.render("adminLogin");
};

// Login postMethod
export const adminVerify = async (req, res) => {
  try {
    const admin = {
      name: "admin",
      email: "admin@gmail.com",
      password: "admin123",
    };

    const { name, email, password } = req.body;
    let errorMessage = "";
    if (email !== admin.email) {
      errorMessage += "Admin not found!";
      return res.render("adminLogin", { errorMessage });
    }

    if (name != admin.name || password != admin.password) {
      errorMessage =
        "Invalid credentials! Please check your name and password.";
      return res.render("adminLogin", { errorMessage });
    }

    req.session.admin = true;
    res.cookie("admin", admin.name);

    return res.redirect("/admin/panel");
  } catch (error) {
    return res.render("adminLogin", { errorMessage: "Something went wrong!" });
  }
};

//Admin Panel
export const adminPanel = async (req, res) => {
  try {
    const user = await User.find().sort({ name: 1 });
    res.render("adminPanel", { user });
  } catch (error) {
    console.log(error);
  }
};

//Admin Search
export const search = async (req, res) => {
  try {
    const { search } = req.body;
    const searchData = await User.find({
      name: { $regex: search, $options: "i" },
      email: { $regex: search, $options: "i" },
    });

    if (searchData.length == 0) {
      let userNotFound = "User not Found";
      return res.render("adminSearch", { userNotFound });
    } else {
      res.render("adminSearch", { searchData });
    }
  } catch (error) {
    console.log(error);
  }
};

//Admin Edit
export const editUser = async (req, res) => {
  try {
    const id = req.params.userId;
    const userData = await User.findById(id);
    console.log(userData);
    if (!userData) {
      console.log("User not found for edit");
    }
    res.render("adminEdit", { userData });
  } catch (error) {
    console.log(error);
  }
};

//Admin update
export const updateUser = async (req, res) => {
  try {
    const id = req.params.userId;
    const updateData = req.body;
    const user = await User.findByIdAndUpdate(id, updateData, { new: true });
    if (!user) {
      console.log("Can't update User data!");
    }
    res.redirect("/admin/panel");
  } catch (error) {
    console.log(error);
  }
};

//Admin Delete
export const deleteUser = async (req, res) => {
  try {
    const id = req.params.userId;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      console.log("User not Found to delete");
    }
    res.redirect("/admin/panel");
  } catch (error) {
    console.log(error);
  }
};

// Admin Create
export const createUser = async (req, res) => {
  res.render("adminCreate");
};

export const newUser = async (req, res) => {
  try {
    const { email } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      console.log("user already exist");
      return res.render("adminCreate");
    }
    const newUser = new User(req.body);
    await newUser.save();
    res.redirect("/admin/panel");
  } catch (error) {
    console.log(error);
  }
};

export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      return res.redirect("/admin/panel");
    }
    // Clear the admin cookie
    res.clearCookie("admin");
    res.redirect("/admin/login");
  });
};
