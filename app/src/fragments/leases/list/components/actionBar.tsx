import { TrashIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "@tanstack/react-router";

import { capitalizeText, roles, useAuthStore } from "#src/shell";
import { Button, DropDown, SearchBar } from "#src/shell/ui";

import { AddLeaseButton } from "../../shared";

/* **
 * Props ant types
 ** */

interface ActionBarProps {
  onSearchConfirm: () => void;
  openDeleteModal: () => void;
}

/* **
 * Component
 ** */

export function ListActionBar({ onSearchConfirm, openDeleteModal }: ActionBarProps) {
  /* Render */

  return (
    <div className="grid grid-cols-5 gap-x-2">
      <div className="col-span-3">
        <SearchBar
          onConfirm={onSearchConfirm}
          placeholder="Search by name, address, city"
        />
      </div>
      <div className="col-span-2 flex justify-end gap-x-1">
        <_FilterDropDown />
        <_SortDropDown />
        <_DeleteMultipleButton openDeleteModal={openDeleteModal} />
        <AddLeaseButton />
      </div>
    </div>
  );
}

/* **
 * Filter
 ** */

function _FilterDropDown() {
  /* Hooks */

  const navigate = useNavigate();
  const searchParams = Object.fromEntries(new URLSearchParams(location.search));

  /* Const */

  const filters = ["projects", "active", "terminated", "lapsed", "deprecated"];

  /* Render */

  return (
    <DropDown
      ariaLabel="Filter leases"
      sections={[
        {
          showDivider: false,
          items: [
            ...filters.map((filter) => ({
              key: `filter-${filter}`,
              label: capitalizeText(filter),
              onSelect: () =>
                navigate({
                  to: "/leasing-contracts",
                  search: { ...searchParams, status: filter },
                }),
            })),
            {
              key: "filter-shoppinCenter",
              label: "Shopping Center",
              onSelect: () =>
                navigate({
                  to: "/leasing-contracts",
                  search: { ...searchParams, "contract-type": "shopping_center" },
                }),
            },
          ],
        },
      ]}
    />
  );
}

/* **
 * Sort
 ** */

function _SortDropDown() {
  /* Hooks */

  const navigate = useNavigate();
  const searchParams = Object.fromEntries(new URLSearchParams(location.search));

  /* Const */

  const sorts = ["end_date", "current_rent", "surface"];

  /* Render */

  return (
    <DropDown
      ariaLabel="Sort leases"
      sections={[
        {
          showDivider: false,
          items: sorts.map((sort) => ({
            key: `sortby-${sort}`,
            label: capitalizeText(sort, "_"),
            onSelect: () =>
              navigate({
                to: "/leasing-contracts",
                search: { ...searchParams, "sort-by": sort },
              }),
          })),
        },
      ]}
    />
  );
}

/* **
 * Delete multiple
 ** */

function _DeleteMultipleButton({ openDeleteModal }: { openDeleteModal: () => void }) {
  /* Store */

  const checkRole = useAuthStore((state) => state.checkRole);

  /* Const */

  const canDelete = checkRole(roles.admin, roles.editor);

  /* Render */

  return (
    <Button
      opts={{ isDisabled: canDelete === false }}
      handlers={{ onPress: openDeleteModal }}
    >
      <TrashIcon className="h-5 w-5" />
    </Button>
  );
}
