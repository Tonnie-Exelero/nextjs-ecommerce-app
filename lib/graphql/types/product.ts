import { builder } from "../builder";
import { prisma } from "@/lib/prisma";

builder.prismaObject("Product", {
  fields: (t: any) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    description: t.exposeString("description", { nullable: true }),
    details: t.exposeString("details", { nullable: true }),
    price: t.exposeFloat("price"),
    imageUrl: t.exposeString("imageUrl", { nullable: true }),
    featured: t.exposeBoolean("featured"),
    stock: t.exposeInt("stock"),
  }),
});

builder.queryField("products", (t) =>
  t.prismaField({
    type: ["Product"],
    resolve: async (query) => {
      return prisma.product.findMany({
        ...query,
        orderBy: { createdAt: "desc" },
      });
    },
  })
);

builder.queryField("featuredProducts", (t) =>
  t.prismaField({
    type: ["Product"],
    resolve: async (query) => {
      return prisma.product.findMany({
        ...query,
        where: { featured: true },
        take: 4,
      });
    },
  })
);

builder.queryField("product", (t) =>
  t.prismaField({
    type: "Product",
    nullable: true,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (query, root, args) => {
      return prisma.product.findUnique({
        ...query,
        where: { id: args.id },
      });
    },
  })
);

builder.queryField("recommendedProducts", (t) =>
  t.prismaField({
    type: ["Product"],
    args: {
      productId: t.arg.string({ required: true }),
    },
    resolve: async (query, root, args) => {
      const product = await prisma.product.findUnique({
        where: { id: args.productId },
        select: { id: true },
      });

      if (!product) return [];

      return prisma.product.findMany({
        ...query,
        where: {
          id: { not: args.productId },
        },
        take: 4,
        orderBy: {
          createdAt: "desc",
        },
      });
    },
  })
);
