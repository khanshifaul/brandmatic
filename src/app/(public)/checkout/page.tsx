"use client";

import { Button } from "@/components/atoms/button";
import { InputField } from "@/components/atoms/input-field";
import { TextareaField } from "@/components/atoms/textarea-field";
import { useBusiness } from "@/hooks/useBusiness";
import { useCart } from "@/hooks/useCart";
import { CartItem } from "@/types/cart";
import { formatCurrency } from "@/utils/formatCurrency";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const router = useRouter();
  const { businessData } = useBusiness();
  const { items, itemCount, subtotal, shipping, total, clearCart } = useCart();
  const [deliveryArea, setDeliveryArea] = useState<"inside_dhaka" | "outside_dhaka">("inside_dhaka");
  const [note, setNote] = useState("");
  const currency = businessData?.currency?.[0] || "TK";

  // Check for empty cart and redirect
  useEffect(() => {
    if (items.length === 0) {
      router.push("/cart");
    }
  }, [items.length, router]);

  // Define delivery areas
  const DELIVERY_AREAS = [
    {
      id: "inside_dhaka",
      name: "Inside Dhaka",
      charge: businessData?.insideDhaka ?? 60,
    },
    {
      id: "outside_dhaka",
      name: "Outside Dhaka",
      charge: businessData?.outsideDhaka ?? 120,
    },
  ];

  // Form state
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_phone: "",
    customer_address: "",
    note: "",
  });

  const [formErrors, setFormErrors] = useState({
    customer_name: "",
    customer_phone: "",
    customer_address: "",
  });

  // Form validation
  const validateForm = (): boolean => {
    let valid = true;
    const errors = {
      customer_name: "",
      customer_phone: "",
      customer_address: "",
    };

    if (!formData.customer_name.trim()) {
      errors.customer_name = "Name is required";
      valid = false;
    }
    if (!/^01\d{9}$/.test(formData.customer_phone)) {
      errors.customer_phone = "Enter a valid Bangladeshi phone number";
      valid = false;
    }
    if (!formData.customer_address.trim()) {
      errors.customer_address = "Address is required";
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const orderData = {
      ...formData,
      items: items.map((item: CartItem) => ({
        productId: item.productId,
        quantity: item.quantity,
        variant: item.variant,
      })),
      delivery_area: deliveryArea,
      subtotal: subtotal.toString(),
      shipping: shipping.toString(),
      total: total.toString(),
    };

    try {
      // TODO: Implement order submission
      clearCart();
      router.push("/order-success");
    } catch (error) {
      console.error("Failed to create order:", error);
      router.push("/order-failed");
    }
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-3xl font-bold mb-6'>Checkout</h1>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {/* Delivery Form */}
          <div>
            <div className='bg-white dark:bg-gray-900 p-6 rounded-lg shadow mb-8'>
              <h2 className='text-xl font-semibold mb-4'>Delivery Information</h2>
              <form onSubmit={handleSubmit} className='space-y-4'>
                <InputField
                  id='customer_name'
                  name='customer_name'
                  label='Full Name'
                  value={formData.customer_name}
                  onChange={handleChange}
                  error={formErrors.customer_name}
                  required
                />
                <InputField
                  id='customer_phone'
                  name='customer_phone'
                  label='Phone Number'
                  type='tel'
                  value={formData.customer_phone}
                  onChange={handleChange}
                  error={formErrors.customer_phone}
                  required
                  helperText='e.g., 01712345678'
                />
                <div>
                  <label htmlFor='delivery_area' className='block mb-1 font-medium'>
                    Delivery Area
                  </label>
                  <select
                    id='delivery_area'
                    name='delivery_area'
                    value={deliveryArea}
                    onChange={(e) => setDeliveryArea(e.target.value as "inside_dhaka" | "outside_dhaka")}
                    className='w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100'
                  >
                    {DELIVERY_AREAS.map((area) => (
                      <option key={area.id} value={area.id}>
                        {area.name} - {formatCurrency(area.charge, currency)}
                      </option>
                    ))}
                  </select>
                </div>
                <TextareaField
                  id='customer_address'
                  name='customer_address'
                  label='Full Address'
                  value={formData.customer_address}
                  onChange={handleChange}
                  error={formErrors.customer_address}
                  required
                  rows={3}
                />
                <TextareaField
                  id='note'
                  name='note'
                  label='Order Note (Optional)'
                  value={formData.note}
                  onChange={(e) => {
                    handleChange(e);
                    setNote(e.target.value);
                  }}
                  rows={2}
                />
                <Button type='submit' size='lg' className='w-full'>
                  Place Order
                </Button>
              </form>
            </div>
          </div>

          {/* Summary */}
          <div>
            <div className='bg-white dark:bg-gray-900 p-6 rounded-lg shadow sticky top-4'>
              <h2 className='text-xl font-semibold mb-4'>Order Summary</h2>
              <ul className='divide-y dark:divide-gray-700 mb-4'>
                {items.map((item: CartItem) => (
                  <li key={item.productId} className='py-2 flex justify-between'>
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>{formatCurrency(item.price * item.quantity, currency)}</span>
                  </li>
                ))}
              </ul>
              <div className='space-y-2 mb-4'>
                <div className='flex justify-between'>
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal, currency)}</span>
                </div>
                <div className='flex justify-between'>
                  <span>Shipping</span>
                  <span>{formatCurrency(shipping, currency)}</span>
                </div>
              </div>
              <div className='flex justify-between font-bold text-lg border-t pt-4'>
                <span>Total</span>
                <span>{formatCurrency(total, currency)}</span>
              </div>
              <div className='mt-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded'>
                <h3 className='font-medium'>Payment Method</h3>
                <p className='text-sm text-muted-foreground'>Cash on Delivery</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
