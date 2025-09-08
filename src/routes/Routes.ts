import type { PublicRouteType } from "@models/PublicRouteType/PublicRouteType"
import AboutView from "@view/About/AboutView"
import HomeView from "@view/Home/HomeView"
import ProjectsView from "@view/Projects/ProjectsView"
import ProjectDetailView from "@view/ProjectDetail/ProjectDetailView"
import ServicesView from "@view/Services/ServicesView"
import BlogsView from "@/view/Blogs/BlogsView"
import BlogsDetail from "@/view/Blogs/BlogsDetail"
import ContactView from "@/view/Contact/ContactView"


const publicRoutes:PublicRouteType[]  = [
    { path: "/", component: HomeView },
    { path: "/about-us", component: AboutView },
    { path: "/projects", component: ProjectsView },
    { path: "/project/:id/:slug", component: ProjectDetailView },
    { path: "/services", component: ServicesView },
    { path: "/blogs", component: BlogsView },
    { path: "/blogs/:id/:slug", component: BlogsDetail },
    { path: "/contact", component: ContactView }
]

export {publicRoutes}

