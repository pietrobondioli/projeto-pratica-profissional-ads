export interface MailService {
  sendMail(props: {
    to: string;
    subject: string;
    message: string;
  }): Promise<void>;
}
