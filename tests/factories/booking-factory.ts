import { prisma } from "@/config";

export async function createBookings(roomId: number, userId: number) {
  return prisma.booking.create({
    data: {
      roomId,
      userId,
    },
    include: {
      Room: true,
    },
  });
}