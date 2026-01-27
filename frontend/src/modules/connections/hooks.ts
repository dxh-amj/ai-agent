import { useAddConnection, useConnections, useDeleteConnection } from "./service";

export const useConnectionsData = () => {
  const { data: connections = [], isLoading, error } = useConnections();
  const { mutate: addConnection, isPending: isAdding } = useAddConnection();
  const { mutate: deleteConnection, isPending: isDeleting } = useDeleteConnection();

  return {
    connections,
    isLoading,
    error,
    addConnection,
    isAdding,
    deleteConnection,
    isDeleting,
  };
};
