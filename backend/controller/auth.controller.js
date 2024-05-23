const jwt=require("jsonwebtoken")
const User=require("../model/User")
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        // Check if user exists
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Verify the password
        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            'alizethdigital1',
            { expiresIn: '1h' }
        );

        // Set JWT token in a cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: true, // Set to true in production for secure cookies over HTTPS
            sameSite: 'strict' // Recommended to prevent CSRF attacks
        });

        res.json(user);
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Login failed. Please try again later.' });
    }
};
// Logout function - remove the JWT
exports.logout = async (req, res) => {
    try {
        // Clear the token cookie
        res.clearCookie('token');

        res.json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ message: 'Logout failed. Please try again later.' });
    }
};
