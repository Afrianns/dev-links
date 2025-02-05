export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useSupabaseUser();

  if (to.fullPath === "/" && user.value) {
    return navigateTo("/links");
  }
});
