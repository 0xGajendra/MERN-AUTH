import dotenv from 'dotenv'
dotenv.config();
import {MailtrapClient} from 'mailtrap'

const TOKEN = process.env.MAILTRAP_TOKEN;
console.log(TOKEN);

export const mailtrapClient = new MailtrapClient({
  token: TOKEN,
});

export const sender = {
  email: "hello@demomailtrap.co",
  name: "Gajendra Rao",
};
