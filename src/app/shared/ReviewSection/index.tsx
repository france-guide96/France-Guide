"use client";

import { useState, useEffect } from "react";
import { useRouter } from "@/navigation";
import { useTranslations } from "next-intl";
import { ReviewSectionType } from "./type";
import ReviewComponent from "@/app/shared/ReviewComponent";
import Button from "@/app/shared/Button";
import Header from "@/app/shared/Header";
import { reviewsData } from "@/constants/reviewsData";


export default function ReviewSection({ variant, title, limit = 3, designType }: ReviewSectionType) {
    const [displayReviews, setDisplayReviews] = useState<any[]>([]);
    const router = useRouter();
    const t = useTranslations("Review")

    useEffect(() => {
        const shuffled = [...reviewsData]
            .sort(() => 0.5 - Math.random())
            .slice(0, limit);
        setDisplayReviews(shuffled);
    }, [limit]);

    const wrapperStyles = variant === "list"
        ? "bg-gradient-to-br from-gray-900 to-gray-800 border border-dark-gray/50 rounded-2xl p-8 transition-all"
        : "";

    return (
        <section className={`flex flex-col items-center gap-[50px] ${wrapperStyles}`}>
            {title && (
                <Header
                    heading={t("Reviews")}
                    blockStyles="flex flex-col items-center mt-[100px]"
                    isDark={true}
                />
            )}

            <ReviewComponent reviews={displayReviews} variant={variant} />

            <Button
                onClick={() => router.push("/review")}
                styles="mt-8 w-full py-3 border rounded-lg md:w-max md:px-10 mx-auto block"
                designType={(designType || "transparent") as "transparent"}
            >
                {t("ShowReviews")}
            </Button>
        </section>
    );
}