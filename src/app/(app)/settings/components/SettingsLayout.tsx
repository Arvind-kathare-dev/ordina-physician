interface Props {
  sidebar: React.ReactNode;
  header: React.ReactNode;
  children: React.ReactNode;
}

export default function SettingsLayout({ sidebar, header, children }: Props) {
  return (
    <div className="min-h-screen py-4 sm:py-6 lg:py-8">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        {header}

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mt-6">
          <aside className="w-full lg:w-80 shrink-0">
            {sidebar}
          </aside>

          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}