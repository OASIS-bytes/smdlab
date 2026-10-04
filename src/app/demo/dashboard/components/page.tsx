export default function ComponentsPage() {
  return (
    <div className="space-y-8">
      <h1 className="font-display text-3xl">Component Library</h1>

      <div className="space-y-6">
        <section>
          <h2 className="mb-4 text-lg font-medium">Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <button className="rounded-lg bg-ink px-4 py-2 text-sm text-cream hover:bg-ink/90 transition-colors">
              Primary
            </button>
            <button className="rounded-lg border border-ink/20 bg-white px-4 py-2 text-sm hover:bg-sand transition-colors">
              Secondary
            </button>
            <button className="rounded-lg bg-copper-deep px-4 py-2 text-sm text-cream hover:bg-copper-deep/90 transition-colors">
              Accent
            </button>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-lg font-medium">Badges</h2>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
              Paid
            </span>
            <span className="inline-flex rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
              Pending
            </span>
            <span className="inline-flex rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800">
              Overdue
            </span>
            <span className="inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
              In Progress
            </span>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-lg font-medium">Cards</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-ink/10 bg-white p-4 shadow-sm">
              <div className="text-sm text-ink/70">Card Title</div>
              <div className="mt-2 text-lg">Card Content</div>
            </div>
            <div className="rounded-xl border border-ink/10 bg-white p-4 shadow-sm">
              <div className="text-sm text-ink/70">Another Card</div>
              <div className="mt-2 text-lg">More Content</div>
            </div>
            <div className="rounded-xl border border-ink/10 bg-white p-4 shadow-sm">
              <div className="text-sm text-ink/70">Third Card</div>
              <div className="mt-2 text-lg">Final Content</div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-lg font-medium">Form Inputs</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-ink/70">Text Input</label>
              <input
                type="text"
                placeholder="Enter text..."
                className="w-full rounded-lg border border-ink/10 px-4 py-2 text-sm"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-ink/70">Select</label>
              <select className="w-full rounded-lg border border-ink/10 px-4 py-2 text-sm">
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
              </select>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-lg font-medium">Chart</h2>
          <div className="rounded-xl border border-ink/10 bg-white p-6 shadow-sm">
            <div className="flex h-64 items-center justify-center rounded-lg bg-sand">
              <div className="text-center text-ink/60">
                <div className="text-sm">Example Chart</div>
                <div className="mt-1 text-xs">Responsive demo chart</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
