export type PrivacyPolicySection = {
    title: string;
    items: string[];
};

export const privacyPolicyData: PrivacyPolicySection[] = [
    {
        title: "InformationWeCollect",
        items: [
            "PersonalData",
            "BookingInformation",
            "PaymentData",
            "UsageData",
        ],
    },
    {
        title: "HowWeUseYourInformation",
        items: [
            "UseInformationOne",
            "UseInformationTwo",
            "UseInformationThree",
        ],
    },
    {
        title: "DataRetentionAndSecurity",
        items: ["DataRetentionText"],
    },
    {
        title: "ThirdPartySharing",
        items: [
            "ThirdPartyText",
            "TourPartners",
            "PaymentProcessors",
            "HostingProviders",
        ],
    },
];