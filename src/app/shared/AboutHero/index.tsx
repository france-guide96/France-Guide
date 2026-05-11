// import { ImageWithFallback } from "@/app/shared/imageWithFallback/imageWithFallback";
// import { Star } from "lucide-react";
// import { AboutHeroProps } from "./type";
// import SmallHeader from "../SmallHeader";
// import Container from "../Container";
// import cuteSmile from "@/assets/about/cuteSmile.jpg";
// import heroBg from "@/assets/about/paris.jpg";

// export default async function AboutHero({
//   description,
//   statistics,
//   aboutPageImage,
//   countExcursions,
// }: AboutHeroProps) {
//   const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
//   const rawImageUrl = aboutPageImage?.[0]?.url;

//   const imageURL = rawImageUrl
//     ? rawImageUrl.startsWith("http")
//       ? rawImageUrl
//       : `${STRAPI_URL}${rawImageUrl}`
//     : cuteSmile;

//   return (
//     <section className="relative min-h-screen overflow-hidden">
//       <ImageWithFallback
//         src={heroBg}
//         alt="hero background"
//         fill
//         className="absolute inset-0 w-full h-full object-cover"
//         unoptimized
//         priority
//       />
//       <Container>
//         <div className="relative sm:px-6 px-[10px]">
//           <div className="min-h-screen flex gap-16 items-center justify-between pt-[120px]">
//             <div className="flex-2 text-secondary flex flex-col items-start justify-center gap-[10px] md:gap-[20px]">
//               <SmallHeader />
//               <div className="p-[20px] bg-secondary/10 rounded-2xl backdrop-blur">
//                 <p className="max-w-[700px] text-[12px] md:text-base text-secondary font-bold p-[10px] md:p-0">
//                 {description}
//               </p>
//               </div>
//             </div>

//             <div className="flex-1 hidden lg:flex flex-col justify-center items-center">
//               <div className="relative w-full">
//                 <div className="backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/20">
//                   <div className="aspect-square relative">
//                     <ImageWithFallback
//                       fill
//                       src={imageURL}
//                       alt="Гарик Саакян"
//                       className="object-cover"
//                       unoptimized
//                       loading="eager"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
//                   </div>
//                 </div>
//                 <div className="absolute -top-4 -right-4 bg-amber-500 text-secondary rounded-2xl p-4 shadow-2xl">
//                   <div className="text-2xl font-bold">{countExcursions}+</div>
//                   <div className="text-xs">экскурсий</div>
//                 </div>
//               </div>
//               <div className="w-full grid grid-cols-3 gap-6 pt-6">
//                 {statistics &&
//                   statistics.map((stat, index) => {
//                     const isRating =
//                       index === 2 || stat.label.toLowerCase().includes("Рейтинг");
//                     return (
//                       <div
//                         key={stat.id}
//                         className={`text-center ${index === 1 ? "border-l border-r border-white/20" : ""}`}
//                       >
//                         {isRating ? (
//                           <div className="flex items-start justify-center gap-1 mb-1">
//                             <span className="text-4xl font-bold text-amber-400">
//                               {stat.value}
//                             </span>
//                             <Star
//                               className="w-6 h-6 text-amber-400 mt-2"
//                               fill="currentColor"
//                             />
//                           </div>
//                         ) : (
//                           <div className="text-4xl font-bold text-amber-400 mb-1">
//                             {stat.value}
//                           </div>
//                         )}
//                         <div className="text-sm text-gray-300">{stat.label}</div>
//                       </div>
//                     );
//                   })}
//               </div>
//             </div>
//           </div>
//         </div>
//       </Container>
//     </section>
//   );
// }

import { ImageWithFallback } from "@/app/shared/imageWithFallback/imageWithFallback";
import { Star } from "lucide-react";
import { AboutHeroProps } from "./type";
import Container from "../Container";
import cuteSmile from "@/assets/about/cuteSmile.jpg";
import heroBg from "@/assets/about/paris.jpg";

