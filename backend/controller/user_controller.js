const User = require("../Model/user_model");
const bcrypt = require('bcrypt');
const saltRounds = 10; // Number of salt rounds for hashing

// Signup function
const signup = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email." });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user
        const newUser = new User({
            fullname,
            email,
            password: hashedPassword
        });

        // Save the user to the database
        await newUser.save();

        // Respond with success
        res.status(201).json({ message: "User created successfully!", user: newUser });

    } catch (error) {
        // Handle any errors
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

// Login function
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        // Respond with success
        res.status(200).json({ message: "Login successful!", user });

    } catch (error) {
        // Handle any errors
        console.error("Error during login:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

module.exports = { signup, login };
