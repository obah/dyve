import Accounts from "@/components/dashboard/Accounts";
import Notification from "@/components/dashboard/Notification";
import TransferBox from "@/components/dashboard/TransferBox";

export default function Page() {
  return (
    <section
      className="px-6 py-8"
    >

      <div
        className="flex flex-row justify-between"
      >

        <div
          className="w-2/3"
        >
          <Accounts />

          <TransferBox />
        </div>

        <Notification />

      </div>

    </section>
  );
}
