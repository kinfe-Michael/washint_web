import PageWraper from "../components/PageWraper"
import SettingButtons from "./components/SettingButtons"

function Page() {
  return (
    <PageWraper>
        <h1 className="text-xl ml-4 font-bold">settings</h1>
        <SettingButtons text="Artist Dashbord" url="/settings/artistDashboard"/>
    </PageWraper>
  )
}

export default Page