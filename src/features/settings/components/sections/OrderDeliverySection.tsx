import { ChevronUp, Truck, User } from "lucide-react"
import SectionWrapper from "../SectionWrapper"
import ActionButtons from "../ActionButtons"
import ChannelCard from "@/features/auth/components/card/ChannelCard"
import { channelData } from "@/data/channelData"
import CustomSelect from "@/components/ui/select/CustomSelect"
import { useState } from "react"
import { SectionWrapperBox } from "../SectionWrapperBox"

export const OrderDeliverySection = () => {
  const [role, setRole] = useState("");
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
              value={role}
              onChange={setRole}
              options={[
                { label: "Physician", value: "physician" },
                { label: "Nurse", value: "nurse" },
                { label: "Admin", value: "admin" },
              ]}
              placeholder="No"
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
        <ActionButtons />
      </SectionWrapper>
    </SectionWrapperBox>

  )
}
