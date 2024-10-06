import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const IS_BASIC_AUTH_KEY = 'isBasicAuth';
export const BasicAuth = () => SetMetadata(IS_BASIC_AUTH_KEY, true);