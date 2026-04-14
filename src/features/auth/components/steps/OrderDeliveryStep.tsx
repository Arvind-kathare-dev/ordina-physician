'use client';

import ChannelCard from "../ChannelCard";

interface OrderDeliveryStepProps {
  data: {
    preferredMethod: string;
    email: string;
    faxNumber: string;
    deliveryTime: string;
  };
  onChange: (data: Partial<OrderDeliveryStepProps['data']>) => void;
}

export function OrderDeliveryStep({}: OrderDeliveryStepProps) {
  return (
    <div className="space-y-6">

    

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT: CHANNELS */}
        <div className="lg:col-span-2 space-y-4 bg-white border border-ordinaBorder-200 rounded-xl p-4">
  {/* HEADER */}
      <div className="flex flex-col gap-6">
        <h1 className="text-xl font-semibold text-gray-900">
          Delivery channels (priority order)
        </h1>
        <h3 className="text-[17px] text-gray-600">
          Add one or more channels
        </h3>
        <p className="text-sm text-gray-400">
          Keep the most reliable channel first. You can change per order later.
        </p>
      </div>
          <ChannelCard
            title="Primary Email"
            label="Primary"
            type="Email"
            description="Used first for order delivery"
            placeholder="Connect a Google account to fill this"
            status="not_connected"
            avatarLetter="K"
            primaryActionLabel="Connect Primary Email"
            secondaryActionLabel="Change"
            dangerActionLabel="Disconnect"
          />

          <ChannelCard
            title="Secondary Email"
            label="Secondary"
            type="Email"
            optional
            description="Fallback if primary email fails"
            placeholder="Connect a Google account to fill this"
            status="not_connected"
            primaryActionLabel="Connect Secondary Email"
            secondaryActionLabel="Change"
            dangerActionLabel="Disconnect"
          />

          <ChannelCard
            title="Primary eFax"
            label="Primary"
            type="eFax"
            description="Primary fax number (optional)"
            placeholder="Set up to fill a fax number"
            status="not_configured"
            avatarLetter="M"
            primaryActionLabel="Set up primary eFax"
            secondaryActionLabel="Edit"
            dangerActionLabel="Remove"
          />

          <ChannelCard
            title="Secondary eFax"
            label="Secondary"
            type="eFax"
            optional
            description="Backup fax number (optional)"
            placeholder="Set up to fill a fax number"
            status="not_configured"
            primaryActionLabel="Set up secondary eFax"
            secondaryActionLabel="Edit"
            dangerActionLabel="Remove"
          />
        </div>

        {/* RIGHT: DELIVERY BEHAVIOR */}
        <div className="bg-white border border-ordinaBorder-200 rounded-xl p-5 space-y-4 h-fit">

          <div>
            <h2 className="text-sm font-semibold text-gray-900">
              Delivery behavior
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Set how Ordina should handle failures
            </p>
          </div>

          {/* SELECT */}
          <div>
            <label className="text-sm text-gray-700">
              Notify on delivery failure
            </label>

            <select className="mt-2 w-full border border-gray-200 rounded-md px-3 py-2 text-sm">
              <option>No</option>
              <option>Yes</option>
            </select>
          </div>

          {/* RECOMMENDATION */}
          <p className="text-xs text-gray-500">
            Recommendation: enable alerts so you can resend quickly if a channel fails.
          </p>

          {/* TIP BOX */}
          <div className="text-xs text-gray-600 input-border border-dashed  rounded-md p-3">
            Tip: If one channel fails twice, switch to another channel to avoid delays.
          </div>

          {/* HIPAA NOTE */}
          <div className="text-xs text-gray-600 input-border border-dashed  rounded-md p-3">
            HIPAA note: Emails are connected via Google OAuth (no password stored). 
            eFax requires a short verification step using a test fax.
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="max-w-[585px] input-border border-dashed  rounded-md p-4 text-base text-gray-500 ">
        Auto-fallback: If a primary endpoint fails, Ordina retries once, then uses the secondary endpoint. 
        You can override delivery per order from the order screen.
      </div>
    </div>
  );
}