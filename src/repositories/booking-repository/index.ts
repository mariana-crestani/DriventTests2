import { prisma } from '@/config';

async function findFirst(userId: number) {
  return prisma.booking.findFirst({
    where: { userId },
    select: {
      id: true,
      Room: true,
    },
  });
}

async function findRoom(roomId: number) {
  return prisma.room.findUnique({
    where: { id: roomId },
    include: {
      Booking: true,
    },
  });
}

async function createBooking(userId: number, roomId: number) {
  return prisma.booking.create({
    data: {
      userId,
      roomId,
    },
  });
}

async function updateBooking(bookingId: number, roomId: number) {
  return prisma.booking.update({
    where: { id: bookingId },
    data: { roomId },
  });
}

const bookingRepository = {
  findFirst,
  findRoom,
  createBooking,
  updateBooking,
};

export default bookingRepository;
