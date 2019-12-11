/* eslint-disable no-undef */
// const express = require('express');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const geocoder = require('../utils/geocoder');
const Bootcamp = require('../models/Bootcamp');
// @desc Get all bootcamps
// @route GET /api/v1/bootcamps
// @access Public
exports.getBootcamps = asyncHandler(async(req, res, next) => {
    let query;
    // copy req.query
    const reqQuery = { ... req.query}
    // fields to exclude
    const removeFields = ['select', 'sort'];
    // loop over delete
    removeFields.forEach(param => delete reqQuery[param]);
    // console.log(reqQuery);
    // create query string
    let queryString = JSON.stringify(reqQuery);
    // create operators
    queryString = queryString.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
    query = Bootcamp.find(JSON.parse(queryString));
    // select fields
    if(req.query.select) {
        const fields = req.query.select.split(',').join(' ');
        console.log(fields);
        query = query.select(fields);
    }
    // sort
    if(req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    } else {
        query = query.sort ('-createAt');
    }
    
    const bootcamps = await query;
    res
        .status(200)
        .json({ success: true, count: bootcamps.length, data: bootcamps });

    // } catch (err){
    //     next(err);
    // }
});
// @desc Get single bootcamp
// @route GET /api/v1/bootcamps/"id"
// @access Public
exports.getBootcamp = asyncHandler(async(req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
    }
    res.status(200).json({ success: true, data: bootcamp });
    
});
// @desc create bootcamps
// @route POST /api/v1/bootcamps/"id"
// @access private
exports.createBootcamp = asyncHandler(async(req, res, next) => {
    
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({ 
        success: true, 
        data: bootcamp 
    });
});
// @desc update bootcamps
// @route PUT /api/v1/bootcamps/"id"
// @access private
exports.updateBootcamp = asyncHandler(async(req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
        new: true, 
        runValidators: true
    });
    if (!bootcamp) {
        return next(
            new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
        );
    }
    res.status(200).json({ success: true, data: bootcamp });
});

// @desc delete bootcamp
// @route DELETE /api/v1/bootcamps/"id"
// @access Public

exports.deleteBootcamp = asyncHandler(async(req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id); 
    if (!bootcamp) {
        return next(
            new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
        );
    }
    res.status(200).json({ success: true, data: {} });
});
// desc get bootcamps within a radius/:zipcode/:distance
// @route GET /api/v1/bootcamps
// @access Private
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
    const { zipcode, distance } = req.params;

    // get lat/lng from geocoder
    const loc = await geocoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;
    // calc radius using radius dived dist of earth
    // earth radius = 3,963mi/ 
    const radius = distance / 3963;
    const bootcamps = await Bootcamp.find({
        location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
    })
    res.status(200).json({
        success: true,
        count: bootcamps.length,
        data: bootcamps
    })
});