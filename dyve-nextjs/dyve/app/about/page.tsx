import Features from "@/components/homepage/Features";
import Hero from "@/components/homepage/Hero";
import QuickGuide from "@/components/homepage/QuickGuide";

export default function Page() {
  return (
    <div>
      <Hero />
      <div className="space-y-16 bg-[#111119] px-16 py-24">
        <div>
          <p className="text-[20px] font-light text-[#A177FF]">
            Empower Your Financial FutureEmpower Your Financial Future
          </p>
          <h2 className="mb-8 text-4xl text-[#A7A5A5]">About Dyve</h2>
          <p className="text-[20px] text-[#969696]">
            We believe that everyone deserves access to financial services,
            regardless of their background or circumstances. Our mission is to
            empower individuals and communities by providing accessible, secure,
            and transparent financial solutions that cater to the needs of the
            unbanked.
            <br />
            <br />
            We leverage the power of decentralized finance (DeFi) and blockchain
            technology to create a platform that offers microloans, savings, and
            identity verification—helping individuals build a secure financial
            future.
          </p>
        </div>

        <div>
          <p className="text-[20px] font-light text-[#A177FF]">
            Empower Your Financial FutureEmpower Your Financial Future
          </p>
          <h2 className="mb-8 text-4xl text-[#A7A5A5]">
            Our Vision for the Future
          </h2>
          <p className="text-[20px] text-[#969696]">
            We envision a world where financial inclusion is a reality for
            everyone. A world where individuals, no matter where they live, have
            the tools they need to manage their finances, access loans, and save
            for the future.
            <br />
            <br />
            Our goal is to be a leading force in the global movement towards
            financial empowerment, providing a platform that is not only
            accessible but also transformative for millions of unbanked
            individuals.
          </p>
        </div>
      </div>
      <Features />
    </div>
  );
}
