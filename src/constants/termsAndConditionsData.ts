export type TermsAndConditionsSection = {
    title: string;
    items: string[];
};

export const termsAndConditionsData: TermsAndConditionsSection[] = [
    {
        title: "AcceptanceOfTerms",
        items: ["AcceptanceText"],
    },
    {
        title: "OurServices",
        items: ["ServicesTextOne", "ServicesTextTwo"],
    },
    {
        title: "BookingsAndPayments",
        items: ["BookingTextOne", "BookingTextTwo"],
    },
    {
        title: "LimitationOfLiability",
        items: ["LiabilityText"],
    },
];