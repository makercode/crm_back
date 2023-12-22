import MAILS from "@constants/mails";

const mail_to_name = (email: string) => {
	let isCommon = false;
	MAILS.forEach((mail) => {
		if(email.includes(mail)) isCommon = true;
	})

	return isCommon ? email.replace(/@/g,'_').replace(/\./g, '_') :  email.substring(email.indexOf('@') +1 , email.length).replace(/\./g, '_')
}

export default mail_to_name;