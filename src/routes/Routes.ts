import type { PublicRouteType } from "@models/PublicRouteType/PublicRouteType"
import AboutView from "@view/About/AboutView"
import HomeView from "@view/Home/HomeView"
import ProjectsView from "@view/Projects/ProjectsView"
import ProjectDetailView from "@view/ProjectDetail/ProjectDetailView"
import ServicesView from "@view/Services/ServicesView"
import NewsView from "@view/News/NewsView"
import ContactView from "@/view/Contact/ContactView"
// import { NewsDetail } from "@/components/News"


const publicRoutes:PublicRouteType[]  = [
    { path: "/", component: HomeView },
    { path: "/about-us", component: AboutView },
    { path: "/projects", component: ProjectsView },
    { path: "/project/:id", component: ProjectDetailView },
    { path: "/services", component: ServicesView },
    { path: "/news", component: NewsView },
    // { path: "/news/:slug", component: NewsDetail },
    { path: "/contact", component: ContactView },

]

export {publicRoutes}

