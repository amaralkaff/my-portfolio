import "@testing-library/jest-dom";
import { toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

global.importMetaEnv = {
  VITE_FIREBASE_API_KEY: "IzaSyBTe6SqKhbJm9GKokz0ECme-S8egwvI9Ds",
  VITE_FIREBASE_AUTH_DOMAIN: "test1-ba28d.firebaseapp.com",
  VITE_FIREBASE_PROJECT_ID: "test1-ba28d",
  VITE_FIREBASE_STORAGE_BUCKET: "test1-ba28d.appspot.com",
  VITE_FIREBASE_MESSAGING_SENDER_ID: "1063595510246",
  VITE_FIREBASE_APP_ID: "1:1063595510246:web:52a2eb74f8aebd0187ee27",
  VITE_FIREBASE_MEASUREMENT_ID: "G-MLZK6HP5KR",
  VITE_EMAILJS_SERVICE_ID: "service_suddap4",
  VITE_EMAILJS_TEMPLATE_ID: "template_42uf6qf",
  VITE_EMAILJS_PUBLIC_KEY: "kF27QmdlmrnNOuZcE",
};
