export default function TeamSkeletton() {
    return (
        <>
            {[...Array(6)].map((_, i) => (
                <div
                    key={i}
                    className="bg-card border border-card-border rounded-2xl overflow-hidden animate-pulse"
                >
                    <div className="p-8">
                        <div className="space-y-2 mb-6">
                            <div className="h-4 bg-card-border rounded w-full"></div>
                            <div className="h-4 bg-card-border rounded w-5/6"></div>
                            <div className="h-4 bg-card-border rounded w-2/3"></div>
                        </div>

                        <div className="grid grid-cols-3 gap-2 bg-card-border/50 rounded-xl p-4">
                            <div className="flex flex-col items-center">
                                <div className="flex items-center gap-1 mb-2">
                                    <div className="w-3.5 h-3.5 bg-card-border rounded-full"></div>
                                    <div className="w-8 h-2 bg-card-border rounded"></div>
                                </div>
                                <div className="w-4 h-4 bg-card-border rounded"></div>
                            </div>

                            <div className="flex flex-col items-center border-x border-card-border">
                                <div className="flex items-center gap-1 mb-2">
                                    <div className="w-3.5 h-3.5 bg-card-border rounded-full"></div>
                                    <div className="w-6 h-2 bg-card-border rounded"></div>
                                </div>
                                <div className="w-4 h-4 bg-card-border rounded"></div>
                            </div>

                            <div className="flex flex-col items-center">
                                <div className="flex items-center gap-1 mb-2">
                                    <div className="w-3.5 h-3.5 bg-card-border rounded-full"></div>
                                    <div className="w-8 h-2 bg-card-border rounded"></div>
                                </div>
                                <div className="w-4 h-4 bg-card-border rounded"></div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full py-5 bg-card-border/30 border-t border-card-border flex justify-center">
                        <div className="w-32 h-3 bg-card-border rounded"></div>
                    </div>
                </div>
            ))}
        </>
    );
}
