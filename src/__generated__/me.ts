/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: me
// ====================================================

export interface me_me_me {
  __typename: "User";
  id: number;
  username: string;
  avatar: string | null;
  totalFollowing: number;
  totalFollowers: number;
}

export interface me_me {
  __typename: "MeOutput";
  ok: boolean;
  error: string | null;
  me: me_me_me | null;
}

export interface me {
  me: me_me;
}
