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
      get: `/${usersRoot}/:userId`,
    },
  },
  equipment: {
    tags: ['Equipment'],
    root: equipmentRoot,
    commands: {
      create: `/${equipmentRoot}`,
      update: `/${equipmentRoot}/:equipmentId`,
      update_photo: `/${equipmentRoot}/:equipmentId/photo`,
      delete: `/${equipmentRoot}/:equipmentId`,
    },
    queries: {
      get: `/${equipmentRoot}/:equipmentId`,
      list: `/${equipmentRoot}`,
    },
  },
  reservation: {
    tags: ['Reservation'],
    root: reservationRoot,
    commands: {
      create: `/${reservationRoot}`,
      cancel: `/${reservationRoot}/:reservationId/cancel`,
    },
    queries: {
      get: `/${reservationRoot}/:reservationId`,
      list: `/${reservationRoot}`,
    },
  },
  feedback: {
    tags: ['Feedback'],
    root: feedbackRoot,
    commands: {
      create: `/${feedbackRoot}`,
      update: `/${feedbackRoot}/:feedbackId`,
      delete: `/${feedbackRoot}/:feedbackId`,
    },
    queries: {
      get: `/${feedbackRoot}/:feedbackId`,
      list: `/${feedbackRoot}`,
    },
  },
  chat: {
    tags: ['Chat'],
    root: chatRoot,
    commands: {
      create: `/${chatRoot}`,
      send_message: `/${chatRoot}/:chatId/send-message`,
      read_message: `/${chatRoot}/:chatId/read-message`,
    },
    queries: {
      get: `/${chatRoot}/:chatId`,
      list: `/${chatRoot}`,
    },
  },
  notification: {
    tags: ['Notification'],
    root: notificationRoot,
    commands: {
      read: `/${notificationRoot}/:notificationId/read`,
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
      get: `/${mediaRoot}/:mediaId`,
    },
  },
} as const;
