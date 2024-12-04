import { Link } from "@inertiajs/inertia-react";
import { AppProvider, Page, Card, DataTable } from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';

const Index = ({ products }) => {

    const rows = products.map((product) => [
        product.title,
        product.description,
        `$${parseInt(product.price).toFixed(2)}`,
        product.type,
    ]);

    return (
        <AppProvider>
            <section className="container mx-auto p-2 lg:p-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl">Products</h3>
                    <Link href="/products/create" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Create</Link>
                </div>

                <Page>
                    <Card>
                        <DataTable
                            columnContentTypes={['text', 'text', 'text', 'text']}
                            headings={['Title', 'Description', 'Price', 'Type']}
                            rows={rows}
                        />
                    </Card>
                </Page>
            </section>
        </AppProvider>
    );
};

export default Index;
