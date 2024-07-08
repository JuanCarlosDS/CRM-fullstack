import { BadRequestException } from '@nestjs/common';

export function validateAndConvertOrgId(organizationId: string): number {
    const organizationIdNumber = Number(organizationId);
    if (isNaN(organizationIdNumber)) {
        throw new BadRequestException('Invalid organizationId');
    }
    return organizationIdNumber;
}
