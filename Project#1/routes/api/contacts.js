//This is the contacts route
const express = require('express');
const router = express.Router();
const Contact = require('../../models/contact');



/* GET contact page. */
router.get('/', async (req, res, next) => {
  let contacts =  await Contact.find();
  res.status(200).json(contacts);
});



router.post('/', async (req, res) => {
    const { FirstName, MiddleName, LastName, EmailAddress, PhoneNumber, AddressLine1, AddressLine2, Province, Postcode, Country } = req.body;

    try {
        const newContact = new Contact({
            FirstName,
            MiddleName,
            LastName,
            EmailAddress,
            PhoneNumber,
            AddressLine1,
            AddressLine2,
            Province,
            Postcode,
            Country
        });

        const savedContact = await newContact.save();
        res.status(201).json(savedContact);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});














/*
// Get contact by last name
router.get('/contacts', async (req, res) => {
    const lastName = req.query.lastName;

    try {
        if (!lastName) {
            return res.status(400).json({ error: 'Last name query parameter is required' });
        }

        const contacts = await Contact.find({ lastName: lastName });

        if (contacts.length === 0) {
            return res.status(404).json({ message: 'No contacts found with that last name' });
        }

        res.status(200).json(contacts);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});
*/

module.exports = router;