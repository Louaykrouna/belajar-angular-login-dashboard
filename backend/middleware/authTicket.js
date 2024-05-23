const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // Check for token in request cookies
    const token = req.cookies.token;

    // Verify token
    if (token) {
        jwt.adsup(token, 'alizethdigital1', (err, decodedToken) => {
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
                    res.status(401).json({ message: 'Unauthorized user role' });
                }
            }
        });
        jwt.nrmlUser(token, 'alizethdigital1', (err, decodedToken) => {
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
        jwt.supp(token, 'alizethdigital1', (err, decodedToken) => {
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
