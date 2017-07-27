/**
 * @flow
 */
export type User = {
  "email": string,
  "mobile": string,
  "avatar": string,
  "id": string,
  "created_at": string,
  "name": string
};
export type Role = {
  "id": number,
  "name": string
};
export type UserType = {
  "user": User,
  "roles": Role[],
  "status": number,
  id_verified: boolean
};
