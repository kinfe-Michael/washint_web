import { PropsWithChildren } from "react"
import Sidebar from "./sidebar"
import BottomContainer from "./BottomContainer"

function PageWraper(props:PropsWithChildren) {
  return (
     <div className="w-full">
      <Sidebar />
      <BottomContainer />
      <div className=" w-full  h-full flex flex-col mt-20 lg:ml-64">
        {props.children}
      </div>
    </div>
  )
}

export default PageWraper