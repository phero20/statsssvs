import { useState, useEffect } from "react";
import { useStudioStore, StudioStoreKey } from "@/store/useStudioStore";
import { usePlatformStats } from "@/hooks";

export function useIntegrationField(storeKey?: StudioStoreKey) {
  const setField = useStudioStore((state) => state.setField);
  const savedValue = useStudioStore((state) =>
    storeKey ? (state as Record<string, any>)[storeKey] : "",
  );

  const [localValue, setLocalValue] = useState(savedValue || "");

  useEffect(() => {
    setLocalValue(savedValue || "");
  }, [savedValue]);

  const { isFetching, isError, isSuccess, data, refetch } = usePlatformStats(
    storeKey,
    localValue,
  );

  const handleSave = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!storeKey) return;

    setField(storeKey, localValue);
    console.log(`✅ [Zustand Store] Updated '${storeKey}' to:`, localValue);

    const { data: refetchedData } = await refetch();
    if (refetchedData !== null) {
      console.log(`📡 [Fetch Data for ${storeKey}]:`, refetchedData);
    }
  };

  const clearField = () => {
    if (!storeKey) return;
    setField(storeKey, "");
    setLocalValue("");
  };

  const requiresFetch = [
    "githubUser",
    "leetcodeUser",
    "codeforcesUser",
  ].includes(storeKey as string);

  return {
    localValue,
    setLocalValue,
    handleSave,
    clearField,
    isFetching,
    isError,
    isSuccess,
    data,
    isLocallySaved:
      !requiresFetch && !!storeKey && !!savedValue && savedValue === localValue,
  };
}
