import {
    Mail,
    MessageCircle,
    MessageSquare,
    MessageSquareHeart,
    Phone,
    Send,
} from "lucide-react";

export const getContactMethods = (t: any) => [
    {
        id: "whatsapp",
        href: "https://wa.me",
        icon: <MessageCircle className="text-green-500" />,
        label: "WhatsApp",
        sub: t("QuickReply"),
    },
    {
        id: "viber",
        href: "https://viber.com",
        icon: <MessageSquare className="text-purple-500" />,
        label: "Viber",
        sub: t("QuickReply"),
    },
    {
        id: "telegram",
        href: "https://t.me",
        icon: <Send className="text-sky-400" />,
        label: "Telegram",
        sub: "@username",
    },
    {
        id: "email",
        href: "mailto:garik@france-gid.ru",
        icon: <Mail className="text-accent" />,
        label: "Email",
        sub: "garik@france-gid.ru",
    },
    {
        id: "phone",
        href: "tel:+33609572780",
        icon: <Phone className="text-blue-500" />,
        label: t("Call"),
        sub: "+33 6 09 57 27 80",
    },
    {
        id: "instagram",
        href: "https://www.instagram.com/garik.vash.gid.paris/",
        icon: <MessageSquareHeart className="text-red-500" />,
        label: "Instagram",
        sub: "@garik.vash.gid.paris",
    }
];