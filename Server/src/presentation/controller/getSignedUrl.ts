import { getPutSignedUrl } from "@/_lib/S3/config";
import { IDependencies } from "@/application/interfaces/IDependencies";
import { Request, Response, NextFunction } from "express";

export const getSignedUrlController = (dependencies: IDependencies) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filePath = `book-store/upload/${Date.now()}.jpg`;
      const contentType = "image/jpeg";

      const result = await getPutSignedUrl(filePath, contentType);

      res.status(200).json({
        success: true,
        data: { url: result, media: filePath },
        message: "URL fetched",
      });
    } catch (error) {
      next(error);
    }
  };
};
