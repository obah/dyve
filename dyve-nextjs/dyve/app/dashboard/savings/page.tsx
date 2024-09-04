import Accounts from "@/components/dashboard/Accounts";
import Notification from "@/components/dashboard/Notification";

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
        </div>

        <Notification />

      </div>

    </section>
  );
}
