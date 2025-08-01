
import { create } from "zustand";
interface WashintStoreState {
    isSearchBarOpen:boolean,
    openSearchBar: ()=> void,
    closeSearchBar: ()=> void,
    
}
 const useWashintStore = create<WashintStoreState>((set) => ({
    isSearchBarOpen: false,  
    openSearchBar: ()=> set(() => ({isSearchBarOpen:true})),
    closeSearchBar: ()=> set(() => ({isSearchBarOpen:false})),
}))

export default useWashintStore



