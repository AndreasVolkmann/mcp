import { NextFunction, Request, Response } from "express";

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  console.log(
    `➡️ ${req.method} ${req.path} - ${new Date(start).toLocaleString("en-US", {})}`
  );

  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`⬅️ ${req.method} ${req.path} ${res.statusCode} - ${duration}ms`);
  });

  next();
};


export const getFullUri = (req: Request, path: string) => {
  const protocol = req.protocol;
  const host = req.get("host");
  return `${protocol}://${host}${path}`;
}



