import { AuthenticatedRequest } from '@/middlewares';
import bookingService from '@/services/booking-service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function getBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const booking = await bookingService.listBooking(Number(userId));
    return res.status(httpStatus.OK).send({ booking });
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  }
}

export async function createBooking(req: Request, res: Response) {
  // Regra de negócio: Apenas usuários com ticket presencial, com hospedagem e pago podem fazer reservas.

  const body = {
    roomId: Number,
  };

  //Sucesso: Deve retornar status code 200 com bookingId
  /*
//Error:    
    `roomId` não existente: Deve retornar status code 404. 
    `roomId` sem vaga: Deve retornar status code 403.
    Fora da regra de negócio: Deve retornar status code 403.
*/
}

export async function updateBooking(req: Request, res: Response) {
  // A troca só pode ser efetuada para usuários que possuem reservas.
  // A troca só pode ser efetuada apenas para quartos livres.

  const bookingId = req.params;

  const body = {
    roomId: Number,
  };

  //Sucesso: Deve retornar status code 200 com `bookingId`
  //Error:
  // `roomId` não existente: Deve retornar status code 404.
  // `roomId` sem vaga: Deve retornar status code 403.
  // Fora da regra de negócio: Deve retornar status code 403.
}
