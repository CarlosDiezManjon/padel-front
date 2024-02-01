import { create } from 'zustand'

const useStore = create((set, get) => ({
  logout: () => set(() => ({ user: null })),
  mode: 'light',
  toggleMode: () => set((state) => ({ mode: state.mode == 'light' ? 'dark' : 'light' })),
  isLoading: false,
  startLoading: () => set(() => ({ isLoading: true })),
  endLoading: () => set(() => ({ isLoading: false })),
  setIsLoading: (newIsLoading) => set(() => ({ isLoading: newIsLoading })),
  currentTab: 0,
  setCurrentTab: (newTab) => set(() => ({ currentTab: newTab })),
  token: null,
  setToken: (newToken) => set(() => ({ token: newToken })),
  user: null,
  setUser: (newUser) => set(() => ({ user: newUser })),
  error: null,
  setError: (newError) => set(() => ({ error: newError })),
  onCloseError: () => set(() => ({ error: null })),
  axios: null,
  setAxios: (newAxios) => set(() => ({ axios: newAxios })),
  confirmationDialogContent: null,
  setConfirmationDialogContent: (newConfirmationDialogContent) =>
    set(() => ({ confirmationDialogContent: newConfirmationDialogContent })),
  messageRequest: null,
  setMessageRequest: (newMessageRequest) => set(() => ({ messageRequest: newMessageRequest })),
  reservasSelected: [],
  addReservaSelected: (newReserva) =>
    set((state) => ({ reservasSelected: [...state.reservasSelected, newReserva] })),
  removeReservaSelected: (reservaToRemove) =>
    set((state) => ({
      reservasSelected: state.reservasSelected.filter(
        (reserva) =>
          !(
            reserva.startTime === reservaToRemove.startTime &&
            reserva.pista_id === reservaToRemove.pista_id
          ),
      ),
    })),
  clearReservasSelected: () => set(() => ({ reservasSelected: [] })),
  reservasToCancel: [],
  addReservaToCancel: (newReserva) =>
    set((state) => ({ reservasToCancel: [...state.reservasToCancel, newReserva] })),
  removeReservaToCancel: (reservaToRemove) =>
    set((state) => ({
      reservasToCancel: state.reservasToCancel.filter(
        (reserva) =>
          !(
            reserva.startTime === reservaToRemove.startTime &&
            reserva.pista_id === reservaToRemove.pista_id
          ),
      ),
    })),
  clearReservasToCancel: () => set(() => ({ reservasToCancel: [] })),
  clearState: () =>
    set(() => ({
      reservasSelected: [],
      reservasToCancel: [],
      user: null,
      token: null,
      error: null,
      confirmationDialogContent: null,
      messageRequest: null,
    })),
}))
export default useStore

// currentTime: '2023-01-01T00:00:00',
// setCurrentTime: (newTime) => set(() => ({ currentTime: newTime })),
// getCurrentTime: () => {
// 	return get().currentTime
// },
// mainVideoSeeked: false,
// setMainVideoSeeked: (value) => set(() => ({ mainVideoSeeked: value })),
// isPlayingStore: null,
// callFromMain: null,
// play: (fromMain) => set(() => ({ isPlayingStore: true, callFromMain: fromMain ? true : false })),
// pause: (fromMain) => set(() => ({ isPlayingStore: false, callFromMain: fromMain ? true : false })),
// vessel: null,
// setVessel: (newVessel) => set(() => ({ vessel: newVessel })),
// speed: 1,
// setSpeed: (newSpeed) => set(() => ({ speed: newSpeed })),
// rangeConfigEnabled: true,
// enableRangeConfigEnabled: () => set(() => ({ rangeConfigEnabled: true })),
// disableRangeConfigEnabled: () => set(() => ({ rangeConfigEnabled: false })),
// tabSelected: '0',
// setTabSelected: (newTab) => set(() => ({ tabSelected: newTab })),
// jumpRequested: null,
// setJumpRequested: (newJump) => set(() => ({ jumpRequested: newJump })),
// updatedSecondaryTab: null,
// setUpdatedSecondaryTab: (tab) => set(() => ({ updatedSecondaryTab: tab })),
// project: null,
// setProject: (newProject) => set(() => ({ project: newProject })),
// mainVideo: null,
// setMainVideo: (newMainVideo) => set(() => ({ mainVideo: newMainVideo })),
