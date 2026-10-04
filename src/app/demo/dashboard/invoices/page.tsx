export default function InvoicesPage() {
  const invoices = [
    { id: "INV-001", client: "Acme Co", amount: 1250, status: "Paid", dueDate: "2026-10-01" },
    { id: "INV-002", client: "Beta Inc", amount: 850, status: "Pending", dueDate: "2026-10-15" },
    { id: "INV-003", client: "Gamma Ltd", amount: 2100, status: "Overdue", dueDate: "2026-09-30" },
    { id: "INV-004", client: "Delta LLC", amount: 500, status: "Paid", dueDate: "2026-09-15" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const totals = {
    paid: invoices.filter((i) => i.status === "Paid").reduce((sum, i) => sum + i.amount, 0),
    pending: invoices.filter((i) => i.status === "Pending").reduce((sum, i) => sum + i.amount, 0),
    overdue: invoices.filter((i) => i.status === "Overdue").reduce((sum, i) => sum + i.amount, 0),
  };

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl">Invoices</h1>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-ink/10 bg-white p-4 shadow-sm">
          <div className="text-sm text-ink/70">Paid</div>
          <div className="mt-1 font-display text-2xl">${totals.paid}</div>
        </div>
        <div className="rounded-xl border border-ink/10 bg-white p-4 shadow-sm">
          <div className="text-sm text-ink/70">Pending</div>
          <div className="mt-1 font-display text-2xl">${totals.pending}</div>
        </div>
        <div className="rounded-xl border border-ink/10 bg-white p-4 shadow-sm">
          <div className="text-sm text-ink/70">Overdue</div>
          <div className="mt-1 font-display text-2xl">${totals.overdue}</div>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-ink/10 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-sand">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-ink/70">
                  Invoice ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-ink/70">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-ink/70">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-ink/70">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-ink/70">
                  Due Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/5">
              {invoices.map((invoice, idx) => (
                <tr key={idx}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{invoice.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-ink/70">{invoice.client}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">${invoice.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(
                        invoice.status
                      )}`}
                    >
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-ink/70">{invoice.dueDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
