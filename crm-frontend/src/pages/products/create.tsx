import { Create, useForm } from "@refinedev/antd";
import { Form, Input, InputNumber } from "antd";
import { useTranslate } from "@refinedev/core";

export const ProductCreate = () => {
    const translate = useTranslate();
    const { formProps, saveButtonProps } = useForm();


    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label={translate("products.fields.title")}
                    name={["title"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label={translate("products.fields.description")}
                    name={["description"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label={translate("products.fields.price")}
                    name={["price"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <InputNumber min={0} />
                </Form.Item>
            </Form>
        </Create>
    );
};
