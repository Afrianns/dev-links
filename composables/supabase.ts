import { createClient } from "@supabase/supabase-js";

export default function useInitialized() {
  const runtimeConfig = useRuntimeConfig();

  const supabase = createClient(
    runtimeConfig.public.projectUrl,
    runtimeConfig.public.apiKey
  );

  return supabase;
}
