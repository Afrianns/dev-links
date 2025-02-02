import { defineStore } from "pinia";

export const useLinksStore = defineStore("links", {
  state: () => {
    return {
      idx: 0 as number,
      links: [] as linksType[],
      profile: {} as profileDetailType,
    };
  },
  actions: {},
});

interface linksType {
  id: number;
  color?: string;
  icon?: string;
  platform?: string;
  link?: string;
}

interface profileDetailType {
  profileData?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}
