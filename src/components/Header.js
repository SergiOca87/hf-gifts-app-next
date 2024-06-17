import Image from "next/image";


export default function Header({ theme }) {
    return (
        <div className="relative z-20">
            <div className="absolute top-[1rem] left-[0]">
                <Image src="http://127.0.0.1:1337/uploads/654cabef6cb126c95eb0f6a8_logo_bf91edb80b.svg" alt="Logo" height={100} width={100} />
            </div>
            <div className="absolute top-[-2rem] right-[-2rem]">
                <Image src="http://127.0.0.1:1337/uploads/decorator_cfe24b8c8b.svg" alt="Logo" height={400} width={400} />
            </div>
        </div>
    );
}