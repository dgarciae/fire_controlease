import { Lease } from "../shared";

export const getTotalOccupancyCost = (lease: Lease) => () => {
  const rent =
    lease.contract.financial?.rents?.invoiced ??
    lease.contract.financial?.rents?.signed ??
    lease.contract.financial?.rents?.computed ??
    0;

  return Math.round((Number(rent) / 12) * 100) / 100;
};

export const get_next_date = (lease: Lease) => () => {
  const now = Date.now();

  const contractBO = (lease.contract.break_options?.contract?.options ?? [])
    .map((option) => option.end_date)
    .filter((date) => date && new Date(date) > new Date());

  const externalBO = (lease.contract.break_options?.external_unit?.options ?? [])
    .map((option) => option.end_date)
    .filter((date) => date && new Date(date) > new Date());

  const EVENTS = {
    end: "Contract End",
    contractBO: "Contract Break Op",
    externalBO: "External Break Op",
    renewal: "Renewal Guarantee",
  };

  const DATES = {
    end: lease.contract.basic?.dates?.end,
    contractBO: contractBO.length > 0 ? contractBO[0] : undefined,
    externalBO: externalBO.length > 0 ? externalBO[0] : undefined,
    renewal:
      lease.contract.guarantees?.additional_guarantees?.bank_guarantee?.renewal_date &&
      new Date(
        lease.contract.guarantees.additional_guarantees.bank_guarantee.renewal_date
      ) > new Date()
        ? lease.contract.guarantees.additional_guarantees.bank_guarantee.renewal_date
        : undefined,
  };

  const dateDiff = {
    end: DATES.end ? new Date(DATES.end).getTime() - now : Infinity,
    contractBO: DATES.contractBO ? new Date(DATES.contractBO).getTime() - now : Infinity,
    externalBO: DATES.externalBO ? new Date(DATES.externalBO).getTime() - now : Infinity,
    renewal: DATES.renewal ? new Date(DATES.renewal).getTime() - now : Infinity,
  };

  const closestEvent = Object.entries(dateDiff)
    .filter(([_, value]) => value !== Infinity)
    .sort((a, b) => a[1] - b[1])
    .map(([key]) => key);

  return {
    event: closestEvent ? EVENTS[closestEvent[0] as keyof typeof EVENTS] : undefined,
    date: closestEvent ? DATES[closestEvent[0] as keyof typeof DATES] : undefined,
  };
};
