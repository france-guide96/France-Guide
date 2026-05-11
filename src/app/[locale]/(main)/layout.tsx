import CallToAction from "@/app/features/CallToAction";
import Navbar from "../../shared/Navbar";
import Footer from "@/app/shared/Footer";
import GetInTouchWrapper from "@/app/shared/getInTouchWrapper";

export default function MainLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  return (
    <>
      <Navbar />
      {children}
      <CallToAction />
      <GetInTouchWrapper params={params} />
      <Footer />
    </>
  );
}