export default async function AboutHero({
  description,
  statistics,
  aboutPageImage,
  countExcursions,
}: AboutHeroProps) {
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
  const imageURL = aboutPageImage?.[0]?.url 
    ? (aboutPageImage[0].url.startsWith("http") ? aboutPageImage[0].url : `${STRAPI_URL}${aboutPageImage[0].url}`) 
    : cuteSmile;

  return (
    <section className="relative w-full min-h-[110vh] bg-[#fdfdfd] flex flex-col justify-between overflow-hidden">
      
      {/* 1. ВЕРХНЯЯ ЧАСТЬ: АТМОСФЕРНЫЙ ФОН (ПОЛОВИНА ЭКРАНА) */}
      <div className="absolute top-0 left-0 w-full h-[60vh] z-0">
        <ImageWithFallback
          src={heroBg}
          alt="Paris"
          fill
          className="object-cover grayscale-[0.3] brightness-90"
          unoptimized
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#fdfdfd]" />
      </div>

      <Container>
        <div className="relative z-10 pt-[25vh] md:pt-[35vh]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-start">
            
            {/* 2. ЛЕВАЯ КОЛОНКА: КОНТЕНТ */}
            <div className="lg:col-span-6 flex flex-col pt-12">
              <div className="mb-8 overflow-hidden">
                 <span className="inline-block text-amber-600 font-medium tracking-[0.2em] uppercase text-xs mb-4">
                   Professional Private Guide
                 </span>
                 <h1 className="text-6xl md:text-[100px] font-serif leading-[0.85] text-[#1a1a1a] -ml-1">
                   Garik <br /> Saakyan
                 </h1>
              </div>

              <div className="max-w-md border-l-2 border-amber-500 pl-8 mt-4">
                <p className="text-lg text-gray-700 font-light leading-relaxed italic">
                  {description}
                </p>
                
                {/* СУХАЯ И ЧИСТАЯ СТАТИСТИКА */}
                <div className="flex gap-10 mt-12">
                   {statistics?.slice(0, 2).map((stat) => (
                     <div key={stat.id}>
                        <div className="text-3xl font-bold text-[#1a1a1a]">{stat.value}</div>
                        <div className="text-[10px] uppercase tracking-widest text-gray-400 mt-1">{stat.label}</div>
                     </div>
                   ))}
                </div>
              </div>
            </div>

            {/* 3. ПРАВАЯ КОЛОНКА: ГЕОМЕТРИЧНОЕ ФОТО */}
            <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
               <div className="relative w-full max-w-[500px] group">
                  {/* Задний фон-декор */}
                  <div className="absolute -top-10 -left-10 w-full h-full border-[1px] border-gray-200 z-0 hidden md:block" />
                  
                  {/* Основное фото */}
                  <div className="relative aspect-[3/4] overflow-hidden shadow-[30px_30px_0px_#f59e0b] group-hover:shadow-[20px_20px_0px_#f59e0b] transition-all duration-500 z-10">
                    <ImageWithFallback
                      fill
                      src={imageURL}
                      alt="Garik"
                      className="object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
                      unoptimized
                    />
                  </div>

                  {/* Плашка рейтинга снизу справа */}
                  <div className="absolute -bottom-6 -left-6 bg-[#1a1a1a] text-white p-8 z-20 min-w-[180px]">
                    <div className="flex items-center gap-2 mb-2">
                       <span className="text-4xl font-bold text-amber-500">{countExcursions}+</span>
                    </div>
                    <div className="text-xs uppercase tracking-[0.2em] text-gray-400 font-medium">
                      Проведенных <br /> экскурсий
                    </div>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </Container>

      {/* ФИНАЛЬНЫЙ ШТРИХ: ДЕКОРАТИВНЫЙ ТЕКСТ НА ФОНЕ */}
      <div className="absolute bottom-10 right-[-5%] hidden lg:block">
        <span className="text-[15vw] font-black text-black/[0.03] select-none uppercase pointer-events-none">
          Tour Paris
        </span>
      </div>
    </section>
  );
}
