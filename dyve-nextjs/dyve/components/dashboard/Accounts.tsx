import { FaEye } from "react-icons/fa";


const Accounts = () => {

    const dataA:any = [
        {
            "title": "Account Balance",
            "value": "230,000.00"
        },
        {
            "title": "Saved Amount",
            "value": "200,000.00"
        },
        {
            "title": "Total Savings",
            "value": "20,000.00"
        }
    ]


  return (
    <div className="mb-4">

        <div
            className="flex flex-row justify-between gap-4 items-center"
        >
            {
                dataA.map((cur:any, id:number) => (
                    <div
                        key={id}
                        className="p-4 w-full rounded-xl bg-background-3"
                    >
                        <p
                            className="flex flex-row justify-start items-center text-white-5 text-xs font-medium mb-4"
                        >
                            <FaEye className="mr-2" />  {cur.title}
                        </p>

                        <p
                            className="text-white text-2xl font-semibold"
                        >
                            {cur.value}
                        </p>
                    </div>
                ))
            }
        </div>
        
    </div>
  )
}

export default Accounts