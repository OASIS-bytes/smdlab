export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="font-display text-3xl">Reports</h1>
        <div className="flex gap-3">
          <input type="date" className="rounded-lg border border-ink/10 px-4 py-2 text-sm" />
          <span className="self-center text-sm text-ink/70">to</span>
          <input type="date" className="rounded-lg border border-ink/10 px-4 py-2 text-sm" />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-ink/10 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-medium">Revenue Over Time</h2>
          <div className="flex h-64 items-center justify-center rounded-lg bg-sand">
            <div className="text-center text-ink/60">
              <div className="text-sm">Line Chart</div>
              <div className="mt-1 text-xs">12 months of data</div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-ink/10 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-medium">Project Status Distribution</h2>
          <div className="flex h-64 items-center justify-center rounded-lg bg-sand">
            <div className="text-center text-ink/60">
              <div className="text-sm">Bar Chart</div>
              <div className="mt-1 text-xs">By category</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
