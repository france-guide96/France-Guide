import { StaticImageData } from "next/image";
import phoneIcon from "@/assets/contacts/phone.png";
import emailIcon from "@/assets/contacts/email.png";
import viberIcon from "@/assets/contacts/viber.png";
import whatsAppIcon from "@/assets/contacts/wp.png";
import telegramIcon from "@/assets/contacts/telegram.png";

export type ContactItem = {
  icon: StaticImageData;
  key: string;
  value: string;
  sub: string;
  href: string;
};

export const contactData: ContactItem[] = [
  {
    icon: phoneIcon,
    key: "Phone",
    value: "+33-609-57-27-80",
    sub: "Availability",
    href: "tel:+33609572780",
  },
  {
    icon: emailIcon,
    key: "Email",
    value: "sagatravelparis@yahoo.fr",
    sub: "Response",
    href: "mailto:sagatravelparis@yahoo.fr",
  },
  {
    icon: viberIcon,
    key: "Viber",
    value: "+33-609-57-27-80",
    sub: "ConvenientCommunication",
    href: "viber://chat?number=%2B33609572780",
  },
  {
    icon: whatsAppIcon,
    key: "WhatsApp",
    value: "+33-609-57-27-80",
    sub: "QuickResponses",
    href: "https://wa.me/33609572780",
  },
  {
    icon: telegramIcon,
    key: "Telegram",
    value: "@GarikGuideParis",
    sub: "TelegramSupport",
    href: "https://t.me/GarikGuideParis",
  },
];
