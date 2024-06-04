export default function Page({ params }: { params: { id: string } }) {
    return (
        <div>
            <h1>
                Reading Page
            </h1>
            <p>Module ID: {params.id}</p>
        </div>
    )
}