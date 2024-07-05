interface EnvironmentVariables {
  readonly USER_NAME_MONGO: string;
  readonly PORT: string;
  readonly PASSWORD_MONGO: string;
}

declare namespace NodeJS {
  interface ProcessEnv extends EnvironmentVariables {}
}
