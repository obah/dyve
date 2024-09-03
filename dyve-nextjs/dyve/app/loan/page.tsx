import { AcademyPromo } from "@/components/academy/academy-promo";
import Hero1 from "@/components/loan/Hero1";
import Why from "@/components/loan/Why";

export default function Loan() {

    return(
        <div
            className="bg-background"
        >
          <Hero1 />  
          <Why />
          <AcademyPromo />
        </div>
    )
}