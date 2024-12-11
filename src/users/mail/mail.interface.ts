export interface SendMailOptions<Context> {
    to: string;
    subject: string;
    template: string;
    context: Context;
}
  
// 5
export interface IMail<Context> {
    sendMail(opts: SendMailOptions<Context>): Promise<void>;
}