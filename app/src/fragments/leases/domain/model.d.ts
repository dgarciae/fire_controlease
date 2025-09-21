/* **
 * PersonSchema
 * ** */

export interface PersonSchema {
  name: string | null;
  lastname: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
}

/* **
 * Landlord
 * ** */

export interface LandlordSchema {
  id?: string;
  name: string | null;
  activity: string | null;
  type: string | null;
  contact: PersonSchema;
}

/* **
 * Brand
 * ** */

export interface BrandSchema {
  id?: string;
  name: string | null;
  activity: string | null;
  contact: PersonSchema;
}

/* **
 * Consultant
 * ** */

export interface ConsultantSchema {
  id?: string;
  name: string | null;
  contact: PersonSchema;
}

/* **
 * Basic
 * ** */

export interface BasicSchema {
  name: string | null;
  location: {
    country: string | null;
    region: string | null;
    state_province: string | null;
    city: string | null;
    address: string | null;
    lat: number | null;
    lon: number | null;
    postal_code: string | null;
  };
  surface: number | null;
  url: string | null;
  unit_number: string | null;
  total_lease_term: number | null;
  dates: {
    signing: string | null;
    start: string | null;
    delivery: string | null;
    opening: string | null;
    renewal: string | null;
    closed: string | null;
    end: string | null;
    precedent_condition_end: string | null;
  };
  no_competence_radius: string | null;
  exclusivity: string | null;
  contract_type: "shopping center" | "street" | "travel";
  notes: string | null;
}

/* **
 * Financial
 * ** */

export interface BonificationSchema {
  type: "step_rent" | "discount";
  start_date: string | null;
  end_date: string | null;
  amount_type: "percentage" | "fixed";
  amount: number | null;
}

export interface FinancialSchema {
  rents: {
    signed: number | null;
    invoiced: number | null;
    computed: {
      monthly: number | null;
      yearly: number | null;
    };
    next_review: string | null;
    effort_rate: number | null;
    variable: {
      type: "percentage" | "fixed";
      amount: number | null;
      payment: number | null;
    };
    agreed_increases: {
      type: "percentage" | "fixed";
      start_date: string | null;
      amount: number | null;
    }[];
    key_money: number | null;
    free_period: {
      start_date: string | null;
      end_date: string | null;
      months: number | null;
    };
    external_unit: { signed: number | null; invoiced: number | null };
  };
  charges: {
    service: number | null;
    free_period: number | null;
    external_unit: number | null;
  };
  fees: {
    ibi: number | null;
    ecop: number | null;
    fit_out: number | null;
    intermediation: number | null;
    marketing: number | null;
    other: number | null;
    other_one_shot: number | null;
  };
  sales: {
    amount: number | null;
    forecast: number | null;
    report: string | null;
    clause: string | null;
  };
  ipc: {
    market_ipc: {
      apply: boolean;
      values: {
        year: number;
        amount: number;
      }[];
      start_date: string | null;
    } | null;
    specific_rules: {
      apply: boolean;
      rules: {
        year: number;
        apply_market_index: boolean;
        max_increase: number;
        start_date: string | null;
      }[];
    };
  };
  step_rents: BonificationSchema[];
  discounts: BonificationSchema[];
}

/* **
 * Break Options
 * ** */

interface RegularBOSchema {
  rolling: {
    start_date: string | null;
    notice_period: number | null;
  };
  segmentation: string | null;
  options: {
    year: number | null;
    end_date: string | null;
    notice_period: number | null;
    penalty: {
      apply: boolean;
      type: "percentage" | "fixed";
      amount: number | null;
    };
  }[];
}

export interface BreakOptionSchema {
  contract: RegularBOSchema;
  external_unit: RegularBOSchema;
}

/* **
 * Guarantees
 * ** */

export interface GuaranteeSchema {
  legal_security_deposit: {
    amount: {
      signed: number | null;
      invoiced: number | null;
    };
    update_with_ipc: {
      apply: boolean;
    };
    specific_update: {
      apply: boolean;
      start_date: string | null;
      increase: number | null;
    };
  };
  additional_guarantees: {
    bank_guarantee: {
      on_going: boolean;
      amount: number | null;
      deadline: string | null;
      renewal_date: string | null;
    };
    cash_deposit: {
      on_going: boolean;
      amount: number | null;
      deadline: string | null;
      renewal_date: string | null;
    };
  };
  gbeo: {
    amount: number;
    deadline: string | null;
    returned: {
      is_completed: boolean;
      amount_returned: number | null;
      steps: {
        date: string;
        amount: number;
      }[];
    };
  };
}

/* **
 * Details
 * ** */

export interface DetailSchema {
  contract_file_url: string | null;
  general_layout_urls: string[];
  local_layout_urls: string[];
  attachments_urls: string[];
  addendas_urls: string[];
  pictures_urls: string[];
  external_leases_urls: string[];
  other_contracts_urls: string[];
  external_cloud_folder_url: string | null;
  comments: string | null;
}

/* **
 * Contract
 * ** */

export interface ContractSchema {
  code: string | null;
  reference: string | null;
  ref_catastral: string | null;
  basic: BasicSchema;
  financial: FinancialSchema;
  break_options: BreakOptionSchema;
  guarantees: GuaranteeSchema;
  details: DetailSchema;
}

/* **
 * Lease type
 * ** */

export type LeaseType = {
  id?: string;
  landlord: LandlordSchema | null;
  brand: BrandSchema | null;
  consultant: ConsultantSchema | null;
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
  metadata?: {
    renew_or_close?: boolean;
    [key: string]: any;
  };
  tracking: {
    user: {
      id: string | null;
      email: string;
      name: string | null;
      lastname: string | null;
    };
    date: string;
    changes: {
      field: string;
      old_value: any;
      new_value: any;
    }[];
    reason: string | null;
  }[];
};
