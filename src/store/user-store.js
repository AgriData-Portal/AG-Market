import create from 'zustand';

export const userStore = create(set => ({
  userName: '',
  userID: '',
  roleInCompany: '',

  changeUserName: name => set({userName: name}),
  changeUserID: id => set({userID: id}),
  changeRoleInCompany: role => set({roleInCompany: role}),
}));
