import NavLink from "@/app/components/CustomNavLink"
import { Button } from "@/components/ui/button"

function SettingButtons({text,url}:{text:string,url:string}) {
  return (
    <Button className="flex justify-start m-2 p-6"> 
        <NavLink href={url || ''}>{text}</NavLink>
    </Button>
  )
}

export default SettingButtons