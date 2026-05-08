"use client"

import { useTranslations } from "next-intl";
import Link from "next/link";

export default function NotFoundContent() {

    const t = useTranslations("NotFound")

    return (
        <div className="h-screen relative overflow-hidden bg-secondary from-blue-50 via-white to-red-50">
            <div className="relative size-full flex items-center justify-center px-6">
                <div className="max-w-2xl w-full text-center">
                    <div className="mb-8">
                        <h1 className="text-[12rem] leading-none font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-white to-red-600 drop-shadow-lg">
                            404
                        </h1>
                    </div>

                    <div className="flex justify-center gap-2 mb-8">
                        <div className="w-16 h-1 bg-blue-600 rounded-full"></div>
                        <div className="w-16 h-1 bg-white border border-gray-300 rounded-full"></div>
                        <div className="w-16 h-1 bg-red-600 rounded-full"></div>
                    </div>

                    <h2 className="text-4xl mb-4 text-gray-800">{t("LostInFrance")}</h2>
                    <p className="text-xl text-gray-600 mb-12 max-w-md mx-auto">
                        {t("ThisPage")}
                    </p>

                    <div className="flex flex-wrap gap-4 justify-center mb-12">
                        <Link
                            href="/"
                            rel="noopener noreferrer"
                            title={t("ReturnHome")}
                            aria-label={t("ReturnHome")}
                            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-lg">
                            {t("ReturnHome")}
                        </Link>

                    </div>

                </div>
            </div>


        </div>
    );
}