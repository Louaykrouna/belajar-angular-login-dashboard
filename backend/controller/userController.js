const User = require('../model/User');

// Create a new user
exports.createUser = async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        // Check if the email is already in use
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Create a new user instance
        const newUser = new User({ username, email, password, role });

        // Save the new user to the database
        const savedUser = await newUser.save();

        // Send a success response back to the client
        res.status(201).json({ message: 'User created successfully', user: savedUser });
    } catch (error) {
        // Handle validation errors and other errors that occur during user creation
        console.error('Error creating user:', error);

        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map((val) => val.message);
            return res.status(400).json({ error: messages });
        }

        res.status(500).json({ message: 'Failed to create user' });
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        // Retrieve all users from the database
        const users = await User.find();

        // Send the list of users as the response
        res.json(users);
    } catch (error) {
        // Handle any errors that occur during user retrieval
        console.error('Error retrieving users:', error);
        res.status(500).json({ message: 'Failed to retrieve users' });
    }
};

// Get a specific user by ID
exports.getUserById = async (req, res) => {
    const userId = req.params.id;

    try {
        // Retrieve the user with the specified ID from the database
        const user = await User.findById(userId);

        // If the user does not exist, return a 404 Not Found error
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Send the user details as the response
        res.json(user);
    } catch (error) {
        // Handle any errors that occur during user retrieval
        console.error('Error retrieving user:', error);
        res.status(500).json({ message: 'Failed to retrieve user' });
    }
};

exports.getUsernameById = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId).select('username'); // Select only the username field

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error retrieving user:', error);
        res.status(500).json({ message: 'Failed to retrieve user' });
    }
};


// Update a user by ID
exports.updateUser = async (req, res) => {
    const userId = req.params.id;
    const updatedData = req.body;

    try {
        // Find the user with the specified ID and update their details
        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });

        // If the user does not exist, return a 404 Not Found error
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Send the updated user details as the response
        res.json(updatedUser);
    } catch (error) {
        // Handle any errors that occur during user update
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Failed to update user' });
    }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
    const userId = req.params.id;

    try {
        // Find the user with the specified ID and delete them from the database
        const deletedUser = await User.findByIdAndDelete(userId);

        // If the user does not exist, return a 404 Not Found error
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Send a success response back to the client
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        // Handle any errors that occur during user deletion
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Failed to delete user' });
    }
};




