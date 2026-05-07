import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Catalog from "@/pages/catalog";
import AnimeDetail from "@/pages/anime-detail";
import UsersRating from "@/pages/users-rating";
import Achievements from "@/pages/achievements";
import Profile from "@/pages/profile";
import AdminDashboard from "@/pages/admin/dashboard";
import AdminUsers from "@/pages/admin/users";
import AdminAnime from "@/pages/admin/anime";
import AdminAnimeForm from "@/pages/admin/anime-form";
import AdminSettings from "@/pages/admin/settings";
import AdminSiteSettings from "@/pages/admin/site-settings";
import AdminImportAnime from "@/pages/admin/import-anime";
import AdminTags from "@/pages/admin/tags";
import AdminStudios from "@/pages/admin/studios";
import PublicProfile from "@/pages/public-profile";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/catalog" component={Catalog} />
      <Route path="/anime/:id" component={AnimeDetail} />
      <Route path="/users-rating" component={UsersRating} />
      <Route path="/achievements" component={Achievements} />
      <Route path="/profile" component={Profile} />
      <Route path="/user/:username" component={PublicProfile} />
      
      {/* Admin Routes */}
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/users" component={AdminUsers} />
      <Route path="/admin/anime" component={AdminAnime} />
      <Route path="/admin/anime/new" component={AdminAnimeForm} />
      <Route path="/admin/anime/edit/:id" component={AdminAnimeForm} />
      <Route path="/admin/anime/import" component={AdminImportAnime} />
      <Route path="/admin/tags" component={AdminTags} />
      <Route path="/admin/studios" component={AdminStudios} />
      <Route path="/admin/settings" component={AdminSettings} />
      <Route path="/admin/site-settings" component={AdminSiteSettings} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
        <Sonner position="top-right" theme="dark" />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
