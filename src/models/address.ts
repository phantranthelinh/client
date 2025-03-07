import { z } from "zod";
import { District, Province, Ward } from "./province";

export type TAddress = {
  _id: string;
  addressLine: string;
  province: Province;
  district: District;
  ward: Ward;
  isDefault: boolean;
};
export const AddressSchema = z.object({
  addressLine: z.string(),
  province: z.string(),
  district: z.string(),
  ward: z.string(),
  isDefault: z.boolean(),
});
