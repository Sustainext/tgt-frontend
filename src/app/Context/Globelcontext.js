'use client'
import { createContext } from "react"
import { useState } from "react"
export const Globalcontext = createContext()

const Globalprovider= (props) => {

const [collapsed, setCollapsed] = useState(true);

return(
<Globalcontext.Provider value={{collapsed,setCollapsed}}>
    {props.childern}
</Globalcontext.Provider>

);

}
export default Globalprovider;