export interface TokenData {
  sub: string;
  authorities: {
    key: number;
    authority: string;
  }[];
  iat: number;
  exp: number;
  userId: number;
}
