const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Doctor = require('../Schemas/doctor')
const Patient = require('../Schemas/patient')

router.use(bodyParser.json());

router.post('/login', async (req, res) => {
    const { employeeID, password } = req.body;

    if (!employeeID || !password) {
        res.status(400).json({ error: 'Email and password are required' });
        return;
    }

    try {
        const doctorLogin = await Doctor.findOne({ employeeID, password });

        if (!doctorLogin) {
            res.status(401).json({ error: 'Invalid employeeID or password' });
            return;
        }

        res.status(200).json(doctorLogin);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/doctorForm', async (req, res) => {

    const { fullName, speciality, address, phoneNumber, email, yearsOfExperience, bio, status } = req.body;

    const doctor = Doctor({ fullName, speciality, address, phoneNumber, email, yearsOfExperience, bio, status });

    try {
        await doctor.save();
        res.status(201).json(doctor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/doctors-details', (req, res) => {
    const { employeeID } = req.body;

    // Find doctor with matching name, email, and password
    Doctor.findOne({ employeeID })
        .then((doctor) => {
            if (doctor) {
                // Return doctor details if found
                res.status(200).send(doctor);
            } else {
                // Return error message if doctor not found
                res.status(404).send({ message: 'Doctor not found' });
            }
        })
        .catch((error) => {
            // Return error message if there is a database error
            res.status(500).send({ message: 'Database error', error });
        });
});

router.post('/patientGroup', async (req, res) => {
    const { currentIllness } = req.body;
    try {
        const patients = await Patient.find({ currentIllness });
        res.json(patients);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router