import { builder } from "./builder"
import "./types/customer"
import "./types/product"
import "./types/order"

export const schema = builder.toSchema()

