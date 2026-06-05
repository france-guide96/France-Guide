"use client";

import { useRouter } from "@/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import {
  Star,
  Clock,
  Users,
  MapPin,
  Check,
  Calendar,
  ChevronDown,
} from "lucide-react";
import { Formats2, TourCard } from "lib/utils/tourCardType";
import Button from "@/app/shared/Button";
import Container from "@/app/shared/Container";
import { AnimatePresence, motion } from "framer-motion";
import BackButton from "@/app/shared/BackButton";
import ImageExpander from "@/app/shared/ImageExpander";
import { ImageLoader } from "@/app/shared/ImageLoader";

const BookingModal = dynamic(() => import("@/app/shared/BookingModal"), {
  ssr: false,
});

type Props = {
  tour: TourCard;
};

export function TourDetail({ tour }: Props) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [dateError, setDateError] = useState<boolean>(false);
  const [bookingData, setBookingData] = useState({
    date: "",
    time: "09:00",
    guests: "1-3",
  });

  const router = useRouter();
  const t = useTranslations("TourCard");

  const allGalleryImages = tour.gallery?.flatMap((g) => g.image) || [];

  const getTodayDate = () => {
    return new Date().toISOString().split("T")[0];
  };

  const minDate = getTodayDate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({ ...prev, [name]: value }));
  };

  const currentPrice =
    tour?.pricing?.find((p) => p.range === bookingData.guests)?.price ||
    tour?.price;

  const handleBookClick = () => {
    if (!bookingData.date) {
      setDateError(true);
      setTimeout(() => setDateError(false), 3000);
      return;
    }

    const selectedDateTime = new Date(
      `${bookingData.date}T${bookingData.time}`,
    );

    const minAllowedTime = new Date();
    minAllowedTime.setHours(minAllowedTime.getHours() + 1);

    if (selectedDateTime < minAllowedTime) {
      setDateError(true);
      setTimeout(() => setDateError(false), 3000);
      return;
    }

    setIsModalOpen(true);
  };

  const resetBookingForm = () => {
    setBookingData({
      date: "",
      time: "09:00",
      guests: "1-3",
    });
  };

  const handleBack = () => {
    router.back();
  };

  const getImageUrl = (url?: string) => {
    if (!url) return null;
    return url.startsWith("http")
      ? url
      : `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
  };

  const getBestImageFormat = (formats?: Formats2, fallbackUrl?: string) => {
    if (!formats) return getImageUrl(fallbackUrl);

    return (
      getImageUrl(formats.large?.url) ||
      getImageUrl(formats.medium?.url) ||
      getImageUrl(formats.small?.url) ||
      getImageUrl(formats.thumbnail?.url) ||
      getImageUrl(fallbackUrl)
    );
  };

  return (
    <>
      <Container>
        <main className="px-[20px] py-[100px]">
          <BackButton
            styles="text-secondary/50 hover:text-secondary"
            onClick={handleBack}
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="space-y-4">
                <div className="relative rounded-2xl overflow-hidden">
                  <ImageLoader
                    width={100}
                    height={100}
                    src={
                      getBestImageFormat(
                        tour?.bgImg?.formats,
                        tour?.bgImg?.url,
                      ) || ""
                    }
                    alt="Лувр"
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                </div>

                {!tour?.isNewDesign && (
                  <div className="w-full mt-6">
                    <ImageExpander
                      images={
                        allGalleryImages?.map((img, idx) => ({
                          src: getImageUrl(img.url) || "",
                          alt: img.alternativeText || `Gallery ${idx + 1}`,
                          width: img.width,
                          height: img.height,
                        })) || []
                      }
                      isGrid
                    />
                  </div>
                )}
              </div>

              <div>
                <h1 className="text-[24px] md:text-[36px] font-[700] leading-[111%] text-secondary mb-4">
                  {tour?.primaryText}
                </h1>
                <div className="flex flex-col md:flex-row items-center gap-6 text-gray-400">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-accent text-accent"
                        />
                      ))}
                    </div>
                    <span className="text-secondary font-[600]">
                      {tour?.rating}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{tour?.category}</span>
                  </div>
                </div>
              </div>

              <div className="md:grid grid-cols-3 gap-4 flex flex-wrap">
                <div className="flex-1 flex md:block items-center gap-4 bg-gradient-to-br from-gray-900 to-gray-800 border border-secondary/10 rounded-[14px] p-4 sm:p-8 transition-all hover:border-accent/50">
                  <Clock className="w-8 h-8 text-accent mb-3" />
                  <div>
                    <div className="text-[14px] font-[400] leading-[143%] text-secondary/50 mb-1">
                      {t("Duration")}
                    </div>
                    <div className="text-[20px] font-[600] leading-[140%] text-secondary">
                      {tour?.duration}
                    </div>
                  </div>
                </div>
                <div className="flex-1 flex md:block items-center gap-4 bg-gradient-to-br from-gray-900 to-gray-800 border border-secondary/10 rounded-[14px] p-4 sm:p-8 transition-all hover:border-accent/50">
                  <Users className="w-8 h-8 text-accent mb-3" />
                  <div>
                    <div className="text-[14px] font-[400] leading-[143%] text-secondary/50 mb-1">
                      {t("GroupSize")}
                    </div>
                    <div className="text-[20px] font-[600] leading-[140%] text-secondary">
                      {t("UpTo") + " " + "7" + " " + t("People")}
                    </div>
                  </div>
                </div>
                <div className="flex-1 flex md:block items-center gap-4 bg-gradient-to-br from-gray-900 to-gray-800 border border-secondary/10 rounded-[14px] p-4 sm:p-8 transition-all hover:border-accent/50">
                  <Calendar className="w-8 h-8 text-accent mb-3" />
                  <div className="text-[14px] font-[400] leading-[143%] text-secondary/50 mb-1">
                    {t("Available")}
                    <div></div>
                    <div className="text-[20px] font-[600] leading-[140%] text-secondary">
                      {t("Daily")}
                    </div>
                  </div>
                </div>
              </div>

              {tour?.included?.length > 0 && (
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-dark-gray/50 rounded-2xl p-4 sm:p-8 transition-all hover:border-accent/50">
                  <h2 className="text-[24px] font-[700] leading-[133%] text-secondary mb-6">
                    {t("WhatsIncluded")}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tour?.included?.map((item, idx: number) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="p-1 bg-green-600/20 rounded-full">
                          <Check className="w-5 h-5 text-green-500" />
                        </div>
                        <span className="text-[16px] font-[400] leading-[163%] text-secondary space-y-4 whitespace-pre-line text-base">
                          {item?.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {tour?.contentSections?.length > 0 && (
                <div className="space-y-6">
                  {tour?.contentSections?.map((section, idx: number) => (
                    <div
                      key={idx}
                      className="bg-gradient-to-br from-gray-900 to-gray-800 border border-dark-gray/50 rounded-[16px] p-4 sm:p-8 transition-all hover:border-accent/50"
                    >
                      {section?.title && (
                        <h2 className="text-[24px] font-[700] leading-[133%] text-secondary mb-6 flex items-center gap-3">
                          <div className="w-1 h-6 bg-accent rounded-full" />{" "}
                          {section?.title}
                        </h2>
                      )}

                      {section.description && (
                        <div className="text-[16px] font-[400] leading-[163%] text-secondary space-y-4 whitespace-pre-line text-base">
                          {section?.description}
                        </div>
                      )}

                      {section.isNewDesign && (
                        <div className="mt-6">
                          <ImageExpander
                            images={
                              section.newDesignImageCarousel?.map(
                                (img, idx) => ({
                                  src: getImageUrl(img.url) || "",
                                  alt:
                                    img.alternativeText || `Gallery ${idx + 1}`,
                                  width: img.width,
                                  height: img.height,
                                }),
                              ) || []
                            }
                            isGrid
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-dark-gray/50 rounded-[16px] p-4 sm:p-8 transition-all hover:border-accent/50">
                  <div className="mb-6">
                    <div className="text-secondary/50 text-[14px] font-[400] leading-[143%] mb-2">
                      {t("Pricing")}
                    </div>
                    <div className="space-y-3 mb-6">
                      {tour &&
                        tour?.pricing.map((item, idx: number) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-4 bg-dark-gray/50 border border-gray-700 rounded-[10px] hover:border-accent/50 transition-colors cursor-pointer"
                          >
                            <div>
                              <div className="text-[14px] font-[400] leading-[143%] text-secondary/50">
                                {t("FromGroup") +
                                  " " +
                                  item?.range +
                                  " " +
                                  t("People")}
                              </div>
                              <div className="text-[24px] font-[700] leading-[133%] text-accent">
                                {item?.price ? `€ ${item?.price}` : "—"}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="relative">
                      <div className="relative">
                        <label className="block text-secondary/50 text-[14px] font-[400] leading-[143%] mb-2">
                          {t("Date")}
                        </label>
                        <input
                          type="date"
                          name="date"
                          min={minDate}
                          value={bookingData?.date}
                          onChange={(e) => {
                            handleChange(e);
                            if (dateError) setDateError(false);
                          }}
                          className={`appearance-none w-full px-4 py-3 bg-dark-gray border rounded-[10px] text-secondary focus:outline-none ${dateError
                            ? "border-red-500 animate-shake shadow-[0_0_10px_rgba(239,68,68,0.2)]"
                            : "border-gray-700 focus:border-accent"
                            }`}
                        />
                        <Calendar className="pointer-events-none absolute right-4 top-2/3 -translate-y-1/2 w-4 h-4 text-accent" />
                      </div>
                      <AnimatePresence>
                        {dateError && (
                          <motion.span
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="absolute -bottom-6 left-0 text-[12px] text-red-500 font-medium"
                          >
                            {t("PleaseSelectDate")}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="relative">
                      <label className="block text-secondary/50 text-[14px] font-[400] leading-[143%] mb-2">
                        {t("Time")}
                      </label>
                      <select
                        name="time"
                        value={bookingData.time}
                        onChange={handleChange}
                        className="appearance-none w-full px-4 py-3 bg-dark-gray border border-gray-700 rounded-[10px] text-secondary focus:outline-none focus:border-accent cursor-pointer"
                      >
                        {[
                          "09:00",
                          "10:00",
                          "11:00",
                          "12:00",
                          "13:00",
                          "14:00",
                          "15:00",
                          "16:00",
                          "17:00",
                          "18:00",
                          "19:00",
                          "20:00",
                          "21:00",
                          "22:00",
                          "23:00",
                        ].map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-4 top-2/3 -translate-y-1/2 w-4 h-4 text-accent" />
                    </div>

                    <div className="relative">
                      <label className="block text-secondary/50 text-[14px] font-[400] leading-[143%] mb-2">
                        {t("NumberOfPeople")}
                      </label>
                      <select
                        name="guests"
                        value={bookingData.guests}
                        onChange={handleChange}
                        className="appearance-none w-full px-4 py-3 bg-dark-gray border border-gray-700 rounded-[10px] text-secondary focus:outline-none focus:border-accent cursor-pointer"
                      >
                        {tour?.pricing?.map((p) => (
                          <option key={p.id} value={p.range}>
                            {p.range} {t("People")}
                          </option>
                        )) || (
                            <>
                              <option value="1-3">1-3</option>
                              <option value="4-5">4-5</option>
                              <option value="6-7">6-7</option>
                            </>
                          )}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-4 top-2/3 -translate-y-1/2 w-4 h-4 text-accent" />
                    </div>
                  </div>

                  <Button
                    onClick={handleBookClick}
                    styles="w-full py-4 rounded-[10px]"
                    designType="gold"
                  >
                    {t("BookNow")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </Container>
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        resetForm={resetBookingForm}
        tourData={{
          title: tour.primaryText,
          date: bookingData.date || t("NotSelected"),
          time: bookingData.time,
          guests: bookingData.guests,
          price: `€ ${currentPrice}`,
        }}
      />
    </>
  );
}