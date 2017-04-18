import { Accounts } from 'meteor/accounts-base';

const name = 'Kemono';
const email = 'contact@kemono.fr';
const from = `${name} ${email}`;
const emailTemplates = Accounts.emailTemplates;

emailTemplates.siteName = name;
emailTemplates.from = from;

emailTemplates.verifyEmail = {
  subject() {
    return `[${name}] Vérifier votre adresse mail`;
  },
  text(user, url) {
    const userEmail = user.emails[0].address;
    const urlWithoutHash = url.replace('#/', '');

    let emailBody = `Pour vérifier votre adresse email (${userEmail}) visitez le lien suivant::\n\n${urlWithoutHash}\n\n Si vous n'avez pas demandé cette vérification, ignorez cet email. Si vous avez besoin d'un renseignement, contactez notre équipe support: ${email}.`;

    return emailBody;
  }
};
