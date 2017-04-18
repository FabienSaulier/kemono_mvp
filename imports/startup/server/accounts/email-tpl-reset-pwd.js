import { Accounts } from 'meteor/accounts-base';

const name = 'Kemono';
const email = 'contact@kemono.fr';
const from = `${name} ${email}`;
const emailTemplates = Accounts.emailTemplates;

emailTemplates.siteName = name;
emailTemplates.from = from;

emailTemplates.resetPassword = {
  subject() {
    return `[${name}] Réinitialisez votre mot de passe`;
  },
  text(user, url) {
    const userEmail = user.emails[0].address;
    const urlWithoutHash = url.replace('#/', '');

    return `Une réinitialisation du mot de passe a été demandée pour le compte lié à cette
     adresse (${userEmail}). Pour réinitialiser le mot de passe, visitez le lien suivant:
    \n\n${urlWithoutHash}\n\n Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer
     cet e-mail. Si vous avez besoin d'un renseignement, contactez notre équipe support:
    ${email}.`;
  },
};
