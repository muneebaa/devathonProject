const router = require('express').Router();
const {
  addAppointment,
  getAppointmentsForDoctor,
  acceptAppointment,
  declineAppointment,
  getAppointmentsForPatient,
} = require('../controllers/appointment');
const { addDoctorAvailability, getDoctors } = require('../controllers/user');
const { API_ERRORS, USER_ROLE } = require('../lib/constants');
const { serverErrorResponse } = require('../lib/utils');
const { isAuthenticated } = require('../middlewares/authentication');
const { roleAuthorization } = require('../middlewares/authorization');

router.get('/test', (req, res) => {
  return res.json({ hello: 'test api' });
});

// doctor sets his appointments
router.post(
  '/doctors/:doctorId/availability',
  isAuthenticated,
  roleAuthorization([USER_ROLE.Doctor]),
  async (req, res) => {
    // TODO: perform validation
    try {
      const doctorId = req.params.doctorId;
      await addDoctorAvailability(doctorId, req.body);
      return res.status(201).end();
    } catch (error) {
      console.error(error);
      return serverErrorResponse(res);
    }
  }
);

// patient sees doctors availability
router.get(
  '/doctors',
  isAuthenticated,
  roleAuthorization([USER_ROLE.Patient]),
  async (req, res) => {
    try {
      const doctors = await getDoctors();
      return res.json({ doctors }).end();
    } catch (error) {
      console.error(error);
      return serverErrorResponse(res);
    }
  }
);

// patient books appointment
router.post(
  '/appointments',
  isAuthenticated,
  roleAuthorization([USER_ROLE.Patient]),
  async (req, res) => {
    try {
      const body = req.body;
      // TODO: validation
      const doctors = await addAppointment(body);
      return res.status(201).end();
    } catch (error) {
      console.error(error);
      return serverErrorResponse(res);
    }
  }
);

// doctor sees his appointments
router.get(
  '/doctor/appointments',
  isAuthenticated,
  roleAuthorization([USER_ROLE.Doctor]),
  async (req, res) => {
    try {
      const appointments = await getAppointmentsForDoctor(req.user._id);
      return res.json({ appointments }).end();
    } catch (error) {
      console.error(error);
      return serverErrorResponse(res);
    }
  }
);

// doctor accepts an appointment
router.put(
  '/appointments/:appointmentId/accept',
  isAuthenticated,
  roleAuthorization([USER_ROLE.Doctor]),
  async (req, res) => {
    try {
      const appointmentId = req.params.appointmentId;

      await acceptAppointment(appointmentId);
      return res.status(201).end();
    } catch (error) {
      console.error(error);
      return serverErrorResponse(res);
    }
  }
);

// doctor declines an appointment
router.put(
  '/appointments/:appointmentId/decline',
  isAuthenticated,
  roleAuthorization([USER_ROLE.Doctor]),
  async (req, res) => {
    try {
      const appointmentId = req.params.appointmentId;
      await declineAppointment(appointmentId);
      return res.status(201).end();
    } catch (error) {
      console.error(error);
      return serverErrorResponse(res);
    }
  }
);

// patient sees his appointments
router.get(
  '/patient/appointments',
  isAuthenticated,
  roleAuthorization([USER_ROLE.Patient]),
  async (req, res) => {
    try {
      const appointments = await getAppointmentsForPatient(req.user._id);
      return res.json({ appointments }).end();
    } catch (error) {
      console.error(error);
      return serverErrorResponse(res);
    }
  }
);

module.exports = {
  apiRouter: router,
};
