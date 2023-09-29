export interface MailService {
  sendMail(props: { to: string; subject: string; html: string }): Promise<void>;
}
