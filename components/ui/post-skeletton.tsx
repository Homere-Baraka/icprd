export default function PostSkeleton() {
    return (
        <>
            {[...Array(4)].map((_, i) => (
                <tr
                    key={i}
                    className="animate-pulse border-b border-card-border"
                >
                    <td className="px-6 py-5">
                        <div className="h-4 w-48 bg-card-border rounded-md"></div>
                    </td>

                    <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-card-border"></div>
                            <div className="h-3 w-20 bg-card-border rounded-md"></div>
                        </div>
                    </td>
                    <td className="px-6 py-5">
                        <div className="h-6 w-16 bg-card-border rounded-full"></div>
                    </td>

                    <td className="px-6 py-5">
                        <div className="h-3 w-24 bg-card-border rounded-md"></div>
                    </td>

                    <td className="px-6 py-5 text-right">
                        <div className="h-8 w-8 bg-card-border rounded-lg ml-auto"></div>
                    </td>
                </tr>
            ))}
        </>
    );
}
