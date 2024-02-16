import { Document, Page, Text, StyleSheet, View } from "@react-pdf/renderer";
import { Fragment } from "react";

const styles = StyleSheet.create({
    page: {
        width: "100%",
        height: "100%",
    },
    tableContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#333",
        color: "white",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: "#ddd",
        padding: 5,
    },
    description: {
        width: "60%",
        paddingLeft: 5,
    },
    xyz: {
        width: "40%",
        paddingLeft: 5,
    },
});

type ItemsTableProps = {
    items: any[];
};

const data = {
    id: "5df3180a09ea16dc4b95f910",
    items: [
        {
            sr: 1,
            desc: "desc1",
            xyz: 5,
        },
        {
            sr: 2,
            desc: "desc2",
            xyz: 6,
        },
    ],
};

function PDF() {
    return (
        <Document style={{width: '100%'}}>
            <Page style={styles.page}>
                <Text>Factura</Text>
                <ItemsTable items={data.items} />
            </Page>
        </Document>
    );
}

//#region AUXILIARES
const ItemsTable = (props: ItemsTableProps) => {
    const { items } = props;
    return (
        <View style={styles.tableContainer}>
            <TableRow items={items} header />
        </View>
    );
};

const TableRow = (props: ItemsTableProps & { header?: boolean }) => {
    const { items, header } = props;
    const rows = items.map((item, index) => (
        <View style={header ? styles.headerRow : styles.row} key={index.toString()}>
            <Text style={styles.description}>{item.desc}</Text>
            <Text style={styles.xyz}>{item.xyz}</Text>
        </View>
    ));
    return <Fragment>{rows}</Fragment>;
};
//#endregion

export default PDF;
