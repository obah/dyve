import { Button } from "../ui/button";

interface Props {
  backFn?: () => void;
  nextFn?: () => void;
}

export function FullscreenView({ backFn, nextFn }: Props) {
  return (
    <div>
      <iframe
        width="800"
        height="480"
        src="https://www.youtube.com/embed/1YyAzVmP9xQ?si=0x0m0KmbApnLtl9N"
        title="Dyve course"
        frameBorder="0"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="rounded-r1"
      ></iframe>

      <div className="mt-9 flex justify-between">
        <h3 className="text-[32px] text-[#CBCBCB]">
          Getting Started with DeFi
        </h3>
        <div className="flex gap-[50px]">
          <Button
            variant={"outline"}
            size={"sm"}
            className="h-[40px] w-[120px]"
            onClick={backFn}
          >
            Back
          </Button>
          <Button onClick={nextFn} size={"sm"} className="h-[40px] w-[120px]">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
