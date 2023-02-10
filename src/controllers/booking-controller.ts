import { AuthenticatedRequest } from '@/middlewares';
import bookingService from '@/services/booking-service';
import { Response } from 'express';
import httpStatus from 'http-status';

export async function getBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const booking = await bookingService.listBooking(Number(userId));
    return res.status(httpStatus.OK).send(booking);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  }
}

export async function createBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { roomId } = req.body;

  try {
    const bookingId = await bookingService.createBooking(Number(userId), Number(roomId));
    return res.status(httpStatus.OK).send(bookingId);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    if (error.name === 'ForbiddenError') {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }

    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function updateBooking(req: AuthenticatedRequest, res: Response) {
  const bookingId = req.params;
  const { userId } = req;
  const { roomId } = req.body;

  try {
    const newBookingId = await bookingService.updateBooking(Number(bookingId), Number(userId), Number(roomId));
    return res.status(httpStatus.OK).send({ newBookingId });
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === 'ForbiddenError') {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
