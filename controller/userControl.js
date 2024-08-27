import User from "../model/userModel.js";

// ----------------------------- Signup control -------------------------------- // 
//Get route
export const userSignup = async (req, res) => {
    res.render("userSignup");
};

// Post route and User creation
export const userCreate = async (req, res) => {
    try {
        const {email} = req.body
        const userExist = await User.findOne({email});
        if(userExist){
            let alreadyExists = 'User already exists!'
            res.render('userSignup', {alreadyExists});
        }
        const newUser = new User(req.body);
        await newUser.save();
        res.render('index');
        
    } catch (error) {
        console.log(error);
    }
};

// -------------------------------- Signup control -------------------------------- // 

// -------------------------------- login control -------------------------------- // 
//Get route
export const userLogin = async (req, res) => {
    res.render("userLogin");
};

//Post route
export const userLog  = async (req, res) => {
    try {
        const {email, password, name} = req.body;
        const userExist = await User.findOne({email});
        let errorMessage = ''
        if(!userExist){
            errorMessage += "User not Found";
           return res.render('userLogin', {errorMessage});
        };

        console.log(password);
        console.log(userExist.password);
       
        if(userExist.password != password){
            errorMessage += "Wrong password";
           return res.render("userLogin", {errorMessage})
        }

        res.render('index', {name});


    } catch (error) {
        console.log(error)
    }
}

// -------------------------------- login control-------------------------------- // 




// -------------------------------- Home control -------------------------------- // 

export const userIndex = async (req, res) => {
    const {name} = req.body
    res.render("index", {name});
};
// -------------------------------- Home control ------------------------------ // 
