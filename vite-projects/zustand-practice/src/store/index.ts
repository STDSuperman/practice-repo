import create from 'zustand';

const createBoyStore = (set: any, get: any) =>({
  boyAge: 16,
  addBoyAge: () => set(state => ({ boyAge: state.boyAge + 1 }))
})

const createGirlStore = (set: any, get: any) => ({
  girlAge: 16,
  addGirlAge: () => set(state => ({ girlAge: state.girlAge + 1 }))
})

export const useStore = create((set, get) => ({
  ...createBoyStore(set, get),
  ...createGirlStore(set, get)
}))