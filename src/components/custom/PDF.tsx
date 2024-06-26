import { Document, Page, Text, StyleSheet, View } from "@react-pdf/renderer";
import { Fragment } from "react";
import moment from "moment";
import { Bill } from "../../models/types";

const styles = StyleSheet.create({
    page: {
        width: "100%",
        padding: '20px',
        height: "100%",
    },
    title:{
        textAlign: 'center',
        fontSize: '40px'
    },
    tableContainer: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        marginTop: 10,
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#333",
        color: "white",
    },
    row: {
        display: "flex",
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor: "#ddd",
        padding: 5,
        fontSize: 10,
    },
    description: {
        width: "100%",
        paddingLeft: 5,
    },
    xyz: {
        width: "40%",
        paddingLeft: 5,
    },
});

type ItemsTableProps = {
    items: any[];
    columns?: any[];
};

type PDFProps = {
    columns: any[];
    data: any[];
    clientName: string;
};

function PDF(props: PDFProps) {
    const { columns, data , clientName } = props;

    return (
        <Document style={{ width: "100%" }}>
            <Page style={styles.page}>
                <Text style={styles.title}>Cliente {clientName}</Text>
                <ItemsTable items={data} columns={columns} />
            </Page>
        </Document>
    );
}

//#region AUXILIARES
const Header = (props: ItemsTableProps) => {
    const { items } = props;
    return (
        <View style={styles.headerRow}>
            {items.map((item, index) => (
                <Text key={index.toString()} style={styles.description}>
                    {item.header}
                </Text>
            ))}
        </View>
    );
};

const ItemsTable = (props: ItemsTableProps) => {
    const { items, columns } = props;
    return (
        <View style={styles.tableContainer}>
            <Header items={columns || []} />
            <TableRow items={items} header />
        </View>
    );
};

const TableRow = (props: ItemsTableProps & { header?: boolean }) => {
    const { items } = props;
    const filteredColumns = items.map((invoice) => {
        return Object.keys(invoice).reduce((acc: any, key) => {
            if (key === "_id" || key === "__v" || key === "client") return acc;
            if (key === "date") {
                acc[key as keyof {} ] = moment(invoice[key]).format("DD/MM/YYYY");
            } else {
                acc[key as keyof {}] = invoice[key as keyof {}];
            }
            return acc;
        }, {}) as Bill;
    }) as any;

    const rows = items.map((invoice, index) => {
        return (
            <View key={index.toString() + invoice._id} style={styles.row}>
                <Text style={{ width: "20%" }}>{filteredColumns[index].invoice}</Text>
                <Text style={{ width: "20%" }}>{filteredColumns[index].date}</Text>
                <Text style={{ width: "20%" }}>{filteredColumns[index].base}</Text>
                <Text style={{ width: "20%" }}>{filteredColumns[index].iva}</Text>
                <Text style={{ width: "20%" }}>{filteredColumns[index].amount}</Text>
            </View>
        );
    });
    return <Fragment>{rows}</Fragment>;
};
//#endregion

export default PDF;
