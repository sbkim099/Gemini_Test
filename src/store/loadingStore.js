import { create } from 'zustand';

const useLoadingStore = create(set => ({
    loading: false,
    
    startEndLoading : () => {
        set({ loading: true });

        setTimeout(() => {
            set({ loading: false });
        }, 1000);
    }
}));

export default useLoadingStore;