import { create } from 'zustand';

export const useUIStore = create((set) => ({

  isSideModalPost: false,
  openModalPost: () => set({ isSideModalPost: true }),
  closeModalPost: () => set({ isSideModalPost: false }),

  isSideModalEditUser: false,
  openModalEditUser: () => set({ isSideModalEditUser: true }),
  closeModalEditUser: () => set({ isSideModalEditUser: false }),

  typePost: "",
  setTypePost: ( type ) => set({typePost: type })

}));