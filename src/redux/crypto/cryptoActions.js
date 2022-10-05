import { UPDATE_CRYPTO_INFO } from './cryptoType';

export const updateCryptoInfo = (info) => {
  return {
    type: UPDATE_CRYPTO_INFO,
    payload: { cryptoInfo: info },
  };
};
