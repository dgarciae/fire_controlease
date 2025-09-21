/* **
 * PersonSchema
 * ** */

export interface PersonSchema {
  name?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  address?: string;
}

/* **
 * Landlord
 * ** */

export interface LandlordSchema {
  id?: string;
  name?: string;
  activity?: string;
  type?: string;
  contact?: PersonSchema;
}

/* **
 * Brand
 * ** */

export interface BrandSchema {
  id?: string;
  name?: string;
  activity?: string;
  contact?: PersonSchema;
}

/* **
 * Consultant
 * ** */

export interface ConsultantSchema {
  id?: string;
  name?: string;
  contact?: PersonSchema;
}

/* **
 * Basic
 * ** */

export interface BasicSchema {
  name?: string;
  location?: {
    country?: string;
    region?: string;
    state_province?: string;
    city?: string;
    address?: string;
    lat?: number;
    lon?: number;
    postal_code?: string;
  };
  surface?: number;
  url?: string;
  unit_number?: string;
  total_lease_term?: number;
  dates?: {
    signing:? string;
    start?: string;
    delivery?: string;
    opening?: string;
    renewal?: string;
    closed?: string;
    end?: string;
    precedent_condition_end?: string;
  };
  no_competence?: string;
  exclusivity?: string;
  contract_type?: "shopping center" | "street" | "travel" | "park";
  notes?: string;
}

/* **
 * Financial
 * ** */

export interface BonificationSchema {
  type?: "step_rent" | "discount";
  start_date?: string;
  end_date?: string;
  amount_type?: "percentage" | "fixed";
  amount?: number;
}

export interface FinancialSchema {
  rents?: {
    signed?: number;
    invoiced?: number;
    computed?: {
      monthly?: number;
      yearly?: number;
    };
    variable?: {
      type?: "percentage" | "fixed";
      amount?: number;
      payment?: number;
    };
    agreed_increases?: {
      type?: "percentage" | "fixed";
      start_date?: string;
      amount?: number;
    }[];
    key_money?: number;
    free_period?: {
      start_date?: string;
      end_date?: string;
      months?: number;
    };
    external_unit?: { signed?: number; invoiced?: number };
  };
  charges?: {
    service?: number;
    free_period?: number;
    external_unit?: number;
  };
  fees?: {
    ibi?: number;
    ecop?: number;
    fit_out_contribution?: number;
    intermediation?: number;
    marketing?: number;
    other?: number;
    other_one_shot?: number;
  };
  sales?: {
    amount?: number;
    forecast?: number;
    report?: string;
    clause?: string;
  };
  ipc?: {
    market_ipc?: {
      apply?: boolean;
      start_date?: string;
    };
    specific_rules?: {
      apply?: boolean;
      rules?: {
        apply_market_index?: boolean;
        max_increase?: number;
        start_date?: string;
      }[];
    };
  };
  step_rents?: BonificationSchema[];
  discounts?: BonificationSchema[];
}

/* **
 * Break Options
 * ** */

interface RegularBOSchema {
  rolling?: {
    start_date?: string;
    notice_period?: number;
  };
  segmentation?: string;
  options?: {
    year?: number;
    end_date?: string;
    notice_period?: number;
    penalty?: {
      apply?: boolean;
      type?: "percentage" | "fixed";
      amount?: number;
    };
  }[];
}

export interface BreakOptionSchema {
  contract?: RegularBOSchema;
  external_unit?: RegularBOSchema;
}

/* **
 * Guarantees
 * ** */

interface AdditionalGuarranteesSchema {
  on_going?: boolean;
  amount?: number;
  deadline?: string;
  renewal_date?: string;
}

export interface GuaranteeSchema {
  legal_security_deposit?: {
    amount?: {
      signed?: number;
      invoiced?: number;
    };
    update_with_ipc?: {
      apply?: boolean;
    };
    specific_update?: {
      apply?: boolean;
      start_date?: string;
      increase?: number;
    };
  };
  additional_guarantees?: {
    bank_guarantee?: AdditionalGuarranteesSchema;
    cash_deposit?: AdditionalGuarranteesSchema;
  };
  gbeo: {
    amount?: number;
    deadline?: string;
    returned?: {
      is_completed?: boolean;
      amount_returned?: number;
      steps?: {
        date?: string;
        amount?: number;
      }[];
    };
  };
}

/* **
 * Files
 * ** */

export interface FilesSchema {
  contract_file_url?: string;
  general_layout_urls?: string[];
  local_layout_urls?: string[];
  attachments_urls?: string[];
  addendas_urls?: string[];
  pictures_urls?: string[];
  external_leases_urls?: string[];
  other_contracts_urls?: string[];
  external_cloud_folder_url?: string;
}

/* **
 * Contract
 * ** */

export interface ContractSchema {
  code?: string;
  ref_catastral?: string;
  basic: BasicSchema;
  financial: FinancialSchema;
  break_options: BreakOptionSchema;
  guarantees: GuaranteeSchema;
  files: FilesSchema;
}

/* **
 * Lease
 * ** */

export type Lease = {
  id?: string;
  landlord: LandlordSchema;
  brand: BrandSchema;
  consultant: ConsultantSchema;
  contract: ContractSchema;
  status:
    | "project"
    | "active"
    | "terminated"
    | "deprecated"
    | "renewed"
    | "closed"
    | "draft"
    | "lapsed";
  metadata?: {};
};
