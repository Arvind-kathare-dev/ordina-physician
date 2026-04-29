import { ChevronUp, Truck, User } from "lucide-react"
import SectionWrapper from "../SectionWrapper"
import ActionButtons from "../ActionButtons"
import CustomSelect from "@/components/ui/select/CustomSelect"
import { useState } from "react"
import { SectionWrapperBox } from "../SectionWrapperBox"
import { channelData } from "@/data/channelData"
import ChannelCard from "@/app/(auth)/components/card/ChannelCard"

export const OrderDeliverySection = () => {
  const [notifyRole, setNotifyRole] = useState("");

  const handleReset = () => {
    setNotifyRole("");
  };

  const isFormValid = () => {
    return !!notifyRole;
  };

  return (
    <SectionWrapperBox title="Order Delivery Preference">
      <SectionWrapper
        title="Order Delivery Preference"
        description="Your account info used in ordina"
        icon={Truck}
      >
        <div>
          <div className="mb-6">
            <h3 className="text-[17px] text-gray-600 mb-6">Add one or more channels</h3>
            <p className="text-sm text-gray-500 mb-4">
              Keep the most reliable channel first. You can change per order later.
            </p>

            <div className="flex flex-col gap-4">
              {channelData.map((channel, index) => (
                <ChannelCard key={index} {...channel} />
              ))}

              <p className="text-sm text-gray-400 mb-4 border border-ordinaBorder-300 rounded-10 px-[17px] py-[15px]">
                You can change delivery preferences per order on form Settings.
              </p>
            </div>

            <hr className="border-t border-ordinaBorder-300 my-6" />
          </div>

          {/* Notify on delivery failure */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">Notify on delivery failure</h3>
            <CustomSelect
              value={notifyRole}
              onChange={setNotifyRole}
              options={[
                { label: "No", value: "no" },
                { label: "Yes", value: "yes" },
              ]}
              placeholder="Select Role"
              required
            />
            <p className="text-xs text-gray-500 mt-4 mb-6">
              Recommendation: enable alerts so you can recover quickly if a channel fails.
            </p>
            <p className="text-sm text-gray-400 mb-4 border border-ordinaBorder-300 rounded-10 px-[17px] py-[15px]">
              Tip: If one channel falls back, switch to another channel to avoid delays.
            </p>
            <p className="text-sm text-gray-400 mb-4 border border-ordinaBorder-300 rounded-10 px-[17px] py-[15px]">
              HIPAA note: Emails are connected via Google (no password stored), eFax requires a short verification step using a test fax.
            </p>
          </div>
        </div>
        <ActionButtons onReset={handleReset} isSaveDisabled={!isFormValid()} />
      </SectionWrapper>
    </SectionWrapperBox>
  )
}
