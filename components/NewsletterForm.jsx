import CustomForm from "./CustomForm";
import MailchimpSubscribe from "react-mailchimp-subscribe";
const NewsletterForm = ({ status, message, className, style, onSubmitted }) => {
  return (
    <MailchimpSubscribe
      url={process.env.MAILCHIMP}
      render={({ subscribe, status, message }) => (
        <CustomForm
          status={status}
          message={message}
          onValidated={(formData) => subscribe(formData)}
        />
      )}
    />
  );
};

export default NewsletterForm;
