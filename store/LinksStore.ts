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
    // get all links from DB supabase(func dont need auth)
    async getLinks() {
      const supabase = useSupabaseClient<Database>();

      const { data } = await supabase
        .from("Links")
        .select()
        .eq("user_id", this.profile.id)
        .returns<linksType[]>();

      if (data) {
        this.links = data;
      }
    },

    // get current user data from supabase(func need auth user)
    async getAuthUser() {
      const supabase = useSupabaseClient();

      let { data } = await supabase.auth.getUser();

      if (data.user) {
        this.profile = {
          id: data.user.id,
          firstName: data.user.user_metadata.first_name,
          lastName: data.user.user_metadata.last_name,
          email: data.user.user_metadata.email,
          urlName: data.user.user_metadata.username,
        };

        this.getLinks();
        this.getAvatar();
      }
    },

    // get current user data from supabase(func don't need auth user)
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
          firstName: data.first_name,
          lastName: data.last_name,
          email: data.email,
          urlName: data.username,
        };

        this.getAvatar();
        this.getLinks();
      }
      // if error/not found user kick user to 404 page 
      if (error) {
        throw showError({
          statusCode: 404,
          statusMessage: "Page Not Found",
          message: error.details,
          data: username,
        });
      }
    },

    // get current user avatar link and check if it exist or not(func need auth user) 
    async getAvatar() {
      const config = useRuntimeConfig();
      const supabase = useSupabaseClient();

      const { data, error } = await supabase.storage
        .from("Profile Pictures")
        .exists(`avatars/avatar_user${this.profile.id}`);

      if (data)
        this.profile.profileData =
          config.public.storageImagesUrl + this.profile.id;

      if (error) {
        console.log(error);
      }
    },
  },
});

interface linksType {
  id?: string;
  user_id: string;
  code?: string;
  icon?: string;
  link?: string;
  color: string;
  platform?: string;
  created_at?: string;
}

interface profileDetailType {
  id: string;
  email?: string;
  firstName: string | null;
  lastName: string | null;
  urlName?: string;
  profileData?: string;
}
