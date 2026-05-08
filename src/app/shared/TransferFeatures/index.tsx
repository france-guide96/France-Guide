import { CheckCircle, Compass, LucideIcon, ShieldCheck } from "lucide-react";

const transferIconMap: Record<number, LucideIcon> = {
  0: ShieldCheck,
  1: Compass,
};

interface TransferFeaturesProps {
  data: {
    features: {
      id: number;
      title: string;
      description: string;
    }[];
  };
  headingStyles?: string;
  subHeadingStyles?: string;
}

export default function TransferFeatures({
  data,
  headingStyles = "",
  subHeadingStyles = "",
}: TransferFeaturesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {data?.features.map((feature, index) => {
        const Icon = transferIconMap[index] || CheckCircle;

        return (
          <div key={feature.id} className="flex gap-4">
            <div>
              <Icon className="text-accent w-6 h-6 shrink-0" />
            </div>

            <div>
              <h4
                className={`text-sm font-[900] uppercase tracking-widest ${headingStyles}`}
              >
                {feature.title}
              </h4>

              <p className={`text-xs mt-1 ${subHeadingStyles}`}>
                {feature.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
