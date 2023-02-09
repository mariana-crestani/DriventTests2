import { forbiddenError, notFoundError } from '@/errors';
import { cannotListHotelsError } from '@/errors/cannot-list-hotels-error';
import bookingRepository from '@/repositories/booking-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import hotelRepository from '@/repositories/hotel-repository';
import ticketRepository from '@/repositories/ticket-repository';
import hotelService from '../hotels-service';

async function listBooking(userId: number) {
  const booking = await bookingRepository.findFirst(userId);
  if (!booking) {
    throw notFoundError();
  }
  return booking;
}

async function verifyBooking(userId: number, roomId: number) {
  await hotelService.listHotels(userId);

  const room = await bookingRepository.findRoom(roomId);
  if (!room) throw notFoundError();
  if (room.capacity === room.Booking.length) throw forbiddenError();
}

async function createBooking(userId: number, roomId: number) {
  verifyBooking(userId, roomId);

  const bookingId = await bookingRepository.createBooking(userId, roomId);

  return bookingId;
}

async function updateBooking(bookingId: number, userId: number, roomId: number) {
  listBooking(userId);
  verifyBooking(userId, roomId);
  const newBookingId = await bookingRepository.updateBooking(bookingId, roomId);

  return newBookingId;
}

const bookingService = {
  listBooking,
  createBooking,
  updateBooking,
};

export default bookingService;
