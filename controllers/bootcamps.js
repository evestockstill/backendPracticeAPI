/* eslint-disable no-undef */
const Bootcamp = require('../models/Bootcamp');
// @desc Get all bootcamps
// @route GET /api/v1/bootcamps
// @access Public
exports.getBootcamps = (req, res, next) => {
    res.status(200).json({ success: true, msg: 'show all bootcamps' });
};
// @desc Get single bootcamp
// @route GET /api/v1/bootcamps/"id"
// @access Public
exports.getBootcamp = (req, res, next) => {
    res.status(200).json({ success: true, msg: `get one bootcamps ${req.params.id}` });
};
// @desc create bootcamps
// @route POST /api/v1/bootcamps/"id"
// @access private
exports.createBootcamp = async(req, res, next) => {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(2001).json({ 
        success: true, 
        data: bootcamp 
    });
};
// @desc update bootcamps
// @route PUT /api/v1/bootcamps/"id"
// @access private
exports.updateBootcamp = (req, res, next) => {
    res.status(200).json({ success: true, msg: `update bootcamps ${req.params.id}` });
};
// @desc delete bootcamp
// @route DELETE /api/v1/bootcamps/"id"
// @access Public
exports.deleteBootcamp = (req, res, next) => {
    res.status(200).json({ success: true, msg: `delete ${req.params.id}` });
};