import * as z from "zod";

/* **
 * Pre-processors
 * ** */

const datePreprocessor = z.preprocess(
  (arg) => {
    if (arg instanceof Date) return arg.toISOString();
    return arg;
  },
  z.string().datetime({ message: "Invalid ISO 8601 date format" })
);

/* **
 * Basic schema
 * ** */

const basicSchema = z.object({
  name: z.string().nullable().optional(),
  location: z.object({
    country: z.string().nullable().optional(),
    region: z.string().nullable().optional(),
    province: z.string().nullable().optional(),
    city: z.string().nullable().optional(),
    address: z.string().nullable().optional(),
    lat: z.number().nullable().optional(),
    lon: z.number().nullable().optional(),
    postal_code: z.string().nullable().optional(),
  }),
  surface: z.number().nullable().optional(),
  url: z.string().url().nullable().optional(),
  dates: z.object({
    signing: datePreprocessor.nullable().optional(),
    start: datePreprocessor.nullable().optional(),
    delivery: datePreprocessor.nullable().optional(),
    opening: datePreprocessor.nullable().optional(),
    renewal: datePreprocessor.nullable().optional(),
    closed: datePreprocessor.nullable().optional(),
    end: datePreprocessor.nullable().optional(),
    precedent_condition_end: datePreprocessor.nullable().optional(),
  }),
  no_competence_radius: z.string().nullable().optional(),
  exclusivity: z.string().nullable().optional(),
  contract_type: z.enum(["shopping center", "street", "travel"]),
  notes: z.string().nullable().optional(),
});

/* **
 * Financial schemas
 * ** */

const bonificationSchema = z.object({
  type: z.enum(["step_rent", "discount"]),
  start_date: datePreprocessor.nullable().optional(),
  end_date: datePreprocessor.nullable().optional(),
  amount_type: z.enum(["percentage", "fixed"]),
  amount: z.number().nullable().optional(),
});

const financialSchema = z.object({
  rents: z.object({
    signed: z.number().nullable().optional(),
    invoiced: z.number().nullable().optional(),
    computed: z
      .object({
        monthly: z.number().nullable().optional(),
        yearly: z.number().nullable().optional(),
      })
      .nullable()
      .optional(),
    next_review: datePreprocessor.nullable().optional(),
    effort_rate: z.number().nullable().optional(),
    variable: z
      .object({
        type: z.enum(["percentage", "fixed"]),
        amount: z.number().nullable().optional(),
        payment: z.number().nullable().optional(),
      })
      .nullable()
      .optional(),
    agreed_increases: z
      .array(
        z.object({
          type: z.enum(["percentage", "fixed"]),
          start_date: datePreprocessor.nullable().optional(),
          amount: z.number().nullable().optional(),
        })
      )
      .nullable()
      .optional(),
    key_money: z.number().nullable().optional(),
    free_period: z
      .object({
        start_date: datePreprocessor.nullable().optional(),
        end_date: datePreprocessor.nullable().optional(),
        months: z.number().nullable().optional(),
      })
      .nullable()
      .optional(),
    external_unit: z
      .object({
        signed: z.number().nullable().optional(),
        invoiced: z.number().nullable().optional(),
      })
      .nullable()
      .optional(),
  }),
  charges: z
    .object({
      service: z.number().nullable().optional(),
      free_period: z.number().nullable().optional(),
      external_unit: z.number().nullable().optional(),
    })
    .nullable()
    .optional(),
  fees: z
    .object({
      ibi: z.number().nullable().optional(),
      ecop: z.number().nullable().optional(),
      fit_out: z.number().nullable().optional(),
      intermediation: z.number().nullable().optional(),
      marketing: z.number().nullable().optional(),
      other: z.number().nullable().optional(),
      other_one_shot: z.number().nullable().optional(),
    })
    .nullable()
    .optional(),
  sales: z
    .object({
      amount: z.number().nullable().optional(),
      forecast: z.number().nullable().optional(),
      report: z.string().nullable().optional(),
      clause: z.string().nullable().optional(),
    })
    .nullable()
    .optional(),
  ipc: z
    .object({
      market_ipc: z
        .object({
          apply: z.boolean(),
          start_date: datePreprocessor.nullable().optional(),
        })
        .nullable()
        .optional(),
      specific_rules: z
        .object({
          apply: z.boolean(),
          rules: z
            .array(
              z.object({
                year: z.number(),
                apply_market_index: z.boolean(),
                max_increase: z.number(),
                start_date: datePreprocessor.nullable().optional(),
              })
            )
            .nullable()
            .optional(),
        })
        .nullable()
        .optional(),
    })
    .nullable()
    .optional(),
  step_rents: z.array(bonificationSchema).nullable().optional(),
  discounts: z.array(bonificationSchema).nullable().optional(),
});

/* **
 * Break options schemas
 * ** */

const regularBOSchema = z.object({
  rolling: z
    .object({
      start_date: datePreprocessor.nullable().optional(),
      notice_period: z.number().nullable().optional(),
    })
    .nullable()
    .optional(),
  segmentation: z.string().nullable().optional(),
  options: z
    .array(
      z.object({
        year: z.number().nullable().optional(),
        end_date: datePreprocessor.nullable().optional(),
        notice_period: z.number().nullable().optional(),
        penalty: z.object({
          apply: z.boolean(),
          type: z.enum(["percentage", "fixed"]),
          amount: z.number().nullable().optional(),
        }),
      })
    )
    .nullable()
    .optional(),
});

