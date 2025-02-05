import { defineStore } from "pinia";

export const useLinksStore = defineStore("links", {
  state: () => {
    return {
      idx: 0 as number,
      links: [] as linksType[],
      profile: {} as profileDetailType,
      check: {} as any,
    };
  },
  actions: {
    async getLinks() {
      const supabase = useSupabaseClient();

      const { data } = await supabase
        .from("Links")
        .select()
        .returns<linksType[]>();

      if (data) {
        this.links = data;
      }
      console.log(data);
    },
  },
});

interface linksType {
  id: number;
  color?: string;
  icon?: string;
  platform?: string;
  link?: string;
  code?: string;
}

interface profileDetailType {
  profileData?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

interface runtimeConfigType {
  public: {
    apiKey: string;
    projectUrl: string;
  };
}
