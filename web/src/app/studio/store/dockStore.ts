import { create } from 'zustand';

export interface Platform {
  id: string;
  title: string;
  href: string;
  icon: any;
}

interface DockStore {
  selectedPlatforms: string[];
  availablePlatforms: Platform[];
  togglePlatform: (platformId: string) => void;
  selectMultiplePlatforms: (platformIds: string[]) => void;
  clearSelection: () => void;
  setAvailablePlatforms: (platforms: Platform[]) => void;
  isPlatformSelected: (platformId: string) => boolean;
}

export const useDockStore = create<DockStore>((set, get) => ({
  selectedPlatforms: ["github"],
  availablePlatforms: [],
  
  togglePlatform: (platformId: string) => {
    set((state) => ({
      selectedPlatforms: state.selectedPlatforms.includes(platformId)
        ? state.selectedPlatforms.filter(id => id !== platformId)
        : [...state.selectedPlatforms, platformId]
    }));
  },
  
  selectMultiplePlatforms: (platformIds: string[]) => {
    set({ selectedPlatforms: platformIds });
  },
  
  clearSelection: () => {
    set({ selectedPlatforms: [] });
  },
  
  setAvailablePlatforms: (platforms: Platform[]) => {
    set({ availablePlatforms: platforms });
  },
  
  isPlatformSelected: (platformId: string) => {
    return get().selectedPlatforms.includes(platformId);
  }
}));
