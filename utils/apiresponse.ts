import { Response } from "express";

export class ApiResponse {
  public static success = (res: Response, data: object, status: number) => {
    res.status(status).json(data);
  };

  public static error = (
    res: Response,
    status: number,
    error: string,
    name: string,
    data?: any
  ) => {
    res.statusMessage = error;
    res.status(status).json({
      name,
      message: name,
      data,
    });
  };
}
