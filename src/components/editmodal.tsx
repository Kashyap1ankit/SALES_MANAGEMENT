import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Radio,
  RadioGroup,
  Button,
  Input,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Products from "../lib/product.json";
import { salesSchema } from "../schema";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

type salesType = z.infer<typeof salesSchema>;

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
  product?: string;
};

export default function EditModal({
  currData,
  setData,
  isRead,
}: {
  currData: finalSale;
  setData: React.Dispatch<React.SetStateAction<finalSale[]>>;
  isRead?: boolean;
}) {
  let { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);
  const [paid, setPaid] = useState(currData.paid);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<salesType>({
    resolver: zodResolver(salesSchema),
  });

  const onSubmit: SubmitHandler<salesType> = (data: salesType) => {
    data.paid = paid;
    setData((prev: any) => {
      const index = prev.findIndex(
        (e: any) => e.customer_id === data.customer_id
      );

      const updatedSale = {
        customer_id: data.customer_id,
        items: [
          {
            sku_id: uuidv4(),
            price: data.price,
            quantity: data.quantity,
          },
        ],
        paid: data.paid,
        invoice_no: "Invoice -" + uuidv4().slice(0, 7),
        invoice_date: data.date,
      };
      console.log(updatedSale);

      const updatedData = [...prev];
      if (index !== -1) {
        updatedData[index] = updatedSale;
      } else {
        updatedData.push(updatedSale);
      }

      return updatedData;
    });
    onClose();
  };

  return (
    <div>
      <Button className="w-full" onClick={onOpen}>
        ...
      </Button>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalHeader>Edit Sales Order</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div>
                <Input
                  defaultValue={currData.customer_id}
                  type="text"
                  placeholder="Enter Customer Name"
                  {...register("customer_id")}
                  className="xsm:mt-2 xsm:mb-2 md:mt-4 md:mb-4 dark:text-gray300"
                  readOnly={isRead}
                />
                <p className="text-red font-bold mb-4 " role="alert">
                  {errors.customer_id?.message}
                </p>

                <Select
                  defaultValue={currData.product}
                  placeholder="Select Product"
                  {...register("product")}
                  disabled={isRead}
                >
                  {Products.map((e) => {
                    return (
                      <option key={e.id} value={e.name}>
                        {e.name}
                      </option>
                    );
                  })}
                </Select>

                <p className="text-red font-bold mb-4 " role="alert">
                  {errors.product?.message}
                </p>

                <NumberInput
                  _placeholder={"Enter Quantity"}
                  className="xsm:mt-2 xsm:mb-2 md:mt-4 md:mb-4 dark:text-gray300"
                  defaultValue={currData.items[0].quantity}
                  isDisabled={isRead}
                >
                  <NumberInputField {...register("quantity")} />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>

                <p className="text-red font-bold mb-4 " role="alert">
                  {errors.quantity?.message}
                </p>

                <Input
                  defaultValue={currData.items[0].price}
                  type="number"
                  placeholder="Enter Price"
                  {...register("price")}
                  className="xsm:mt-2 xsm:mb-2 md:mt-4 md:mb-4 dark:text-gray300"
                  readOnly={isRead}
                />
                <p className="text-red font-bold mb-4 " role="alert">
                  {errors.price?.message}
                </p>
                <div>
                  <RadioGroup
                    value={paid}
                    onChange={setPaid}
                    defaultValue={currData.paid}
                    isDisabled={isRead}
                  >
                    <Radio value="true" spacing={"1rem"}>
                      Paid
                    </Radio>
                    <Radio value="false" spacing={"1rem"}>
                      Unpaid
                    </Radio>
                  </RadioGroup>
                </div>

                <Input
                  defaultValue={currData.invoice_date}
                  type="date"
                  placeholder="Select Date"
                  {...register("date")}
                  className="xsm:mt-2 xsm:mb-2 md:mt-4 md:mb-4 dark:text-gray300"
                  readOnly={isRead}
                />
                <p className="text-red font-bold mb-4 " role="alert">
                  {errors.product?.message}
                </p>
              </div>
            </ModalBody>

            <ModalFooter>
              {isRead ? (
                ""
              ) : (
                <Button colorScheme="blue" mr={3} type="submit">
                  Submit
                </Button>
              )}
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </div>
  );
}
