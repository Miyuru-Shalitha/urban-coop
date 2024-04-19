const { z } = require("zod");
//
const customerSignupSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  gender: z.string(),
  password: z.string().min(6),
  mobile: z.string().min(10),
  address: z.string(),
});
//
module.exports = customerSignupSchema;
