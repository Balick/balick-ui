import type { PropDef } from "@/content/components"

export function PropsTable({ props }: { props: PropDef[] }) {
  return (
    <div className="scrollbar-thin overflow-x-auto rounded-lg border bg-card shadow-xs">
      <table className="w-full text-left text-sm">
        <thead className="border-b bg-muted/40 text-xs text-muted-foreground">
          <tr>
            <th className="px-4 py-2.5 font-medium">Prop</th>
            <th className="px-4 py-2.5 font-medium">Type</th>
            <th className="px-4 py-2.5 font-medium">Default</th>
            <th className="hidden px-4 py-2.5 font-medium md:table-cell">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {props.map((prop) => (
            <tr key={prop.name} className="align-top">
              <td className="px-4 py-3">
                <code className="font-mono text-[13px] font-medium">{prop.name}</code>
                <p className="mt-1 text-xs text-muted-foreground md:hidden">{prop.description}</p>
              </td>
              <td className="px-4 py-3">
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs whitespace-nowrap">{prop.type}</code>
              </td>
              <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{prop.default ?? "—"}</td>
              <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
