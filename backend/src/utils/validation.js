const validator = require('validator');

const validateSignupData = (req) => {
    const { firstName, lastName, email, password } = req.body;
    
    if (!firstName || !lastName) {
        throw new Error('First name and last name are required');
    }
    else if (!validator.isEmail(email)) {
        throw new Error('Invalid email format');
    }
    else if (!validator.isStrongPassword(password)) {
        throw new Error('Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one symbol');
    }
}

const validationForSignupDataCaptain = (req) => {
    const { firstName, lastName, email, password } = req.body;
    
    // Fixed: Get vehicle data from req.body.vehicle
    const { color, plateNumber, capacity, vehicleType } = req.body.vehicle || {};
    
    if (!firstName || !lastName) {
        throw new Error('First name and last name are required');
    }
    else if (!validator.isEmail(email)) {
        throw new Error('Invalid email format');
    }
    else if (!validator.isStrongPassword(password)) {
        throw new Error('Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one symbol');
    }
    else if (!color || !plateNumber || !capacity || !vehicleType) {
        throw new Error('Vehicle details are required');
    }
    else if (!validator.isLength(color, { min: 3 })) {
        throw new Error('Color must be at least 3 characters long');
    }
    else if (!validator.isLength(plateNumber, { min: 3 })) {
        throw new Error('Plate number must be at least 3 characters long');
    }
    else if (!validator.isInt(capacity.toString(), { min: 1, max: 6 })) {
        throw new Error('Capacity must be between 1 and 6');
    }
};

module.exports = {
    validateSignupData,
    validationForSignupDataCaptain
};