import sha256 from 'crypto-js/sha256';
import * as crypto from 'crypto-js';
export const encryptData = (
  value: string | object,
  pinCode: string = process.env.KEY_CRYPTO_SALT,
) => {
  try {
    const iv = crypto.enc.Hex.parse(process.env.KEY_CRYPTO_IV_ENCODE);
    return crypto.AES.encrypt(
      JSON.stringify(value),
      crypto.enc.Utf8.parse(pinCode),
      {
        iv: iv,
      },
    ).toString();
  } catch (error) {
    return '';
  }
};

export const encryptDataSha256 = (value: string | object) => {
  try {
    return sha256(value.toString()).toString();
  } catch (error) {
    return '';
  }
};

export const decryptData = (
  value: any,
  pinCode: string = process.env.KEY_CRYPTO_SALT,
) => {
  try {
    const iv = crypto.enc.Hex.parse(process.env.KEY_CRYPTO_IV_ENCODE);
    const bytes = crypto.AES.decrypt(
      value.toString(),
      crypto.enc.Utf8.parse(pinCode),
      {
        iv: iv,
      },
    );

    const decryptedData = JSON.parse(bytes.toString(crypto.enc.Utf8));
    return decryptedData;
  } catch (error) {
    return '';
  }
};

export const getPinCodeSalting = (pinCode: string) => {
  return `${pinCode}${process.env.NEXT_PUBLIC_KEY_SALT}`;
};

export const encodeSHA1 = (
  string: string,
  salt: string = process.env.NEXT_PUBLIC_KEY_SALT,
) => {
  return crypto.HmacSHA1(string, salt);
};
