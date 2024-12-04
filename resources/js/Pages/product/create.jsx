import { useState } from "react";
import { Link } from "@inertiajs/inertia-react";
import { router } from "@inertiajs/react";
import { AppProvider, Page, Card, TextField, Select, Button, Banner } from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';

const Create = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        type: '',
    });

    const [errors, setErrors] = useState({});
    const [globalError, setGlobalError] = useState('');

    const productTypes = [
        { label: 'Select a type', value: '' },
        { label: 'Electronics', value: 'electronics' },
        { label: 'Clothing', value: 'clothing' },
        { label: 'Furniture', value: 'furniture' },
        { label: 'Books', value: 'books' },
    ];

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
        setErrors({ ...errors, [field]: '' });
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Product title is required.';
            valid = false;
        }
        if (!formData.description.trim()) {
            newErrors.description = 'Product description is required.';
            valid = false;
        }
        if (!formData.price.trim() || isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
            newErrors.price = 'A valid product price is required.';
            valid = false;
        }
        if (!formData.type.trim()) {
            newErrors.type = 'Product type is required.';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validateForm()) {
            setGlobalError('Please fix the errors below and try again.');
            return;
        }

        setGlobalError('');

        router.post('/products/create', formData);
    };

    return (
        <AppProvider>
            <section className="container mx-auto p-2 lg:p-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl">Create Product</h3>
                    <Link href="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Back</Link>
                </div>

                <Page>
                    <Card sectioned>
                        {globalError && (
                            <Banner status="critical" title="Validation Error">
                                <p>{globalError}</p>
                            </Banner>
                        )}

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <TextField
                                label={<span>Product Title <span style={{ color: 'red' }}>*</span></span>}
                                value={formData.title}
                                onChange={(value) => handleInputChange('title', value)}
                                error={errors.title}
                                placeholder="Enter Product Title"
                            />
                            <TextField
                                label={<span>Description <span style={{ color: 'red' }}>*</span></span>}
                                value={formData.description}
                                onChange={(value) => handleInputChange('description', value)}
                                multiline
                                error={errors.description}
                                placeholder="Enter Product Description"
                            />
                            <TextField
                                label={<span>Price <span style={{ color: 'red' }}>*</span></span>}
                                type="number"
                                value={formData.price}
                                onChange={(value) => handleInputChange('price', value)}
                                error={errors.price}
                                placeholder="Enter Product Price"
                            />
                            <Select
                                label={<span>Product Type <span style={{ color: 'red' }}>*</span></span>}
                                options={productTypes}
                                value={formData.type}
                                onChange={(value) => handleInputChange('type', value)}
                                error={errors.type}
                            />
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button submit primary style={{ backgroundColor: '#0070f3', color: '#ffffff' }}>
                                    Submit
                                </Button>
                            </div>
                        </form>
                    </Card>
                </Page>
            </section>
        </AppProvider>
    );
};

export default Create;
