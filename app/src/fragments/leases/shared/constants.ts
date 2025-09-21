import { SignatoriesTab } from "./components/form/tabs/0_signatories";
import { BasicTab } from "./components/form/tabs/1_basic";
import { FinancialTab } from "./components/form/tabs/2_financial";
import { BOTab } from "./components/form/tabs/3_breaks";
import { GuaranteesTab } from "./components/form/tabs/4_guarantees";
import { FilesTab } from "./components/form/tabs/5_files";

export const formTabsData = [
  {
    key: 1,
    label: "Signatories",
    component: SignatoriesTab,
  },
  {
    key: 2,
    label: "Basic",
    component: BasicTab,
  },
  {
    key: 3,
    label: "Financial",
    component: FinancialTab,
  },
  {
    key: 4,
    label: "Break Options",
    component: BOTab,
  },
  {
    key: 5,
    label: "Guarantees",
    component: GuaranteesTab,
  },
  {
    key: 6,
    label: "Files",
    component: FilesTab,
  },
];
