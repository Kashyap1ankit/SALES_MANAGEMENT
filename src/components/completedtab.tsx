import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { useState } from "react";
import EditModal from "./editmodal";

const getRandomDate = () => {
  const startDate = new Date("2020-01-01");
  const endDate = new Date(Date.now());
  const randomTime =
    startDate.getTime() +
    Math.random() * (endDate.getTime() - startDate.getTime());
  return new Date(randomTime);
};

type finalSale = {
  customer_id: string;
  items: {
    sku_id: string;
    price: string;
    quantity: string;
  }[];
  paid: string;
  invoice_no: string;
  invoice_date: string;
};

export default function CompletedTableComp({
  data,
  setData,
}: {
  data: any;
  setData: React.Dispatch<React.SetStateAction<finalSale[]>>;
}) {
  const [currData, _] = useState<finalSale>(data[0]);
  return (
    <div className="">
      <TableContainer overflowX={"auto"} className="rounded-md">
        <Table
          variant="striped"
          size={"lg"}
          colorScheme="gray"
          className="bg-white"
        >
          <Thead className="bg-tabPurple ">
            <Tr>
              <Th textColor={"white"}>Id</Th>
              <Th textColor={"white"}>Customer Name</Th>
              <Th textColor={"white"}>Price</Th>
              <Th textColor={"white"}>Last Modified</Th>
              <Th textColor={"white"}>View</Th>
            </Tr>
          </Thead>
          <Tbody className="text-slate500">
            {data.map((e: any) => {
              const date = getRandomDate();
              if (e.paid === "true")
                return (
                  <Tr key={e.customer_id}>
                    <Td>#{e.invoice_no.slice(10, e.invoice_no.length)}</Td>
                    <Td>{e.customer_id}</Td>
                    <Td>₹{e.items[0].price * e.items[0].quantity}</Td>
                    <Td>
                      {e.invoice_date} (
                      {date.getHours().toString().padStart(2, "0")}:
                      {date.getMinutes().toString().padStart(2, "0")}
                      {date.getHours() > 12 ? "PM" : "AM"})
                    </Td>
                    <Td>
                      <EditModal
                        currData={currData}
                        isRead={true}
                        setData={setData}
                      />
                    </Td>
                  </Tr>
                );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}
