import { create } from 'zustand'

const useStore = create((set, get) => ({
    user: {username: "asdfsd", name: "Carlos Díez", password: "asdf", saldo: "0€"},
    login: (newUser) => set(() => ({ user: newUser })),
    logout: () => set(()=> ({user: null})),
	mode: "light",
	toggleMode: () => set((state) => ({ mode: state.mode == "light" ? "dark": "light" })),
	isLoading: false,
	startLoading:() => set(() => ({ isLoading: true})),
	endLoading:() => set(() => ({ isLoading: false})),
	currentTab: 0,
	setCurrentTab: (newTab) => set(() => ({ currentTab: newTab})),
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