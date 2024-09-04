import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DepWith from "./DepWith";
import { TransactionTable } from "./TransactionTable";

const LoanBox = () => {
  return (
    <Tabs
      defaultValue="request loan"
      className="h-[500px] rounded-xl mt-20"
    >
        
        <TabsList className="border-b border-purple-1 mb-8">
          <TabsTrigger value="request loan" className="text-lg font-medium">Request Loan</TabsTrigger>
          <TabsTrigger value="pay loan" className="text-lg font-medium">Pay Loan</TabsTrigger>
        </TabsList>

      <TabsContent value="request loan">
        <DepWith  
          pointer={"request loan"}
          btnTitle={"Request Loan"}
        />
      </TabsContent>

      <TabsContent value="pay loan">
        <TransactionTable/>
      </TabsContent>
        

    </Tabs>
  )
}

export default LoanBox