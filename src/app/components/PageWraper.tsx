import { PropsWithChildren } from "react"
import BottomContainer from "./BottomContainer"
import Sidebar from "./sidebar"

function PageWraper(props:PropsWithChildren) {
  return (
     <div className="w-full">
      <Sidebar />
      <BottomContainer />
      <div className=" w-full lg:pr-64 h-full flex flex-col mb-16 mt-20 lg:ml-64">
        {props.children}
      </div>
    </div>
  )
}

export default PageWraper