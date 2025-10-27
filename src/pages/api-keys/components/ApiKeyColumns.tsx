import type { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowUpDown, CheckCircle, AlertTriangle, Clock } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { ApiKeyActions } from "./ApiKeyActions"
import type { ApiKey, ApiKeyStatus } from "../constants"

const getStatusBadge = (status: ApiKeyStatus) => {
  const statusConfig = {
    active: { 
      icon: CheckCircle, 
      className: "bg-green-100 text-green-800 border-green-200 hover:bg-green-200" 
    },
    inactive: { 
      icon: AlertTriangle, 
      className: "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200" 
    },
    expired: { 
      icon: Clock, 
      className: "bg-red-100 text-red-800 border-red-200 hover:bg-red-200" 
    }
  }

  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <Badge variant="outline" className={config.className}>
      <Icon className="w-3 h-3 mr-1" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
}



export const apiKeyColumns: ColumnDef<ApiKey>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          API Key
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const apiKey = row.original
      return (
        <div className="flex flex-col gap-1 px-3 py-1 max-w-xs">
          <span className="font-medium">{apiKey.name}</span>
          <span className="text-sm text-muted-foreground truncate">{apiKey.description}</span>
          <span className="text-xs text-muted-foreground font-mono">{apiKey.id}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const apiKey = row.original
      return (
        <div className="px-3 py-1">
          {getStatusBadge(apiKey.status)}
        </div>
      )
    },
  },
  {
    accessorKey: "expiresAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Expires
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const apiKey = row.original
      if (!apiKey.expiresAt) {
        return (
          <div className="px-3 py-1">
            <span className="text-sm text-muted-foreground">Never</span>
          </div>
        )
      }

      const expiresAt = new Date(apiKey.expiresAt)
      const isExpired = expiresAt < new Date()
      
      return (
        <div className="flex flex-col gap-1 px-3 py-1">
          <span className={`text-sm font-medium ${isExpired ? 'text-red-600' : ''}`}>
            {formatDistanceToNow(expiresAt, { addSuffix: true })}
          </span>
          <span className="text-xs text-muted-foreground">
            {expiresAt.toLocaleDateString()}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const apiKey = row.original
      return (
        <div className="flex flex-col gap-1 px-3 py-1">
          <span className="text-sm font-medium">
            {formatDistanceToNow(new Date(apiKey.createdAt), { addSuffix: true })}
          </span>
          <span className="text-xs text-muted-foreground">
            {new Date(apiKey.createdAt).toLocaleDateString()}
          </span>
        </div>
      )
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const apiKey = row.original
      return (
        <div className="px-3 py-1">
          <ApiKeyActions apiKey={apiKey} />
        </div>
      )
    },
  },
]
