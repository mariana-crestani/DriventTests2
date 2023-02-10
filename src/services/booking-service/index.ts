import { forbiddenError, notFoundError } from '@/errors';
import bookingRepository from '@/repositories/booking-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketRepository from '@/repositories/ticket-repository';

async function listBooking(userId: number) {
  const booking = await bookingRepository.findFirst(userId);
  if (!booking) {
    throw notFoundError();
  }
  return booking;
}

async function createBooking(userId: number, roomId: number) {
  const enrollment = await enrollmentRepository.findByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket || ticket.status === 'RESERVED' || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw forbiddenError();
  }

  const room = await bookingRepository.findRoom(roomId);
  if (!room) {
    throw notFoundError();
  }
  if (room.capacity === room.Booking.length) {
    throw forbiddenError();
  }

  const booking = await bookingRepository.createBooking(userId, roomId);

  const bookingId = booking.id;

  return { bookingId };
}

async function updateBooking(bookingId: number, userId: number, roomId: number) {
  const booking = await bookingRepository.findFirst(userId);

  if (!booking) {
    throw forbiddenError();
  }
  const room = await bookingRepository.findRoom(roomId);
  if (!room) {
    throw notFoundError();
  }

  if (room.capacity === room.Booking.length) {
    throw forbiddenError();
  }

  const {id:newBookingId} = await bookingRepository.updateBooking(bookingId, roomId);


  return { bookingId: newBookingId };
}

const bookingService = {
  listBooking,
  createBooking,
  updateBooking,
};

export default bookingService;
