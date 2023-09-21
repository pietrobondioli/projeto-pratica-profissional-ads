// Root
const usersRoot = 'users';

// Api Versions
const v1 = 'v1';

export const routesV1 = {
  version: v1,
  user: {
    tags: ['User'],
    root: usersRoot,
    create: `/${usersRoot}`,
    confirm_account: `/${usersRoot}/confirm-account`,
    req_change_password: `/${usersRoot}/request-change-password`,
    change_password: `/${usersRoot}/change-password`,
    req_change_email: `/${usersRoot}/request-change-email`,
    change_email: `/${usersRoot}/change-email`,
  },
};