const breakOptionSchema = z.object({
  contract: regularBOSchema.nullable().optional(),
  external_unit: regularBOSchema.nullable().optional(),
});

/* **
 * Guarantee schema
 * ** */

const guaranteeSchema = z.object({
  legal_security_deposit: z.object({
    amount: z
      .object({
        signed: z.number().nullable().optional(),
        invoiced: z.number().nullable().optional(),
      })
      .nullable()
      .optional(),
    update_with_ipc: z.object({ apply: z.boolean() }).nullable().optional(),
    specific_update: z
      .object({
        apply: z.boolean().nullable().optional(),
        start_date: datePreprocessor.nullable().optional(),
        increase: z.number().nullable().optional(),
      })
      .nullable()
      .optional(),
  }),
  additional_guarantees: z.object({
    bank_guarantee: z
      .object({
        on_going: z.boolean(),
        amount: z.number().nullable().optional(),
        deadline: datePreprocessor.nullable().optional(),
        renewal_date: datePreprocessor.nullable().optional(),
      })
      .nullable()
      .optional(),
    cash_deposit: z
      .object({
        on_going: z.boolean(),
        amount: z.number().nullable().optional(),
        deadline: datePreprocessor.nullable().optional(),
        renewal_date: datePreprocessor.nullable().optional(),
      })
      .nullable()
      .optional(),
  }),
  gbeo: z.object({
    amount: z.number().nullable().optional(),
    deadline: datePreprocessor.nullable().optional(),
    returned: z
      .object({
        is_completed: z.boolean(),
        amount_returned: z.number().nullable().optional(),
        steps: z.array(
          z.object({
            date: datePreprocessor.nullable().optional(),
            amount: z.number().nullable().optional(),
          })
        ),
      })
      .nullable()
      .optional(),
  }),
});

/* **
 * Details schema
 * ** */

const detailSchema = z.object({
  contract_file_url: z.string().url().nullable().optional(),
  general_layout_urls: z.array(z.string().url()).nullable().optional(),
  local_layout_urls: z.array(z.string().url()).nullable().optional(),
  attachments_urls: z.array(z.string().url()).nullable().optional(),
  addendas_urls: z.array(z.string().url()).nullable().optional(),
  pictures_urls: z.array(z.string().url()).nullable().optional(),
  external_leases_urls: z.array(z.string().url()).nullable().optional(),
  other_contracts_urls: z.array(z.string().url()).nullable().optional(),
  external_cloud_folder_url: z.string().url().nullable().optional().nullable().optional(),
  comments: z.string().nullable().optional(),
});

/* **
 * Contract schema
 * ** */

const contractSchema = z.object({
  code: z.string().nullable().optional(),
  ref_catastral: z.string().nullable().optional(),
  basic: basicSchema.nullable().optional(),
  financial: financialSchema.nullable().optional(),
  break_options: breakOptionSchema.nullable().optional(),
  guarantees: guaranteeSchema.nullable().optional(),
  details: detailSchema.nullable().optional(),
});

/* **
 * Lease schema
 * ** */

const personSchema = z.object({
  name: z.string().nullable().optional(),
  lastname: z.string().nullable().optional(),
  email: z.string().email().nullable().optional(),
  phone: z.string().nullable().optional(),
  address: z.string().nullable().optional(),
});

const landlordSchema = z.object({
  id: z.string().optional(),
  name: z.string().nullable().optional(),
  activity: z.string().nullable().optional(),
  type: z.string().nullable().optional(),
  contact: personSchema,
});

const brandSchema = z.object({
  id: z.string().optional(),
  name: z.string().nullable().optional(),
  activity: z.string().nullable().optional(),
  contact: personSchema,
});

const consultantSchema = z.object({
  id: z.string().optional(),
  name: z.string().nullable().optional(),
  contact: personSchema,
});

export const leaseSchema = z.object({
  id: z.string().optional(),
  landlord: landlordSchema.nullable().optional(),
  brand: brandSchema.nullable().optional(),
  consultant: consultantSchema.nullable().optional(),
  contract: contractSchema.nullable().optional(),
  status: z.enum([
    "project",
    "active",
    "terminated",
    "deprecated",
    "renewed",
    "closed",
    "draft",
    "lapsed",
  ]),
  metadata: z
    .object({
      renew_or_close: z.boolean().optional(),
    })
    .catchall(z.any())
    .optional(),
  tracking: z
    .array(
      z.object({
        user: z.object({
          id: z.string().nullable().optional(),
          email: z.string().email(),
          name: z.string().nullable().optional(),
          lastname: z.string().nullable().optional(),
        }),
        date: datePreprocessor.default(new Date()),
        changes: z
          .array(
            z.object({
              field: z.string(),
              old_value: z.any(),
              new_value: z.any(),
            })
          )
          .nullable()
          .optional(),
        reason: z.string().nullable().optional(),
      })
    )
    .nullable()
    .optional(),
});

/* **
 * Type
 * ** */

export type Lease = z.infer<typeof leaseSchema>;
