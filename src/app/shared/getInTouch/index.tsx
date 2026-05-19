"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import Header from "../Header";
import Container from "../Container";
import Button from "../Button";
import Card from "../Card";
import { contactData } from "@/constants/contactItems";
import Toast from "../toast";
import { SEND_EMAIL_API } from "@/app/api/contact/api";

export default function GetInTouch({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const t = useTranslations("GetInTouch");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    honeypot: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [toast, setToast] = useState({
    show: false,
    type: "success" as "success" | "failed",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(SEND_EMAIL_API, {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (data.success) {
        setToast({
          show: true,
          type: "success",
          message: t("SuccessMessage"),
        });
        setForm({
          name: "",
          email: "",
          phone: "",
          message: "",
          honeypot: "",
        });
      } else {
        setToast({
          show: true,
          type: "failed",
          message: t("FailedMessage"),
        });
      }
    } catch {
      setToast({
        show: true,
        type: "failed",
        message: "Failed to send message",
      });
    }

    setLoading(false);
  };

  return (
    <>
      <section
        className="bg-primary text-secondary py-[50px] md:py-[100px] border-t border-dark-gray"
        id="getInTouch"
      >
        <Container>
          <div className="flex flex-col gap-[64px]">
            <Header
              blockStyles="items-center"
              isDark={false}
              subHeadingStyles="text-center"
              heading={title}
              subHeading={description}
              as="h2"
              subAs="h3"
            />
            <div className="flex flex-col-reverse lg:flex-row justify-between items-start gap-[48px] px-[20px]">
              <div className="w-full flex flex-row lg:flex-col flex-wrap justify-between items-start gap-[32px] mt-[50px] lg:mt-[0px]">
                {contactData &&
                  contactData.map((item, i) => (
                    <Link
                      key={i}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={t(item.key)}
                      aria-label={t(item.key)}
                      className="w-[150px] sm:w-[350px] flex flex-col lg:flex-row justify-start items-start gap-[16px] hover:scale-102 transition-all duration-300"
                    >
                      <div className="flex justify-center items-center bg-accent/10 rounded-[50px] p-[15px]">
                        <Image
                          src={item.icon}
                          alt={t(item.key) + "icon"}
                          width={24}
                          height={24}
                          className="object-cover w-[16px] h-[16px] sm:w-[24px] sm:h-[24px]"
                        />
                      </div>
                      <Card
                        stylesOfCard="flex flex-col items-start gap-[4px]"
                        primaryText={t(item.key)}
                        primaryTextStyles="text-[16px] sm:text-[20px] font-[500] leading-[150%] text-secondary/80"
                        textBlockStyles="flex flex-col items-start gap-[4px]"
                        secondaryText={item.value}
                        secondaryTextStyles="text-[12px] sm:text-[16px] font-[400] leading-[150%] text-accent"
                        description={t(item.sub)}
                        descriptionStyles="text-[12px] sm:text-[14px] font-[500] leading-[143%] text-secondary/50"
                      />
                    </Link>
                  ))}
              </div>

              <div className="w-full flex flex-col gap-[25px] bg-secondary-transparent rounded-[6px] p-[18px] sm:p-[32px]">
                <h3
                  className="text-[28px] font-[500] leading-[150%]"
                  style={{ fontFamily: "Oswald" }}
                >
                  {t("SendMessage")}
                </h3>

                <form
                  onSubmit={submitForm}
                  className="w-full flex flex-col items-center gap-[16px]"
                >
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder={t("YourName")}
                    className="w-full h-[50px] bg-secondary-transparent rounded-[6px] p-[16px] border-[1px] border-accent"
                    required
                  />

                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder={t("YourEmail")}
                    className="w-full h-[50px] bg-secondary-transparent rounded-[6px] p-[16px] border-[1px] border-accent"
                    required
                  />

                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder={t("PhoneNumber")}
                    className="w-full h-[50px] bg-secondary-transparent rounded-[6px] p-[16px] border-[1px] border-accent"
                    onKeyDown={(e) => {
                      if (
                        !/[0-9+\-\s()]/.test(e.key) &&
                        e.key !== "Backspace" &&
                        e.key !== "Delete"
                      ) {
                        e.preventDefault();
                      }
                    }}
                  />

                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder={t("YourDream")}
                    rows={5}
                    className="w-full bg-secondary-transparent rounded-[6px] p-[16px] border-[1px] border-accent resize-none"
                    required
                  />

                  <input
                    type="text"
                    name="honeypot"
                    value={form.honeypot}
                    onChange={handleChange}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <Button
                    type="submit"
                    disabled={loading}
                    text={loading ? "Sending..." : t("SendMessage")}
                    styles="w-full h-[50px] text-[12px] sm:text-[16px] rounded-[6px] px-[24px] py-[10px] font-[600]"
                    designType="gold"
                  />
                </form>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <Toast
        show={toast.show}
        type={toast.type}
        message={toast.message}
        onClose={() => setToast((prev) => ({ ...prev, show: false }))}
      />
    </>
  );
}
