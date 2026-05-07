"use client"

import { useEffect, useRef } from "react";
import { MyStoryProps } from "./type";
import Header from "@/app/shared/Header";

export default function MyStory({ title, subTitle, events }: MyStoryProps) {

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slider = scrollRef.current;
    if (!slider) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const mouseDown = (e: MouseEvent) => {
      isDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };

    const mouseLeave = () => {
      isDown = false;
    };

    const mouseUp = () => {
      isDown = false;
    };

    const mouseMove = (e: MouseEvent) => {
      if (!isDown) return;

      e.preventDefault();

      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.5;

      slider.scrollLeft = scrollLeft - walk;
    };

    slider.addEventListener("mousedown", mouseDown);
    slider.addEventListener("mouseleave", mouseLeave);
    slider.addEventListener("mouseup", mouseUp);
    slider.addEventListener("mousemove", mouseMove);

    return () => {
      slider.removeEventListener("mousedown", mouseDown);
      slider.removeEventListener("mouseleave", mouseLeave);
      slider.removeEventListener("mouseup", mouseUp);
      slider.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  return (
    <section className="py-20">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <Header
          heading={title}
          headingStyles="font-[500]"
          subHeading={subTitle}
          isDark
          blockStyles="flex items-center mb-12"
        />
        {/* <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-600 hidden md:block"></div>
          <div className="space-y-12">
            {events?.map((event, index) => (
              <div
                key={event.id}
                className={`flex items-start md:items-center gap-12 relative ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div
                  className={`flex-1 ml-12 md:ml-0 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}
                >
                  <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-50 inline-block max-w-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 group">
                    <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-accent to-yellow-600 mb-4 tracking-tighter">
                      {event.year}
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4 uppercase tracking-tight group-hover:text-accent transition-colors">
                      {event.eventTitle}
                    </h3>
                    <p className="text-slate-500 leading-relaxed text-lg font-medium">
                      {event.description}
                    </p>
                  </div>
                </div>

                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-10 h-10 bg-white rounded-full border-[6px] border-accent shadow-xl z-20 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-accent rounded-full animate-pulse" />
                </div>

                <div className="hidden md:block flex-1" />
              </div>
            ))}
          </div>
        </div>  */}
      </div>
      <div className="relative select-none">
        <div
          ref={scrollRef}
          className="overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing pt-4 pb-14"
        >
          <div className="flex gap-8 px-[50px]" style={{ width: 'fit-content', minWidth: '100%' }}>
            {events?.map((item, idx) => (
              <div key={idx} className="relative flex flex-col items-center w-72 flex-shrink-0">
                <div className="flex flex-col gap-4 items-start bg-secondary rounded-2xl p-3 shadow-md border border-gray-200 hover:shadow-2xl hover:scale-102 transition-all duration-300 w-full group z-5">
                  <div className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-gold/40 to-gold text-secondary font-bold rounded-xl shadow-md text-xl">
                    {item.year}
                  </div>

                  <h3 className="text-md font-bold text-primary group-hover:text-gold transition-colors">
                    {item.eventTitle}
                  </h3>

                  <p className="text-primary/50">
                    {item.description}
                  </p>
                </div>

                {idx < events.length - 1 && (
                  <div className="absolute top-16 -right-8 w-8 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500"></div>
                )}

                <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-secondary rounded-full border-4 border-gold"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mt-[30px]">
          <div className="h-1 bg-gradient-to-r from-gold/50 via-gold/80 to-gold rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
