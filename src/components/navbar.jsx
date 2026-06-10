import { Link } from "react-router";

function Navbar() {
    const routes = [
        {'name':'Home', 'route':'/'},
        {'name':'+', 'route':'/posts'},
    ]

    return (
        <div className="h-[10vh] w-full flex justify-center items-center gap-x-[2vw]">
            {
                routes.map((route, key) => {
                    return <Link key={key} to={route.route}>{route.name}</Link>
                })
            }
        </div>
    )
}

export default Navbar;