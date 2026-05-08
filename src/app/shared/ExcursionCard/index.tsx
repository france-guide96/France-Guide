import { useLocale, useTranslations } from "next-intl";
import { ExcursionProps } from "./type";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, Clock, Users } from "lucide-react";
import { motion } from "motion/react";

export default function ExcursionCard({
    image,
    title,
    description,
    rating,
    category,
    duration,
    group,
    isLarge,
    href,
}: ExcursionProps) {
    const t = useTranslations("HeroSection");
    const locale = useLocale();

    return (
        <Link href={`/${locale}${href}`}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`group relative overflow-hidden rounded-2xl cursor-pointer shadow-xl h-full
                    ${isLarge
                        ? "aspect-[4/3] md:aspect-auto md:min-h-[500px]"
                        : "aspect-square md:aspect-auto md:min-h-[240px]"
                    }`}
            >
                <div className="absolute inset-0 z-0 scale-105 transition-transform duration-1000 group-hover:scale-100">
                    <Image
                        width={1000}
                        height={1000}
                        src={image}
                        alt={title}
                        className="h-full w-full object-cover"
                        referrerPolicy="no-referrer"
                    />
                </div>

                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute top-2 left-2 md:top-6 md:left-6 z-20 flex gap-1.5">
                    <span className="bg-accent text-black text-[9px] md:text-[10px] font-bold px-2 md:px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1 shadow-lg">
                        <Star className="h-2.5 w-2.5 md:h-3 md:w-3 fill-black" /> {rating}
                    </span>
                    <span className="backdrop-blur-md bg-secondary/10 border border-secondary/20 text-secondary text-[9px] md:text-[10px] font-bold px-2 md:px-3 py-1 rounded-full uppercase tracking-widest">
                        {t(category)}
                    </span>
                </div>

                <div className="absolute inset-x-0 bottom-0 z-20 p-3 md:p-8 flex flex-col gap-1.5 md:gap-0">
                    <h3
                        className={`font-serif leading-tight text-secondary group-hover:text-accent transition-colors duration-300
                            ${isLarge
                                ? "text-lg md:text-4xl md:mb-4"
                                : "text-sm md:text-2xl md:mb-2"
                            }`}
                    >
                        {title}
                    </h3>

                    <p className={`hidden md:block text-secondary leading-relaxed transition-all duration-500 overflow-hidden
                        ${isLarge ? "text-base md:mb-6 max-h-0 group-hover:max-h-24" : "text-sm md:mb-4 max-h-0 group-hover:max-h-12"}`}
                    >
                        {t(description)}
                    </p>

                    <div className="flex items-center justify-between border-t border-secondary/20 pt-1.5 md:pt-4">
                        <div className="flex gap-2 md:gap-4">
                            <span className="flex items-center gap-1 text-[9px] md:text-[10px] font-bold uppercase text-secondary tracking-wider">
                                <Clock className="h-2.5 w-2.5 md:h-3 md:w-3 text-accent shrink-0" />
                                {duration + " " + t("Hours")}
                            </span>
                            <span className="flex items-center gap-1 text-[9px] md:text-[10px] font-bold uppercase text-secondary tracking-wider">
                                <Users className="h-2.5 w-2.5 md:h-3 md:w-3 text-accent shrink-0" />
                                {group + " " + t("People")}
                            </span>
                        </div>
                        <div className="hidden md:flex items-center gap-1 md:gap-2 text-secondary font-bold text-[9px] md:text-[11px] uppercase tracking-widest">
                            <span>{t("Details")}</span>
                            <ArrowRight className="h-3 w-3 md:h-4 md:w-4 text-accent group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}