import Header from "@/app/shared/Header";
import { MyStoryProps } from "./type";

export default function MyStory({ title, subTitle, events }: MyStoryProps) {
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
        <div className="relative">
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
        </div>
      </div>
    </section>
  );
}
