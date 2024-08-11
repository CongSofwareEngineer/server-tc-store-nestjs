interface EnvironmentVariables {
  readonly USER_NAME_MONGO: string;
  readonly PORT: string;
  readonly PASSWORD_MONGO: string;
  readonly ENABLE_CHECK_AUTH: string;
  readonly KEY_CRYPTO_IV_ENCODE: string;
  readonly KEY_CRYPTO_SALT: string;
}

declare namespace NodeJS {
  interface ProcessEnv extends EnvironmentVariables {}
}
