export default function Page({ params }: { params: { id: string } }) {
    return (
        <div>
            <h1>Practice Page</h1>
            <p>Practice ID: {params.id}</p>
        </div>
    )
}