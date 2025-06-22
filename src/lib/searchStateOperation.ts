import useWashintStore from "@/store/useWashintStore";

export function openSearchBar(){
    const { openSearchBar } = useWashintStore.getState()
    openSearchBar()
}
export function closeSearchBar(){
    const { closeSearchBar } = useWashintStore.getState()
    closeSearchBar()
}