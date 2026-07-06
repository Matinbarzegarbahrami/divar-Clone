import Image from "next/image";

export default function loading() {
    return (
        <div className="flex-1 flex items-center min-h-svh justify-center">
            <Image
                src="/images/divar.png"
                alt="loading"
                width={100}
                height={100}
            />
        </div>
    )
}