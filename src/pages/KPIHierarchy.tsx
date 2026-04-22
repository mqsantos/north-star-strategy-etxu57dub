import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { getKpis } from '@/services/api'
import { useRealtime } from '@/hooks/use-realtime'

export default function KPIHierarchy() {
  const [kpis, setKpis] = useState<any[]>([])

  const loadData = async () => {
    const res = await getKpis()
    setKpis(res)
  }

  useEffect(() => {
    loadData()
  }, [])
  useRealtime('kpis', loadData)

  // Build simple tree
  const rootKpis = kpis.filter((k) => !k.parent_kpi)

  const KpiNode = ({ kpi, level = 0 }: { kpi: any; level?: number }) => {
    const children = kpis.filter((k) => k.parent_kpi === kpi.id)
    const progress = kpi.target_value
      ? Math.min(100, Math.round((kpi.current_value / kpi.target_value) * 100))
      : 0

    return (
      <div className="relative">
        <Card
          className={`p-4 mb-4 border-border/50 shadow-sm relative z-10 w-[300px] ${level > 0 ? 'ml-12' : ''}`}
        >
          {level > 0 && <div className="absolute -left-12 top-1/2 w-12 h-px bg-border/80" />}
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1 font-semibold">
            {kpi.unit === '%' ? 'Ratio' : 'Metric'}
          </p>
          <h4 className="font-medium mb-3 truncate">{kpi.name}</h4>
          <div className="flex justify-between items-end">
            <div>
              <span className="text-2xl font-light">
                {kpi.current_value}
                {kpi.unit}
              </span>
              <span className="text-xs text-muted-foreground ml-2">
                / {kpi.target_value}
                {kpi.unit} target
              </span>
            </div>
            <div className="text-right">
              <span
                className={`text-xs font-medium ${progress >= 100 ? 'text-primary' : 'text-accent'}`}
              >
                {progress}%
              </span>
            </div>
          </div>
          <div className="h-1 w-full bg-secondary mt-3 rounded-full overflow-hidden">
            <div
              className={`h-full ${progress >= 100 ? 'bg-primary' : 'bg-accent'}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </Card>

        {children.length > 0 && (
          <div className="relative">
            <div
              className={`absolute left-4 top-0 bottom-12 w-px bg-border/80 ${level > 0 ? 'ml-12' : ''}`}
            />
            {children.map((child) => (
              <KpiNode key={child.id} kpi={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-editorial font-medium mb-2">KPI Hierarchy</h1>
        <p className="text-muted-foreground text-sm">
          Line of sight from corporate targets to operational metrics.
        </p>
      </div>

      <div className="bg-white p-8 rounded-xl border border-border/50 shadow-sm overflow-x-auto min-h-[600px]">
        <div className="min-w-max py-8 pl-4 relative">
          {rootKpis.map((root) => (
            <KpiNode key={root.id} kpi={root} />
          ))}
        </div>
      </div>
    </div>
  )
}
