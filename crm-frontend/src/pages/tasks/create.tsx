import React from "react";
import { IResourceComponentsProps, useList, useTranslate } from "@refinedev/core";
import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Checkbox } from "antd";
import { IUser } from "../../interfaces/user.interface";

export const TasksCreate: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const { data: data, isLoading } = useList<IUser>({
        resource: 'tasks'
    });
    console.log('data :>> ', data);
    const { formProps, saveButtonProps } = useForm();

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label={translate("tasks.fields.title")}
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
                    label={translate("tasks.fields.assignee")}
                    name={["assignee"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label={translate("tasks.fields.author")}
                    name={["author"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label={translate("tasks.fields.done")}
                    valuePropName="checked"
                    name={["done"]}
                >
                    <Checkbox>Done</Checkbox>
                </Form.Item>
            </Form>
        </Create>
    );
};
