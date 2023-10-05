// Root
const authRoot = 'auth';
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
  auth: {
    tags: ['Auth'],
    root: authRoot,
    commands: {
      login: `/${authRoot}/login`,
    },
  },
  user: {
    tags: ['User'],
    root: usersRoot,
    commands: {
      create: `/${usersRoot}`,
      req_confirm_account_token: `/${usersRoot}/request-confirm-account-token`,
      confirm_account: `/${usersRoot}/confirm-account`,
      req_change_password: `/${usersRoot}/request-change-password`,
      change_password: `/${usersRoot}/change-password`,
      req_change_email: `/${usersRoot}/request-change-email`,
      change_email: `/${usersRoot}/change-email`,
      update_profile: `/${usersRoot}/profile`,
    },
    queries: {
      me: `/${usersRoot}/me`,
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
      cancel: `/${reservationRoot}/:reservationId`,
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
      upload: `/${mediaRoot}/upload`,
    },
    queries: {
      get: `/${mediaRoot}/:mediaId`,
    },
  },
} as const;
