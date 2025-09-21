/* **
 * Constants
 ** */

export const PER_PAGE = 20;

/* **
 * Permissions
 ** */

export const roles = {
  admin: "admin",
  superuser: "superuser",
  editor: "editor",
  reader: "reader",
};

export const permissions = {
  analyze_document: "analyze_document",
};

/* **
 *  Routes
 ** */

export const appRoutes = {
  root: "/",
  auth: {
    register: "register",
    forgotPassword: "forgot-password",
    login: "login",
    logout: "logout",
  },
  admin: "admin",
  dashboard: "dashboard",
  leases: {
    root: "leasing-contracts",
    list: "list",
    id: "show",
    create: "create",
    edit: "edit",
    projects: "projects",
    active: "active",
    terminated: "terminated",
    search: "search",
    sort: "sort",
  },
  directory: {
    root: "directory",
    list: "list",
    id: "show",
    create: "create",
    edit: "edit",
    search: "search",
    sort: "sort",
  },
  notifications: {
    root: "notifications",
    list: "list",
    id: "show",
    search: "search",
    sort: "sort",
  },
  importExport: "import-export",
  settings: "settings",
  error: "error",
  notFound: "not-found",
};
