import Image from "next/image"

function Navbar() {
    return (
        <nav className=" w-full flex flex-col">
            <div className=" bg-orange-400 px-5 py-2 flex justify-center items-center gap-4">
                <Image src="/IDS.png" width={100} height={100} alt="IDS-image" />
                <h1 className=" text-3xl text-slate-700 text-center font-semibold">Empresa de Diseño y Servicios de Ingeniería</h1>
            </div>
            <div className=" bg-slate-950">div2</div>
        </nav>
    )
}

export default Navbar