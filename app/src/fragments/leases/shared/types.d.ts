/* **
 * Query params validation
 ** */

export const leaseFiltersSchema = z.object({
  id: z.string().optional(),
  page: z.coerce.number().int().positive().default(1),
  status: z.enum(["active", "pending", "expired", "cancelled"]).optional(),
  query: z.string().min(1).optional(),
});

export type LeaseFilters = z.infer<typeof leaseFiltersSchema>;
