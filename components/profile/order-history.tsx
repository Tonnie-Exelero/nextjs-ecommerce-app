"use client"

import { useQuery } from "@apollo/client"
import { GET_USER_ORDERS } from "@/lib/graphql/queries/orders"
import { formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"

interface OrderHistoryProps {
  userId: string
}

export function OrderHistory({ userId }: OrderHistoryProps) {
  const { data, loading, error } = useQuery(GET_USER_ORDERS, {
    variables: { userId },
  })

  if (loading) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Order History</h2>
        <div className="rounded-md border">
          <Skeleton className="h-[300px] w-full" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Order History</h2>
        <p className="text-red-500">Failed to load order history</p>
      </div>
    )
  }

  const orders = data?.userOrders || []

  if (orders.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Order History</h2>
        <p className="text-muted-foreground">You haven't placed any orders yet.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Order History</h2>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order: any) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{formatDate(order.createdAt)}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      order.status === "DELIVERED" ? "default" : order.status === "PROCESSING" ? "outline" : "secondary"
                    }
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

