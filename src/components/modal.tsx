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
}[];

export default function AddModal({
  setData,
}: {
  setData: React.Dispatch<React.SetStateAction<finalSale>>;
}) {
  let { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);
  const [paid, setPaid] = useState("false");

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
      return [
        ...prev,
        {
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
          product: data.product,
        },
      ];
    });
    console.log({
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
      product: data.product,
    });
    onClose();
  };

  return (
    <div>
      <Button className="w-full" onClick={onOpen}>
        + Sales{" "}
      </Button>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalHeader>Add New Sales Order</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div>
                <Input
                  type="text"
                  placeholder="Enter Customer Name"
                  {...register("customer_id")}
                  className="xsm:mt-2 xsm:mb-2 md:mt-4 md:mb-4 dark:text-gray300"
                />
                <p className="text-red font-bold mb-4 " role="alert">
                  {errors.customer_id?.message}
                </p>

                <Select placeholder="Select Product" {...register("product")}>
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
                  type="number"
                  placeholder="Enter Price"
                  {...register("price")}
                  className="xsm:mt-2 xsm:mb-2 md:mt-4 md:mb-4 dark:text-gray300"
                />
                <p className="text-red font-bold mb-4 " role="alert">
                  {errors.price?.message}
                </p>
                <div>
                  <RadioGroup value={paid} onChange={setPaid}>
                    <Radio value="true" spacing={"1rem"}>
                      Paid
                    </Radio>
                    <Radio value="false" spacing={"1rem"}>
                      Unpaid
                    </Radio>
                  </RadioGroup>
                </div>

                <Input
                  type="date"
                  placeholder="Select Date"
                  {...register("date")}
                  className="xsm:mt-2 xsm:mb-2 md:mt-4 md:mb-4 dark:text-gray300"
                />
                <p className="text-red font-bold mb-4 " role="alert">
                  {errors.product?.message}
                </p>
              </div>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit">
                Submit
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </div>
  );
}
