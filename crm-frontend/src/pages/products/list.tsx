import React from "react";
import { BaseRecord, useTranslate } from "@refinedev/core";
import {
    useTable,
    List,
    EditButton,
    ShowButton,
    DeleteButton,
    DateField,
} from "@refinedev/antd";
import { Table, Space } from "antd";

export const ProductList = () => {
    const translate = useTranslate();
    const { tableProps } = useTable({
        syncWithLocation: true,
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column
                    dataIndex="id"
                    title={translate("products.fields.id")}
                />
                <Table.Column
                    dataIndex="title"
                    title={translate("products.fields.title")}
                />
                <Table.Column
                    dataIndex="description"
                    title={translate("products.fields.description")}
                />
                <Table.Column
                    dataIndex="price"
                    title={translate("products.fields.price")}
                />
                <Table.Column
                    dataIndex={["createdAt"]}
                    title={translate("products.fields.createdAt")}
                    render={(value: any) => <DateField value={value} />}
                />
                <Table.Column
                    dataIndex={["updatedAt"]}
                    title={translate("products.fields.updatedAt")}
                    render={(value: any) => <DateField value={value} />}
                />
                <Table.Column
                    title={translate("table.actions")}
                    dataIndex="actions"
                    render={(_, record: BaseRecord) => (
                        <Space>
                            <EditButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                            <ShowButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                            <DeleteButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};
