import { prisma } from '@/config';

async function findFirst(userId: number) {
  return prisma.booking.findFirst({
    where: { userId },
    include: {
      Room: true,
    },
  });
}

const bookingRepository = {
  findFirst,
};


export default bookingRepository