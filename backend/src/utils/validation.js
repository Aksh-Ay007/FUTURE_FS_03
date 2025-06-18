const validator = require('validator');

const validateSignupData = (req) => {
    const { firstName, lastName, email, password } = req.body;
    
    if (!firstName || !lastName) {
        throw new Error('First name and last name are required');
    }
    else if (firstName.length < 4 || firstName.length > 50) {
        throw new Error('First name should be 4 to 50 characters');
    }
    else if (!validator.isEmail(email)) {
        throw new Error('Email is not valid');
    }
    else if (!validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    })) {
        throw new Error('Password should be strong');
    }
};

const validationForSignupDataCaptain = (req) => {
    const { firstName, lastName, email, password } = req.body;
    const { color, plateNumber, capacity, vehicleType } = req.body.vehicle || {};
    
    if (!firstName || !lastName) {
        throw new Error('First name and last name are required');
    }
    else if (firstName.length < 4 || firstName.length > 50) {
        throw new Error('First name should be 4 to 50 characters');
    }
    else if (!validator.isEmail(email)) {
        throw new Error('Email is not valid');
    }
    else if (!validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    })) {
        throw new Error('Password should be strong');
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