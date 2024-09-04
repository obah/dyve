import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DepWith from "./DepWith";

const TransferBox = () => {
  return (
    <Tabs
      defaultValue="deposit"
      className="h-[500px] rounded-xl mt-20"
    >
        
        <TabsList className="border-b border-purple-1 mb-8">
          <TabsTrigger value="deposit" className="text-lg font-medium">Deposit</TabsTrigger>
          <TabsTrigger value="withdraw" className="text-lg font-medium">Withdrawl</TabsTrigger>
        </TabsList>

      <TabsContent value="deposit">
        <DepWith  
          pointer={"deposit"}
          btnTitle={"Deposit"}
        />
      </TabsContent>

      <TabsContent value="withdraw">
        <DepWith  
          pointer={"withdraw"}
          btnTitle={"Withdraw"}
        />
      </TabsContent>
        

    </Tabs>
  )
}

export default TransferBox