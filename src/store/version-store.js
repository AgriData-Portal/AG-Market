import create from 'zustand';

export const versionStore = create(set => ({
  updateStatus: '',
  changeUpdateStatus: status => set({updateStatus: status}),
}));
