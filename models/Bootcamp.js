/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
const mongoose = require('mongoose');
const slugify = require('slugify');
const geocoder = require('../utils/geocoder');

const BootcampSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name can not be more than 50 characters']
    },
    slug: String,
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [500, 'Name can not be more than 500 characters'] 
    },
    website: {
        type: String,
        
    },
    phone: {
        type: String,
        maxlength: [20, 'Name can not be more than 20 characters']
    },
    email: {
        type: String,
        match: [
            // eslint-disable-next-line no-useless-escape
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please use a valid email'
        ]
    },
    address: {
        type: String,
        required: [true, 'please add an address']
    },
    location: {
        type: {
            type: String,
            enum: ['Point']
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        },
        formattedAddress: String,
        street: String,
        city: String,
        state: String,
        zipcode: String,
        country: String
    },
    careers: {
        type: [String],
        required: true,
        enum: [
            'Web Development',
            'Mobile Development',
            'UI/UX',
            'Data Science',
            'Business',
            'Other'
        ]
    },
    averageRating: {
        type: Number,
        min: [1, 'rating must be at least 1'],
        max: [10, 'rating can not be more than 10']
    },
    averageCost: Number,
    photo: {
        type: String,
        default: 'no-photo.jpg'
    },
    housing: {
        type: Boolean,
        default: false
    },
    jobAssistance: {
        type: Boolean,
        default: false
    },
    jobGuarantee: {
        type: Boolean,
        default: false
    },
    acceptGi: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// creat bootcamp slug from the name
BootcampSchema.pre('save', function(next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

// geocode & create location field
BootcampSchema.pre('save', async function(next) {
    const loc = await geocoder.geocode(this.address);
    this.location = { 
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress,
        street: loc[0].streetName,
        city: loc[0].city,
        state: loc[0].stateCode,
        zipcode: loc[0].zipcode,
        country: loc[0].countryCode,
    };
    // do not save address in DB
    this.address = undefined;
    next();
});
module.exports = mongoose.model('Bootcamp', BootcampSchema);