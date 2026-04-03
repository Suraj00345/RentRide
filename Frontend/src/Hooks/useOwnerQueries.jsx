// src/components/pages/OwnerApprovalsPage.jsx
import { useQuery } from "@tanstack/react-query";
import { fetchOwnerCars } from "../services/ownerApi";
import { usePendingOwners, useApproveOwner, useRejectOwner } from "../../hooks/useAdminQueries";
import { useAdminStore } from "../../store/useAdminStore";

 export const OwnerApprovalsPage = () => {
  const { data: owners = [], isLoading, isError } = usePendingOwners();
  const approveOwner  = useApproveOwner();
  const rejectOwner   = useRejectOwner();
  const ownerStatuses = useAdminStore((s) => s.ownerStatuses);

  // Merge server data with optimistic local overrides
  const mergedOwners = owners.map((o) => ({
    ...o,
    status: ownerStatuses[o.id] ?? o.status,
  }));

  if (isLoading) return <LoadingState />;
  if (isError)   return <ErrorState />;

  return (
    <OwnerApprovalsPageUI
      owners={mergedOwners}
      onApprove={(id) => approveOwner.mutate(id)}
      onReject={(id)  => rejectOwner.mutate(id)}
    />
  );
};

