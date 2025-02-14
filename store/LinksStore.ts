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
        .eq("user_id", this.profile.id)
        .returns<linksType[]>();

      console.log(data);
      if (data) {
        this.links = data;
      }
    },

    async getAuthUser() {
      const supabase = useSupabaseClient();

      let { data } = await supabase.auth.getUser();

      console.log(data);
      if (data.user) {
        this.profile = {
          id: data.user.id,
          firstName: "",
          lastName: "",
          email: data.user.user_metadata.email,
          urlName: data.user.user_metadata.username,
        };

        this.getLinks();
        this.getAvatar();
      }
    },

    async getUserNoAuth(username: string) {
      const supabase = useSupabaseClient<Database>();
      const { data, error } = await supabase
        .from("users_details")
        .select()
        .eq("username", username)
        .single();

      if (data) {
        this.profile = {
          id: data.id,
          firstName: "",
          lastName: "",
          email: data.email,
          urlName: data.username,
        };

        this.getAvatar();
        console.log(data);
      }

      if (error) {
        console.log(error);
        throw showError({
          statusCode: 404,
          statusMessage: "Page Not Found",
          message: error.details,
          data: username,
        });
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
  id?: string;
  user_id?: string;
  code?: string;
  icon?: string;
  link?: string;
  color?: string;
  platform?: string;
  created_at?: string;
}

interface profileDetailType {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  urlName?: string;
  profileData?: string;
}
