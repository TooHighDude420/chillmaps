import { useLocation } from "react-router"

function Header() {
    if (useLocation().pathname == "/login") {
        return (
            <div className="h-[10vh] w-full bg-[#021A1C]">

            </div>
        )
    } else {
        return (
            <div className="h-[10vh] w-full flex justify-center items-center sticky top-0 bg-[#092123]">
                <p className="text-4xl font-title">ChillMaps</p>
            </div>
        )
    }
}

export default Header