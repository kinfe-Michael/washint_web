import NavLink from "../components/CustomNavLink"
import PageWraper from "../components/PageWraper"

function page() {
  return (
    <PageWraper>
        <div>settings</div>
        <NavLink href="/settings/artistDashbord">Artist Dashbord</NavLink>
    </PageWraper>
  )
}

export default page