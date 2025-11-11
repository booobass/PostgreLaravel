import { Suspense } from "react"
import ThanksUser from "./ThanksUser"

const Page = () => {
    return (
        <Suspense fallback={<p className="flex justify-center items-center h-screen text-xl font-bold bg-gray-100">Loading...</p>}>
            <ThanksUser />
        </Suspense>
    )
}

export default Page