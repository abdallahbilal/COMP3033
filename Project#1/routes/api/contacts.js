//This is the contacts route
const express = require('express');
const router = express.Router();
const Contact = require('../../models/contact');



/* GET contact page. */
router.get('/', async (req, res, next) => {
  let contacts =  await Contact.find();
  res.status(200).json(contacts);
});



/* POST contacts. */
router.post('/', async (req, res, next) => {
    try {
        const { FirstName, MiddleName, LastName, EmailAddress, PhoneNumber, AddressLine1, AddressLine2, Province, Postcode, Country } = req.body;

        // Basic validation
        if (!FirstName) {
            return res.status(400).json({ ValidationError: 'First Name is a required field' });
        }
        if (!EmailAddress) {
            return res.status(400).json({ ValidationError: 'Email Address is a required field' });
        }

        // Create the new contact
        const newContact = await Contact.create({
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

        res.status(201).json(newContact);
    } catch (err) {
        console.error(err);
        res.status(500).json({ ErrorMessage: 'Server threw an exception', Details: err.message });
    }
});

/* GET contact by lastName page. */
router.get('/', async (req, res, next) => {
    try {
        const { lastName } = req.query;

        if (!lastName || lastName.trim() === '') {
            return res.status(400).json({ ValidationError: 'Last Name is a required query parameter' });
        }

        // Use strict matching (case-insensitive)
        const contacts = await Contact.find({
            LastName: LastName
        });

        if (contacts.length === 0) {
            return res.status(404).json({ Message: `No contacts found with last name '${lastName}'` });
        }

        res.status(200).json(contacts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ ErrorMessage: 'Server threw an exception', Details: err.message });
    }
});

/* Update contact by ID */
router.put('/:_id', async (req, res, next) => {
    try {
        const { FirstName, MiddleName, LastName, EmailAddress, PhoneNumber, AddressLine1, AddressLine2, Province, Postcode, Country } = req.body;

        // Basic validation
        if (!FirstName) {
            return res.status(400).json({ ValidationError: 'First Name is a required field' });
        }
        if (!EmailAddress) {
            return res.status(400).json({ ValidationError: 'Email Address is a required field' });
        }

        const updatedContact = await Contact.findOneAndUpdate(
            { _id: req.params._id },
            { FirstName, MiddleName, LastName, EmailAddress, PhoneNumber, AddressLine1, AddressLine2, Province, Postcode, Country },
            { new: true, runValidators: true } // return updated doc & validate
        );

        if (!updatedContact) {
            return res.status(404).json({ Message: `No contact found with ID '${req.params._id}'` });
        }

        res.status(200).json(updatedContact);
    } catch (err) {
        console.error(err);
        res.status(500).json({ ErrorMessage: 'Server threw an exception', Details: err.message });
    }
});

/* Delete contact by ID */
router.delete('/:_id', async (req, res, next) => {
    try {
        const { _id } = req.params;
        const deletedContact = await Contact.findOneAndDelete({ _id });

        if (!deletedContact) {
            return res.status(404).json({ Message: `No contact found with ID '${_id}'` });
        }

        res.status(200).json({ Message: `Contact with ID '${_id}' deleted successfully` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ ErrorMessage: 'Server threw an exception', Details: err.message });
    }
});


module.exports = router;