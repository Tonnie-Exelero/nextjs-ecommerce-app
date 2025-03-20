import { builder } from "../builder";
import { prisma } from "@/lib/prisma";

builder.prismaObject("Customer", {
  fields: (t: any) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name", { nullable: true }),
    email: t.exposeString("email"),
    phone: t.exposeString("phone", { nullable: true }),
    address: t.exposeString("address", { nullable: true }),
    orders: t.relation("orders"),
  }),
});

builder.queryField("me", (t) =>
  t.prismaField({
    type: "Customer",
    nullable: true,
    resolve: async (query, root, args, ctx) => {
      if (!ctx.session?.user?.id) return null;

      return prisma.customer.findUnique({
        ...query,
        where: { id: ctx.session.user.id },
      });
    },
  })
);

builder.queryField("userProfile", (t) =>
  t.prismaField({
    type: "Customer",
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (query, root, args, ctx) => {
      if (!ctx.session?.user?.id) throw new Error("Not authenticated");
      if (ctx.session.user.id !== args.id) throw new Error("Not authorized");

      return prisma.customer.findUniqueOrThrow({
        ...query,
        where: { id: args.id },
      });
    },
  })
);

const UpdateProfileInput = builder.inputType("UpdateProfileInput", {
  fields: (t) => ({
    name: t.string({ required: false }),
    phone: t.string({ required: false }),
    address: t.string({ required: false }),
  }),
});

builder.mutationField("updateProfile", (t) =>
  t.prismaField({
    type: "Customer",
    args: {
      id: t.arg.string({ required: true }),
      input: t.arg({ type: UpdateProfileInput, required: true }),
    },
    resolve: async (query, root, args, ctx) => {
      if (!ctx.session?.user?.id) throw new Error("Not authenticated");
      if (ctx.session.user.id !== args.id) throw new Error("Not authorized");

      return prisma.customer.update({
        ...query,
        where: { id: args.id },
        data: args.input,
      });
    },
  })
);
