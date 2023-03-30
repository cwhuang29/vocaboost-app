import { COOKIE_NAMES } from 'shared/constants/storage';

import { getCookie } from './cookie';

export const isAdmin = () => getCookie(COOKIE_NAMES.IS_ADMIN);
