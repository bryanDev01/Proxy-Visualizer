import Image from "next/image"
import Link from "next/link"

function Navbar() {
    return (
        <nav className=" w-full flex flex-col">
            <div className=" bg-orange-400 px-5 py-2 flex justify-center items-center gap-4">
                <Image src="/IDS.png" width={100} height={100} alt="IDS-image" />
                <h1 className=" text-3xl text-slate-700 text-center font-semibold">Empresa de Diseño y Servicios de Ingeniería</h1>
            </div>
            <div className=" bg-slate-700 flex justify-evenly items-center text-slate-200 py-3 px-4">
                <Link href="/pages/Link1">Link 1</Link>
                <Link href="/pages/Link2">Link 2</Link>
                <Link href="/pages/Link3">Link 3</Link>
                <Link href="/pages/Link4">Link 4</Link>
                <Link href="/pages/Link5">Link 5</Link>
            </div>
        </nav>
    )
}

export default Navbar