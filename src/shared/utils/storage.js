import { STORAGE_AUTH_TOKEN, STORAGE_CONFIG, STORAGE_USER } from 'shared/constants/storage';
import storage from 'shared/storage';

export const getUser = () => storage.getData(STORAGE_USER);

export const getAuthToken = () => storage.getData(STORAGE_AUTH_TOKEN);

export const getConfig = () => storage.getData(STORAGE_CONFIG);
