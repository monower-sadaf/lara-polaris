import { Link } from "@inertiajs/inertia-react";

const Index = () => {
    return (
        <section className="container mx-auto p-2 lg:p-4">
            <div className="flex justify-between items-center">
                <h3 className="text-2xl">Products</h3>
                <Link href="/products/create" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Create</Link>
            </div>
        </section>
    )
};

export default Index;