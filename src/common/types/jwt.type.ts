export interface JwtPayload {
  email: string;
  sub: string;
  accountId?: string;
}
