interface Props {
  sidebar: React.ReactNode;
  header: React.ReactNode;
  children: React.ReactNode;
}

export default function SettingsLayout({ sidebar, header, children }: Props) {
  return (
    <div className="min-h-screen py-6">
      <div className="max-w-[1400px] mx-auto ">
        {header}

        <div className="flex gap-6">
          {sidebar}

          <div className="flex-1">
            {/* <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8"> */}
              {children}
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}