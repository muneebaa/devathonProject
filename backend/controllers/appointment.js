const { ObjectId } = require('mongodb');
const { USER_ROLE } = require('../lib/constants');
const { getDatabase } = require('../lib/database');

async function addAppointment(data) {
  const db = await getDatabase();

  const appointment = {
    patientId: new ObjectId(data.patientId),
    doctorId: new ObjectId(data.doctorId),
    description: data.description,
    date: data.date,
    status: 'pending',
  };

  const result = await db.collection('appointments').insertOne(appointment);
}

async function getAppointmentsForDoctor(doctorId) {
  const db = await getDatabase();

  console.log(doctorId);

  const result = await db
    .collection('appointments')
    .aggregate([
      {
        // Stage 1: Look up the patient from the users collection
        $lookup: {
          from: 'users', // The collection to join with
          localField: 'patientId', // Field from appointments collection (assuming it contains patientId)
          foreignField: '_id', // Field from users collection to match with
          as: 'patientDetails', // Name of the new field to hold the matched user document
        },
      },
      {
        // Stage 2: Unwind the patientDetails array (because lookup results in an array)
        $unwind: '$patientDetails',
      },
      {
        // Stage 3: Filter to ensure only users with the role "patient" are included
        $match: {
          'patientDetails.role': 'patient',
          'doctorId': new ObjectId(doctorId),
        },
      },
      {
        // Stage 4: Project (select) only the fields you want to include in the result
        $project: {
          _id: 1, // Include appointment _id
          date: 1, // Include appointment date
          description: 1,
          patientId: '$patientDetails._id', // Include patientId from users collection
          patientName: '$patientDetails.name', // Include patientName from users collection
          patientEmail: '$patientDetails.email',
        },
      },
    ])
    .toArray();

  return result;
}

async function acceptAppointment(appointmentId) {
  const db = await getDatabase();

  const result = await db
    .collection('appointments')
    .updateOne(
      { _id: new ObjectId(appointmentId) },
      { $set: { status: 'accepted' } }
    );
}

async function declineAppointment(appointmentId) {
  const db = await getDatabase();

  const result = await db
    .collection('appointments')
    .updateOne(
      { _id: new ObjectId(appointmentId) },
      { $set: { status: 'declined' } }
    );
}

async function getAppointmentsForPatient(patientId) {
  const db = await getDatabase();

  const result = await db
    .collection('appointments')
    .aggregate([
      {
        // Stage 1: Look up the patient from the users collection
        $lookup: {
          from: 'users', // The collection to join with
          localField: 'doctorId', // Field from appointments collection (assuming it contains patientId)
          foreignField: '_id', // Field from users collection to match with
          as: 'doctorDetails', // Name of the new field to hold the matched user document
        },
      },
      {
        // Stage 2: Unwind the patientDetails array (because lookup results in an array)
        $unwind: '$doctorDetails',
      },
      {
        // Stage 3: Filter to ensure only users with the role "patient" are included
        $match: {
          'doctorDetails.role': USER_ROLE.Doctor,
          'patientId': new ObjectId(patientId),
        },
      },
      {
        // Stage 4: Project (select) only the fields you want to include in the result
        $project: {
          _id: 1, // Include appointment _id
          date: 1, // Include appointment date
          description: 1,
          doctorName: '$doctorDetails.name', // Include patientName from users collection
          doctorEmail: '$doctorDetails.email',
          status: 1,
        },
      },
    ])
    .toArray();

  return result;
}

module.exports = {
  addAppointment,
  getAppointmentsForDoctor,
  acceptAppointment,
  declineAppointment,
  getAppointmentsForPatient,
};
