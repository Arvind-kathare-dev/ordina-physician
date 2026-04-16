import { ChevronUp, Truck, User } from "lucide-react"
import SectionWrapper from "../SectionWrapper"
import ActionButtons from "../ActionButtons"
import ChannelCard from "@/features/auth/components/card/ChannelCard"
import { channelData } from "@/data/channelData"
import CustomSelect from "@/components/ui/select/CustomSelect"
import { useState } from "react"

export const OrderDeliverySection = () => {
    const [role, setRole] = useState("");
  return (
   <SectionWrapper
      title="Order Delivery Preference"
      description="Your account info used in ordina"
      icon={Truck}
    >
  <div>
                  {/* <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Truck className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <h2 className="font-semibold text-gray-900">Order delivery preferences</h2>
                        <p className="text-sm text-gray-500">Your account info used in ordina</p>
                      </div>
                    </div>
                    <button className="flex items-center gap-2 text-sm text-orange-600 hover:text-orange-700">
                      <span>Needs Review</span>
                      <ChevronUp className="w-4 h-4" />
                    </button>
                  </div> */}

                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-2">Add one or more channels</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Keep the most reliable channel first. You can change per order later.
                    </p>

                    <div className="space-y-4">
  {channelData.map((channel, index) => (
    <ChannelCard key={index} {...channel} />
  ))}
   <p className="text-xs text-gray-500 mb-4">
                      You can change delivery preferences per order on form Settings.
                    </p>
</div>
                   
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
                    <p className="text-xs text-gray-500 mb-2">
                      Recommendation: enable alerts so you can recover quickly if a channel fails.
                    </p>
                    <p className="text-xs text-gray-500 mb-4">
                      Tip: If one channel falls back, switch to another channel to avoid delays.
                    </p>
                    <p className="text-xs text-gray-500">
                      HIPAA note: Emails are connected via Google (no password stored), eFax requires a short verification step using a test fax.
                    </p>
                  </div>

                
                </div>
                 <ActionButtons />
    </SectionWrapper>
  )
}
