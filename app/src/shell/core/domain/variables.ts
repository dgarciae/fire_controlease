export const initialUser = {
  isAuthenticated: false,
  accessToken: null,
  exp: null,
  activeScope: null,
  user: {
    type: null,
    email: "",
    role: "",
    permissions: [],
    scopes: [
      {
        id: "",
        name: "",
        description: "",
      },
    ],
    data: {
      name: "",
      lastname: "",
      tenant: {
        id: "",
        name: "",
      },
    },
  },
};
