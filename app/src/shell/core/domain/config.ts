/* **
 * Constants
 ** */

const BASE_TOAST_OPTIONS = {
  position: "top-right" as const,
  closeOnClick: true,
  hideProgressBar: false,
  pauseOnHover: true,
  draggable: false,
};

export const ERROR_TOAST_OPTIONS = {
  ...BASE_TOAST_OPTIONS,
  autoClose: 4000,
};

export const WARNING_TOAST_OPTIONS = {
  ...BASE_TOAST_OPTIONS,
  autoClose: 3000,
};

export const SUCCESS_TOAST_OPTIONS = {
  ...BASE_TOAST_OPTIONS,
  autoClose: 2000,
};

export const FIXED_TOAST_OPTIONS = {
  ...BASE_TOAST_OPTIONS,
  autoClose: false as const,
};

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
