const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const baseUrls = {
  root: `${API_BASE_URL}/`,
  docs: `${API_BASE_URL}/docs`,
};

const authUrls = {
  confirmRegistry: `${API_BASE_URL}/confirm-registry`,
  login: `${API_BASE_URL}/login`,
  resendCode: `${API_BASE_URL}/resend-confirmation-code`,
  forgotPassword: `${API_BASE_URL}/forgot-password`,
  confirmForgotPassword: `${API_BASE_URL}/reset-password`,
  changePassword: `${API_BASE_URL}/change-password`,
};

const adminUrls = {
  /* auth */
  login: `${API_BASE_URL}/admin/login`,
  /* organizations */
  orgs: `${API_BASE_URL}/admin/tenants`,
  /* users */
  users: `${API_BASE_URL}/admin/users`,
  usersAdmin: `${API_BASE_URL}/admin/users_admin`,
};

const tenantUrls = {
  dashboard: `${API_BASE_URL}/dashboard`,
  leases: `${API_BASE_URL}/leases`,
  leasesSearch: `${API_BASE_URL}/leases/search`,
  leasesSort: `${API_BASE_URL}/leases/sort`,
  leasesDelete: `${API_BASE_URL}/leases/delete`,
  leasesPresigned: `${API_BASE_URL}/leases/presigned`,
  leasesImport: `${API_BASE_URL}/leases/import`,
  leasesExport: `${API_BASE_URL}/leases/export`,
  leasesAnalyzeSingle: `${API_BASE_URL}/leases/analyze/single`,
  leasesAnalyzeMassive: `${API_BASE_URL}/leases/analyze/massive`,
  directory: `${API_BASE_URL}/directory`,
  directorySearch: `${API_BASE_URL}/directory/search`,
  directorySort: `${API_BASE_URL}/directory/sort`,
  directoryDelete: `${API_BASE_URL}/directory/delete`,
  notifications: `${API_BASE_URL}/notifications`,
  notifSearch: `${API_BASE_URL}/notifications/search`,
  notifSort: `${API_BASE_URL}/notifications/sort`,
  notifDelete: `${API_BASE_URL}/notifications/delete`,
  notifToggle: `${API_BASE_URL}/notifications/toggle`,
  configuration: `${API_BASE_URL}/configuration`,
};

const settingsUrls = {
  profile: `${API_BASE_URL}/profile`,
  profilePatchPic: `${API_BASE_URL}/profile/edit/pic`,
  changePassword: `${API_BASE_URL}/change-password`,
  logout: `${API_BASE_URL}/logout`,
};

export const apiUrls = {
  main: baseUrls,
  auth: authUrls,
  admin: adminUrls,
  tenants: tenantUrls,
  settings: settingsUrls,
};
