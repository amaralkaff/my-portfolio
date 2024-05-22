// pages/Contact.jsx
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  subject: Yup.string().max(100, "Too Long!"),
  message: Yup.string().required("Required"),
});

const ContactForm = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-4">Contact Me</h2>
      <Formik
        initialValues={{ name: "", email: "", subject: "", message: "" }}
        validationSchema={ContactSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
            resetForm();
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="w-full max-w-lg">
            <div className="mb-4">
              <Field
                type="text"
                name="name"
                placeholder="Your Name"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mb-4">
              <Field
                type="email"
                name="email"
                placeholder="Your Email"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mb-4">
              <Field
                type="text"
                name="subject"
                placeholder="Subject"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              <ErrorMessage
                name="subject"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mb-6">
              <Field
                name="message"
                as="textarea"
                placeholder="Your Message"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                rows="4"
              />
              <ErrorMessage
                name="message"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </motion.button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContactForm;
