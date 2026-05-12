type Props = {
    children: React.ReactNode;
};

export default function Container({ children }: Props) {
    return <div className="max-w-[1440px] mx-auto w-full">{children}</div>;
}
