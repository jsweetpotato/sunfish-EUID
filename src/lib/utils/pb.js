import Pocketbase from 'pocketbase';

// eslint-disable-next-line import/prefer-default-export
export const pb = new Pocketbase(import.meta.env.VITE_PB_URL);
