const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Doctor = require('../Schemas/doctor')
const Patient = require('../Schemas/patient')
const validator = require('validator')

router.use(bodyParser.json());

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ error: 'Email and password are required' });
        return;
    }

    if (!validator.isEmail(email)) {
        res.status(400).json({ error: 'Invalid email format' });
        return;
    }

    try {
        const patientLogin = await Patient.findOne({ email, password });

        if (!patientLogin) {
            res.status(401).json({ error: 'Invalid email or password' });
            return;
        }

        res.status(200).json(patientLogin);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }

    // try {
    //     const r = await axios.put(
    //         'https://api.chatengine.io/users/',
    //         { username: email, secret: email, first_name: email },
    //         { headers: { "private-key": "fe2a468a-1eb7-4abb-851d-d4195061e017" } }
    //     )
    //     // return res.json(r.data)
    //     // console.log(r)
    // } catch (e) {
    //     // return res.status(e.response.status).json(e.response.data);
    //     console.log(e)
    // }
});

router.post('/signup', async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        console.log(fullName)
        res.status(400).json({ error: `Name, email, and password are required ${email}` });
        return;
    }

    if (!validator.isEmail(email)) {
        res.status(400).json({ error: 'Invalid email format' });
        return;
    }

    const existingPatient = await Patient.findOne({ email });

    if (existingPatient) {
        res.status(409).json({ error: 'Email is already registered' });
        return;
    }

    const patientLogin = Patient({ fullName, email, password, });

    try {
        await patientLogin.save();
        res.status(201).json(patientLogin);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
});

router.post('/patientForm', async (req, res) => {

    const { fullName, email, dateOfBirth, occupation, address, phoneNumber, medicalHistory, chronicConditions, allergies, medications, familyHistory, lifestyleFactors, recentChanges, preferredCommunication, healthcarePreferences, culturalConsiderations, currentIllness, status } = req.body;

    const patient = Patient({ fullName, email, dateOfBirth, occupation, address, phoneNumber, medicalHistory, chronicConditions, allergies, medications, familyHistory, lifestyleFactors, recentChanges, preferredCommunication, healthcarePreferences, culturalConsiderations, currentIllness, status });

    try {
        await patient.save();
        res.status(201).json(patient);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/patient-details', (req, res) => {
    const { fullName, email } = req.body;

    // Find patient with matching fullName, email, and password
    Patient.findOne({ fullName, email })
        .then((patient) => {
            if (patient) {
                // Return patient details if found
                res.status(200).send(patient);
            } else {
                // Return error message if patient not found
                res.status(404).send({ message: 'Patient not found' });
            }
        })
        .catch((error) => {
            // Return error message if there is a database error
            res.status(500).send({ message: 'Database error', error });
        });
});

router.post('/doctorGroup', async (req, res) => {
    const { speciality } = req.body;
    try {
        const doctors = await Doctor.find({ speciality });
        res.json(doctors);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router