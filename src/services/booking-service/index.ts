import { notFoundError } from '@/errors';
import bookingRepository from '@/repositories/booking-repository';

async function listBooking(userId: number) {
  const booking = await bookingRepository.findFirst(userId);
  if (!booking) {
    throw notFoundError();
  }
  return booking;
}
const bookingService = {
  listBooking,
};

export default bookingService;
