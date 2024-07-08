import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class OrganizationMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
    const organizationId = req.headers['x-organization-id'];
    
    req['organizationId'] = organizationId;
    next();
    }
}
