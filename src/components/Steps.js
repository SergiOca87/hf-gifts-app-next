function Steps({
    steps,
    current = 1
}) {
    if (!steps) return null;

    const progress = current === steps.length ? 'full' : `${current - 1}/${steps.length - 1}`;

    return (
        <div className="flex justify-between w-96 mx-auto h-0.5 bg-neutral-200 relative rounded-sm">
            <div className={`absolute h-full rounded-sm bg-gradient-to-r from-primary to-cyan-200 w-${progress}`}>
                <div className="absolute w-2 h-2 rounded-full bg-primary -right-1 -top-[3px]"></div>
            </div>
            {steps.map((step, index) => {
                return (
                    <div className="relative" key={index}>
                        <span className={`absolute -translate-x-1/2 top-7 w-32 ${index === current - 1 ? 'font-semibold' : 'opacity-40'}`}>{step}</span>
                    </div>
                )
            })}
        </div>
    );
}

export default Steps