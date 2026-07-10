const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { protect } = require('../middlewares/auth');
const { sendAdminNotification } = require('../utils/emailService');

// @route   POST /api/contact
// @desc    Submit a new contact form
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message } = req.body;
    
    if (!firstName || !lastName || !email || !phone || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newContact = await Contact.create({
      firstName,
      lastName,
      email,
      phone,
      message
    });

    // Notify Admin via Email
    sendAdminNotification('Contact Form Inquiry', {
      Name: `${firstName} ${lastName}`,
      Email: email,
      Phone: phone,
      Message: message
    });

    res.status(201).json({ message: 'Message sent successfully!', data: newContact });
  } catch (error) {
    console.error('Error submitting contact form:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/contact
// @desc    Get all contact leads
// @access  Private/Admin
router.get('/', protect, async (req, res) => {
  try {
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   PUT /api/contact/:id/status
// @desc    Update contact lead status (new/read)
// @access  Private/Admin
router.put('/:id/status', protect, async (req, res) => {
  try {
    const { status } = req.body;
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    contact.status = status || 'read';
    await contact.save();
    
    res.json(contact);
  } catch (error) {
    console.error('Error updating contact status:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   DELETE /api/contact/:id
// @desc    Delete a contact lead
// @access  Private/Admin
router.delete('/:id', protect, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    await contact.deleteOne();
    res.json({ message: 'Contact removed' });
  } catch (error) {
    console.error('Error deleting contact:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
