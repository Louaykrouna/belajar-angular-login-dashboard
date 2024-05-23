const jwt = require('jsonwebtoken');
const User = require('../model/User');

// Middleware to check if the user is an administrator
exports.isAdmin = (req, res, next) => {
    // Check for token in request cookies
    const token = req.cookies.token;

    // Verify token
    if (token) {
        jwt.verify(token, 'alizethdigital1', (err, decodedToken) => {
            if (err) {
                res.status(401).json({ message: 'Invalid token' });
            } else {
                // Extract user role from decoded token
                const { role } = decodedToken;
                // Check if user is an administrator
                if (role === 'administrator') {
                    req.user = decodedToken; // Pass decoded token to request object for further use
                    next(); // Allow access to the protected route
                } else {
                    res.status(401).json({ message: 'Unauthorized: Not an administrator' });
                }
            }
        });
    } else {
        res.status(401).json({ message: 'Token not provided' });
    }
};

// Middleware to check if the user is authenticated
exports.isAuth = (req, res, next) => {
    // Check for token in request cookies
    const token = req.cookies.token;

    // Verify token
    if (token) {
        jwt.verify(token, 'alizethdigital1', (err, decodedToken) => {
            if (err) {
                res.status(401).json({ message: 'Invalid token' });
            } else {
                req.user = decodedToken; // Pass decoded token to request object for further use
                next(); // Allow access to the protected route
            }
        });
    } else {
        res.status(401).json({ message: 'Tokedn not provided' });
    }
};

exports.isAdminSupp = (req, res, next) => {
    // Check for token in request cookies
    const token = req.cookies.token;

    // Verify token
    if (token) {
        jwt.verify(token, 'alizethdigital1', (err, decodedToken) => {
            if (err) {
                res.status(401).json({ message: 'Invalid token' });
            } else {
                // Extract user role from decoded token
                const { role } = decodedToken;
                // Pass decoded token to request object for further use
                req.user = decodedToken;
                if (role === 'administrator' || role === 'support'){
                  next();
                }
                else{// Allow access to the protected route
                    console.log("Unauthorized user role");
                    res.status(401).json({ message: 'Unauthorized user role ' });
                }
            }
        });
    } else {
        res.status(401).json({ message: 'Token not provided' });
    }
};
exports.isUser = (req, res, next) => {
    // Check for token in request cookies
    const token = req.cookies.token;

    // Verify token
    if (token) {
        jwt.verify(token, 'alizethdigital1', (err, decodedToken) => {
            if (err) {
                res.status(401).json({ message: 'Invalid token' });
            } else {
                // Extract user role from decoded token
                const { role } = decodedToken;
                // Pass decoded token to request object for further use
                req.user = decodedToken;
                if (role === 'user'){
                  next();
                }
                else{// Allow access to the protected route
                    console.log("Not a user ! ");
                    res.status(401).json({ message: 'Not A user ! ' });
                }
            }
        });
    } else {
        res.status(401).json({ message: 'Token not provided' });
    }
};
exports.isSupp = (req, res, next) => {
    // Check for token in request cookies
    const token = req.cookies.token;

    // Verify token
    if (token) {
        jwt.verify(token, 'alizethdigital1', (err, decodedToken) => {
            if (err) {
                res.status(401).json({ message: 'Invalid token' });
            } else {
                // Extract user role from decoded token
                const { role } = decodedToken;
                // Pass decoded token to request object for further use
                req.user = decodedToken;
                if (role === 'support'){
                  next();
                }
                else{// Allow access to the protected route
                    console.log("Not a support ! ");
                    res.status(401).json({ message: 'Not A support ! ' });
                }
            }
        });
    } else {
        res.status(401).json({ message: 'Token not provided' });
    }
};
exports.isUserSupp = (req, res, next) => {
    // Check for token in request cookies
    const token = req.cookies.token;

    // Verify token
    if (token) {
        jwt.verify(token, 'alizethdigital1', (err, decodedToken) => {
            if (err) {
                res.status(401).json({ message: 'Invalid token' });
            } else {
                // Extract user role from decoded token
                const { role } = decodedToken;
                // Pass decoded token to request object for further use
                req.user = decodedToken;
                if (role === 'user' || role === 'support'){
                  next();
                }
                else{// Allow access to the protected route
                    console.log("Unauthorized user role");
                    res.status(401).json({ message: 'Unauthorized user role' });
                }
            }
        });
    } else {
        res.status(401).json({ message: 'Token not provided' });
    }
};
// Function to check if sender and receiver have different roles
exports.checkSenderReceiverRoles = async (senderId, receiverId) => {
    try {
        const sender = await User.findById(senderId);
        const receiver = await User.findById(receiverId);


        if (!sender || !receiver || sender.role === receiver.role) {
            return false; // Return false if any of the conditions are met
        }

        // If sender or receiver is an administrator, return false
        if (sender.role === 'administrator' || receiver.role === 'administrator') {
            return false;
        }

        return true; // Return true if sender and receiver have different roles
    } catch (error) {
        console.error('Error checking sender and receiver roles:', error);
        return false; // Return false in case of any error
    }
};
