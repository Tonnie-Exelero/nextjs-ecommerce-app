import { createYoga } from "graphql-yoga";
import { schema } from "@/lib/graphql/schema";
import { createContext } from "@/lib/graphql/context";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

const { handleRequest } = createYoga({
  schema,
  context: async ({ request }: { request: any }) => {
    const session = await getServerSession(authOptions);
    return createContext({ req: request as any, session });
  },
  graphqlEndpoint: "http://localhost:3000/api/graphql",
  fetchAPI: { Response },
});

export { handleRequest as GET, handleRequest as POST };
