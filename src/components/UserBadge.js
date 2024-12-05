import { StrapiImage } from './StrapiImage'

function UserBadge({
    username,
    logo
}) {
    if (!username) return null;

    return (
        <div className="absolute top-9 left-9 flex flex-row gap-4">
            <div className="w-12 h-12 rounded-full bg-stone-200">
                {logo ? 
                    <StrapiImage src={logo} width={48} height={48} alt="" className="aspect-square object-contain" /> :
                    ''
                }
            </div>
            
            <div>
                Welcome!
                <strong className="block text-lg">{username}</strong>
            </div>
        </div>
    );
}

export default UserBadge