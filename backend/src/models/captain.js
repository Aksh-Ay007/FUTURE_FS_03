const { default: mongoose } = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const validator = require('validator');

const captainSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: [3, 'First name must be at least 3 characters long'],
    },
    lastName: {
        type: String,
        minlength: [3, 'Last name must be at least 3 characters long'],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Email must be at least 5 characters long'],
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email format: ' + value);
            }
        }
    },
    password: {
        type: String,
        required: true
    },
    socketId: {
        type: String,
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive"
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, 'Color must be at least 3 characters long'],
        },
        plateNumber: {
            type: String,
            required: true,
            unique: true,
            minlength: [3, 'Plate number must be at least 3 characters long'],
        },
        capacity: {
            type: Number,
            required: true,
            min: 1,
            max: 6
        },
        vehicleType: {
            type: String,
            required: true,
            // Fixed: Match the frontend options (car, auto, moto)
            enum: ["car", "auto", "moto"]
        }
    },
    location: {
        lat: {
            type: Number
        },
        lng: {
            type: Number
        }
    }
});

captainSchema.methods.getJWT = async function() {
    const captain = this;
    const token = jwt.sign({ _id: captain._id }, "uber-captain@123", { expiresIn: "1d" });
    return token;
}

captainSchema.methods.validatePassword = async function(passwordInputByCaptain) {
    const captain = this;
    const passwordHash = captain.password;
    console.log("Password Hash:", passwordHash);
    return await bcrypt.compare(passwordInputByCaptain, passwordHash);
}

module.exports = mongoose.model("Captain", captainSchema);