// Root
const usersRoot = 'users';
const equipmentRoot = 'equipments';
const reservationRoot = 'reservations';
const feedbackRoot = 'feedbacks';
const mediaRoot = 'media';

// Api Versions
const v1 = 'v1';

export const routesV1 = {
  version: v1,
  user: {
    tags: ['User'],
    root: usersRoot,
    create: `/${usersRoot}`,
    get: `/${usersRoot}/:id`,
    list: `/${usersRoot}`,
    confirm_account: `/${usersRoot}/confirm-account`,
    req_change_password: `/${usersRoot}/request-change-password`,
    change_password: `/${usersRoot}/change-password`,
    req_change_email: `/${usersRoot}/request-change-email`,
    change_email: `/${usersRoot}/change-email`,
  },
  equipment: {
    tags: ['Equipment'],
    root: equipmentRoot,
    create: `/${equipmentRoot}`,
    update: `/${equipmentRoot}/:id`,
    update_photo: `/${equipmentRoot}/:id/photo`,
    delete: `/${equipmentRoot}/:id`,
    get: `/${equipmentRoot}/:id`,
    list: `/${equipmentRoot}`,
  },
  media: {
    tags: ['Media'],
    root: mediaRoot,
    upload: `/${mediaRoot}`,
    get: `/${mediaRoot}/:id`,
  },
  reservation: {
    tags: ['Reservation'],
    root: reservationRoot,
    create: `/${reservationRoot}`,
    cancel: `/${reservationRoot}/:id/cancel`,
    get: `/${reservationRoot}/:id`,
    list: `/${reservationRoot}`,
  },
  feedback: {
    tags: ['Feedback'],
    root: feedbackRoot,
    create: `/${feedbackRoot}`,
    update: `/${feedbackRoot}/:id`,
    get: `/${feedbackRoot}/:id`,
    list: `/${feedbackRoot}`,
  },
  notification: {
    tags: ['Notification'],
    root: 'notifications',
    list: '/notifications',
    read: '/notifications/:id/read',
  },
} as const;
