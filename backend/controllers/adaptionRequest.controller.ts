import { Request, Response } from 'express';
import AdaptionRequest from '../models/adaptionRequest.model';
const asyncHandler = require('express-async-handler');
const nodemailer = require('nodemailer');

const mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'h.p.kaveesha@gmail.com',
        pass: 'octaiajsmhvuqoiy'
    }
});

// @desc    Fetch all Request
// @route   GET /api/adaptionrequests
// @access  Public
exports.getAdaptionRequests = asyncHandler(async (req: Request, res: Response) => {
    const adaptionRequests = await AdaptionRequest.find({});
    res.json(adaptionRequests);
});

// @desc    Fetch single Request
// @route   GET /api/adaptionrequests/:id
// @access  Public
exports.getAdaptionRequestById = asyncHandler(async (req: Request, res: Response) => {
    const adaptionRequest = await AdaptionRequest.findById(req.params.id);

    if (adaptionRequest) {
        res.json(adaptionRequest);
    } else {
        res.status(404);
        throw new Error('Adaption Request not found');
    }
});

// @desc    Create a Request
// @route   POST /api/adaptionrequests
// @access  Public
exports.createAdaptionRequest = asyncHandler(async (req: Request, res: Response) => {
    const adaptionRequest = new AdaptionRequest(req.body);
    await adaptionRequest.save();
    res.status(201).json(adaptionRequest);
});

// @desc    Update a Request
// @route   PUT /api/adaptionrequests/:id
// @access  Private/Admin
exports.updateAdaptionRequest = asyncHandler(async (req: Request, res: Response) => {
    const adaptionRequest = await AdaptionRequest.findById(req.params.id);
    if (!adaptionRequest) {
        res.status(404).json({ message: 'Adaption Request not found' });
        return;    
    }
    
    const { status } = req.body;

    // Update the status in the database
    const updatedFields = {
        status: status || adaptionRequest.status,
    };
    
    const updatedAdaptionRequest = await AdaptionRequest.findByIdAndUpdate(req.params.id, updatedFields, { new: true });
    
    // Send email based on the updated status
    let emailText = '';
    if (status === 'Approved') {
        emailText = `😊 Your adoption request for ${adaptionRequest.petName} has been approved by Urban Coop Admin.`;
    } else if (status === 'Rejected') {
        emailText = `🙁 Your adoption request for ${adaptionRequest.petName} has been rejected by Urban Coop Admin. please try another pet.`;
    }

    if (emailText) {
        const mailOptions = {
            from: 'h.p.kaveesha@gmail.com',
            to: adaptionRequest.requesterEmail,
            subject: '🐶 Urban Coop Adoption Request Status Update',
            text: emailText
        };

        // Send email and handle errors
        mailTransporter.sendMail(mailOptions, (error: any, info: any) => {
            if (error) {
                console.error('Error sending email:', error);
                res.status(500).json({ message: 'Error sending email' });
            } else {
                console.log('Email sent:', info.response);
                res.json(updatedAdaptionRequest);
            }
        });
    } else {
        res.json(updatedAdaptionRequest);
    }
});

// @desc    Delete a Request
// @route   DELETE /api/adaptionrequests/:id
// @access  Private/Admin
exports.deleteAdaptionRequest = asyncHandler(async (req: Request, res: Response) => {
    const adaptionRequest = await AdaptionRequest.findById(req.params.id);
    if (adaptionRequest) {
        await adaptionRequest.deleteOne();
        res.json({ message: 'Adaption Request removed' });
    } else {
        res.status(404);
        throw new Error('Adaption Request not found');
    }
});