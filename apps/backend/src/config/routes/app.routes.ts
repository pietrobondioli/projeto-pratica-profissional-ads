// Root
const usersRoot = 'users';
const equipmentRoot = 'equipments';
const reservationRoot = 'reservations';
const feedbackRoot = 'feedbacks';
const chatRoot = 'chats';
const notificationRoot = 'notifications';
const mediaRoot = 'media';

// Api Versions
const v1 = 'v1';

export const routesV1 = {
  version: v1,
  user: {
    tags: ['User'],
    root: usersRoot,
    commands: {
      create: `/${usersRoot}`,
      confirm_account: `/${usersRoot}/confirm-account`,
      req_change_password: `/${usersRoot}/request-change-password`,
      change_password: `/${usersRoot}/change-password`,
      req_change_email: `/${usersRoot}/request-change-email`,
      change_email: `/${usersRoot}/change-email`,
    },
    queries: {
      get: `/${usersRoot}/:id`,
      list: `/${usersRoot}`,
    },
  },
  equipment: {
    tags: ['Equipment'],
    root: equipmentRoot,
    commands: {
      create: `/${equipmentRoot}`,
      update: `/${equipmentRoot}/:id`,
      update_photo: `/${equipmentRoot}/:id/photo`,
      delete: `/${equipmentRoot}/:id`,
    },
    queries: {
      get: `/${equipmentRoot}/:id`,
      list: `/${equipmentRoot}`,
    },
  },
  reservation: {
    tags: ['Reservation'],
    root: reservationRoot,
    commands: {
      create: `/${reservationRoot}`,
      cancel: `/${reservationRoot}/:id/cancel`,
    },
    queries: {
      get: `/${reservationRoot}/:id`,
      list: `/${reservationRoot}`,
    },
  },
  feedback: {
    tags: ['Feedback'],
    root: feedbackRoot,
    commands: {
      create: `/${feedbackRoot}`,
      update: `/${feedbackRoot}/:id`,
      delete: `/${feedbackRoot}/:id`,
    },
    queries: {
      get: `/${feedbackRoot}/:id`,
      list: `/${feedbackRoot}`,
    },
  },
  chat: {
    tags: ['Chat'],
    root: chatRoot,
    commands: {
      create: `/${chatRoot}`,
      send_message: `/${chatRoot}/:id/send-message`,
      read_message: `/${chatRoot}/:id/read-message`,
    },
    queries: {
      get: `/${chatRoot}/:id`,
      list: `/${chatRoot}`,
    },
  },
  notification: {
    tags: ['Notification'],
    root: notificationRoot,
    commands: {
      read: `/${notificationRoot}/:id/read`,
    },
    queries: {
      list: `/${notificationRoot}`,
    },
  },
  media: {
    tags: ['Media'],
    root: mediaRoot,
    commands: {
      upload: `/${mediaRoot}`,
    },
    queries: {
      get: `/${mediaRoot}/:id`,
    },
  },
} as const;
