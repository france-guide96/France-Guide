import { Feature, TransferSectionData } from "lib/utils/transferType";
import { CheckCircle, Compass, LucideIcon, ShieldCheck } from "lucide-react";
const transferIconMap: Record<number, LucideIcon> = {
    0: ShieldCheck,
    1: Compass,
};

export default function TransferFeatures({ data }: { data: TransferSectionData }) {

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data &&
                data.features.map((feature, index) => {
                    const Icon = transferIconMap[index] || CheckCircle;

                    return (
                        <div key={feature.id} className="flex gap-4">
                            <div>
                                <Icon className="text-accent w-6 h-6 shrink-0" />
                            </div>
                            <div>
                                <h4 className="text-sm font-[900] uppercase tracking-widest text-primary">
                                    {feature?.title}
                                </h4>
                                <p className="text-xs text-gray-transparent/60 mt-1">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    );
                })}
        </div>
    )
}
