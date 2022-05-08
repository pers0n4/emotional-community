import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from "@nestjs/common";
import { Request, Response } from "express";
import { FastifyReply, FastifyRequest } from "fastify";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response | FastifyReply>();
    const request = ctx.getRequest<Request | FastifyRequest>();
    const status = exception.getStatus();

    response.status(status).send({
      statusCode: status,
      message: exception.message,
      error: exception.getResponse()["error"],
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
