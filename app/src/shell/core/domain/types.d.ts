/* **
 * Session
 ** */

export interface SessionTokenSchema {
  email: string;
  type: "landlord" | "brand" | "franchisee" | "consultant" | null;
  role: string;
  permissions: string[];
  scopes: {
    id: string;
    name: string;
    description: string;
  }[];
  data: {
    name: string;
    lastname: string;
    tenant: {
      id: string;
      name: string;
    };
  };
}

export interface UserSessionType {
  isAuthenticated: boolean;
  accessToken: string | null;
  exp: number | null;
  activeScope: string | null;
  user: SessionTokenSchema;
}

/* **
 * Auth
 ** */

export interface SessionDataParams {
  accessToken: string;
  sessionToken: string;
}

export interface AccessTokenType {
  sub: string;
  iss: string;
  client_id: string;
  origin_jti: string;
  event_id: string;
  token_use: string;
  scope: string;
  auth_time: number;
  exp: number;
  iat: number;
  jti: string;
  username: string;
}
