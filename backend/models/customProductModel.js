const mongoose = require('mongoose');

const customproductSchema = new mongoose.Schema({
    size: {
        type: String,
        required: [true, "Please enter product size"],
        trim: true
    },
    description: {
        type: String,
        default: ''
    },
    desired_body_part: [
        {
            type: String,
            required: true
        }
    ],
    price: {
        type: Number,
        required: [true, "Please enter product price"]
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    length: {
        type: String,
        default: ''
    },
    breadth: {
        type: String,
        default: ''
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('CustomProduct', customproductSchema);