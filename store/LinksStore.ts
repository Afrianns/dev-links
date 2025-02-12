import { defineStore } from "pinia";
import type { Database } from "~/types/supabase";

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
      const supabase = useSupabaseClient<Database>();

      const { data } = await supabase
        .from("Links")
        .select()
        .returns<linksType[]>();

      if (data) {
        this.links = data;
      }
    },

    async getUser() {
      const supabase = useSupabaseClient();

      let { data } = await supabase.auth.getUser();

      console.log(data);
      if (data.user) {
        this.profile = {
          id: data.user.id,
          firstName: "",
          lastName: "",
          email: data.user.email,
          urlName: data.user.user_metadata.username,
        };

        this.getAvatar();
      }
    },

    async getAvatar() {
      const config = useRuntimeConfig();
      const supabase = useSupabaseClient();

      const { data, error } = await supabase.storage
        .from("Profile Pictures")
        .exists(`avatars/avatar_user${this.profile.id}`);

      if (data)
        this.profile.profileData =
          config.public.storageImagesUrl + this.profile.id;
    },
  },
});

interface linksType {
  code?: string | null;
  color?: string | null;
  created_at?: string | null;
  icon?: string | null;
  id?: string;
  link?: string | null;
  platform?: string | null;
  user_id?: string;
}

interface profileDetailType {
  id: string;
  urlName?: string;
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
