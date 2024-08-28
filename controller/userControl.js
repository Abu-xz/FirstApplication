import User from "../model/userModel.js";
import bcrypt, { hash } from "bcrypt";

// ----------------------------- Signup control -------------------------------- //
//Get route
export const userSignup = async (req, res) => {
   return res.render("userSignup");
};

// Post route and User creation
export const userCreate = async (req, res) => {
  try {
    const { email, name , password} = req.body;
  
    const userExist = await User.findOne({ email });

    if (userExist) {
      let alreadyExists = "User already exists!";
     return res.render("userSignup", { alreadyExists });
    }
    //session creation for new user
    req.session.username = name;
    res.cookie("username", name);
    //Password hashing
    const hashedPassword = await bcrypt.hash(password, 10);
    //creating user
    const newUser = new User({email, name, password: hashedPassword});
    await newUser.save();

    res.render("index", { name });
  } catch (error) {
    if (error.name === "ValidationError") {
      // Handle validation errors
      const errorMessage = Object.values(error.errors).map(
        (err) => err.message
      );
      res.render("userSignup", { errorMessage });
    }
  }
};

// -------------------------------- Signup control -------------------------------- //

// -------------------------------- login control -------------------------------- //
//Get route
export const userLogin = async (req, res) => {
  res.render("userLogin");
};

//Post route
export const userLog = async (req, res) => {
  try {
    const {name, email, password } = req.body;
    const userExist = await User.findOne({ name, email });
    let errorMessage = "";
    if (!userExist) {
      errorMessage += "User not Found";
      return res.render("userLogin", { errorMessage });
    }

    const isMatch = await bcrypt.compare(password, userExist.password)
    if (!isMatch) {
      errorMessage += "Wrong password";
      return res.render("userLogin", { errorMessage });
    }
    //session creation for user
    req.session.username = userExist.name;
    res.cookie("username", userExist.name);

    res.render("index", { name: userExist.name });
  } catch (error) {
    if (error.name === "ValidationError") {
      // Handle validation errors
      const validationError = Object.values(error.errors).map(
        (err) => err.message
      );
      res.render("userSignup", { validationError });
    }
  }  
};
// -------------------------------- login control-------------------------------- //

// -------------------------------- Home control -------------------------------- //

export const userIndex = async (req, res) => {
  const name = req.session.username;
  if (!name) {
    return res.redirect("/user/login");
  }
  res.render("index", { name });
};

// Log out
export const userLogout = (req, res) =>{
  try{
    req.session.destroy((err) =>{
      if(err){
        console.log("Failed to logout"); 
      }
    });
    res.clearCookie('username');

    res.redirect("/user/login");
  }catch (error){
    console.log(error)
  }
}

// -------------------------------- Home control ------------------------------ //
