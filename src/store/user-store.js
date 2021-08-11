import create from 'zustand';

export const userStore = create(set => ({
  userName: '',
  userID: '',
  companyName: '',
  companyType: '',
  companyID: '',
  roleInCompany: '',
  verified: false,
  companyFavouriteStores: [],

  changeUserName: name => set({userName: name}),
  changeUserID: id => set({userID: id}),
  changeCompanyType: type => set({companyType: type}),
  changeCompanyName: name => set({companyName: name}),
  changeCompanyID: id => set({companyID: id}),
  changeRoleInCompany: role => set({roleInCompany: role}),
  changeVerified: verify => set({verified: verify}),
  changeCompanyFavouriteStores: store => set({companyFavouriteStores: store}),
}));
