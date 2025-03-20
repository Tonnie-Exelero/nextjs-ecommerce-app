import { builder } from "../builder";
import { prisma } from "@/lib/prisma";

builder.prismaObject("Order", {
  fields: (t: any) => ({
    id: t.exposeID("id"),
    customer: t.relation("customer"),
    customerId: t.exposeString("customerId"),
    status: t.exposeString("status"),
    total: t.exposeFloat("total"),
    items: t.relation("items"),
  }),
});

builder.prismaObject("OrderItem", {
  fields: (t: any) => ({
    id: t.exposeID("id"),
    order: t.relation("order"),
    orderId: t.exposeString("orderId"),
    product: t.relation("product"),
    productId: t.exposeString("productId"),
    quantity: t.exposeInt("quantity"),
    price: t.exposeFloat("price"),
  }),
});

builder.queryField("userOrders", (t) =>
  t.prismaField({
    type: ["Order"],
    args: {
      userId: t.arg.string({ required: true }),
    },
    resolve: async (query, root, args, ctx) => {
      if (!ctx.session?.user?.id) throw new Error("Not authenticated");
      if (ctx.session.user.id !== args.userId)
        throw new Error("Not authorized");

      return prisma.order.findMany({
        ...query,
        where: { customerId: args.userId },
        orderBy: { createdAt: "desc" },
      });
    },
  })
);

builder.queryField("order", (t) =>
  t.prismaField({
    type: "Order",
    nullable: true,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (query, root, args, ctx) => {
      if (!ctx.session?.user?.id) throw new Error("Not authenticated");

      const order = await prisma.order.findUnique({
        where: { id: args.id },
        select: { customerId: true },
      });

      if (!order || order.customerId !== ctx.session.user.id) {
        throw new Error("Not authorized");
      }

      return prisma.order.findUnique({
        ...query,
        where: { id: args.id },
      });
    },
  })
);

const CreateOrderItemInput = builder.inputType("CreateOrderItemInput", {
  fields: (t) => ({
    productId: t.string({ required: true }),
    quantity: t.int({ required: true }),
  }),
});

builder.mutationField("createOrder", (t) =>
  t.prismaField({
    type: "Order",
    args: {
      items: t.arg({ type: [CreateOrderItemInput], required: true }),
    },
    resolve: async (query, root, args, ctx) => {
      if (!ctx.session?.user?.id) throw new Error("Not authenticated");

      // Get product prices and calculate total
      const productIds = args.items.map((item) => item.productId);
      const products = await prisma.product.findMany({
        where: { id: { in: productIds } },
      });

      const productMap = products.reduce((acc: any, product: any) => {
        acc[product.id] = product;
        return acc;
      }, {} as Record<string, any>);

      const orderItems = args.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: productMap[item.productId].price,
      }));

      const total = orderItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      return prisma.order.create({
        ...query,
        data: {
          customerId: ctx.session.user.id,
          status: "PROCESSING",
          total,
          items: {
            create: orderItems,
          },
        },
      });
    },
  })
);
