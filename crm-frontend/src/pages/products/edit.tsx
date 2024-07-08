import React from "react";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, DatePicker, InputNumber } from "antd";
import { useTranslate } from "@refinedev/core";
import dayjs from "dayjs";

export const ProductEdit = () => {
    const translate = useTranslate();
    const { formProps, saveButtonProps, queryResult } = useForm();

    const productsData = queryResult?.data?.data;

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label={translate("products.fields.id")}
                    name={["id"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input readOnly disabled />
                </Form.Item>
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
                <Form.Item
                    label={translate("products.fields.createdAt")}
                    name={["createdAt"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    getValueProps={(value) => ({
                        value: value ? dayjs(value) : undefined,
                    })}
                >
                    <DatePicker />
                </Form.Item>
                <Form.Item
                    label={translate("products.fields.updatedAt")}
                    name={["updatedAt"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    getValueProps={(value) => ({
                        value: value ? dayjs(value) : undefined,
                    })}
                >
                    <DatePicker />
                </Form.Item>
                <Form.Item
                    label={translate("products.fields.__entity")}
                    name={["__entity"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Edit>
    );
};
