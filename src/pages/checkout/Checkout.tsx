import { useEffect, useState } from "react";
import {
  ShoppingCart,
  MapPin,
  CreditCard,
  Truck,
  AlertCircle,
  Check,
  Banknote,
} from "lucide-react";
import {
  useGetCartQuery,
  useUpdateCartAddressMutation,
  useUpdateCartMutation,
} from "@/redux/features/cart/cartApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useCreateCheckoutSessionMutation } from "@/redux/features/stripeApi";
import { loadStripe } from "@stripe/stripe-js";
import { Card } from "@/components/ui/card";
import Spinner from "@/components/ui/spinner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { ICartItem } from "@/types";

const Checkout = () => {
  const [shippingAddress, setShippingAddress] = useState({
    country: "Bangladesh",
    zipCode: "",
    district: "",
    thana: "",
    address: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    zipCode: "",
    district: "",
    thana: "",
    address: "",
    phone: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const { data, isLoading, isError } = useGetCartQuery(undefined);
  const [updateCartAddress] = useUpdateCartAddressMutation();
  const [createCheckoutSession] = useCreateCheckoutSessionMutation();
  const navigate = useNavigate();
  const [updateCart] = useUpdateCartMutation();

  // Add this useEffect hook
  useEffect(() => {
    if (data?.data?.shippingAddress) {
      setShippingAddress((prev) => ({
        ...prev,
        country: data.data.shippingAddress.country || "Bangladesh",
        zipCode: data.data.shippingAddress.zipCode || "",
        district: data.data.shippingAddress.district || "",
        thana: data.data.shippingAddress.thana || "",
        address: data.data.shippingAddress.address || "",
        phone: data.data.shippingAddress.phone || "",
      }));
    }
  }, [data]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600">
        <p>Error loading cart data. Please try again later.</p>
      </div>
    );
  }

  const cartData = data.data || {
    items: [],
    totalAmount: 0,
    totalItems: 0,
    discount: null,
  };

  type ShippingAddressField =
    | "zipCode"
    | "district"
    | "thana"
    | "address"
    | "phone";

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const fieldName = name as ShippingAddressField;
    setShippingAddress((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    // Clear error when user starts typing
    if (errors[fieldName]) {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      zipCode: "",
      district: "",
      thana: "",
      address: "",
      phone: "",
    };

    if (!shippingAddress.zipCode.trim()) {
      newErrors.zipCode = "Zip code is required";
    } else if (!/^\d{4}$/.test(shippingAddress.zipCode)) {
      newErrors.zipCode = "Please enter a valid 4-digit zip code";
    }

    if (!shippingAddress.district.trim()) {
      newErrors.district = "District is required";
    }

    if (!shippingAddress.thana.trim()) {
      newErrors.thana = "Thana/Upazila is required";
    }

    if (!shippingAddress.address.trim()) {
      newErrors.address = "Address is required";
    } else if (shippingAddress.address.trim().length < 10) {
      newErrors.address =
        "Please provide a detailed address (minimum 10 characters)";
    }

    if (!shippingAddress.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (
      !/^(\+88)?01[3-9]\d{8}$/.test(shippingAddress.phone.replace(/\s/g, ""))
    ) {
      newErrors.phone = "Please enter a valid Bangladeshi phone number";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    try {
      // Step 1: Update shipping address
      const addressResult = await updateCartAddress(shippingAddress).unwrap();

      if (!addressResult.success) {
        throw new Error("Failed to update shipping address");
      }

      toast.success("Shipping address updated successfully!");

      // Step 2: Create checkout session
      const sessionResult = await createCheckoutSession(
        cartData.items
      ).unwrap();

      console.log(sessionResult);
      if (!sessionResult.success) {
        throw new Error("Failed to create checkout session");
      }

      // Step 3: Initialize Stripe and redirect
      const stripe = await loadStripe(
        import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
      );

      if (!stripe) {
        throw new Error("Failed to load Stripe");
      }

      const { error } = await stripe.redirectToCheckout({
        sessionId: sessionResult.sessionId,
      });

      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCashOnDelivery = async () => {
    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    // Step 1: Update shipping address
    updateCartAddress(shippingAddress)
      .unwrap()
      .then((response) => {
        if (response.success) {
          toast.success("Shipping address updated successfully!");

          updateCart({ _id: cartData._id, status: "cash_on_delivery" })
            .unwrap()
            .then((cartResponse) => {
              if (cartResponse.success) {
                toast.success("Order placed successfully!");
                navigate("/order-confirmation", {
                  state: {
                    shippingAddress,
                    cartData,
                  },
                });
              } else {
                throw new Error(
                  cartResponse.message || "Failed to place order"
                );
              }
            })
            .catch((error) => {
              console.error("Error updating cart:", error);
              toast.error(
                error?.data?.message ||
                  error?.message ||
                  "Failed to update cart"
              );
            })
            .finally(() => {
              setIsProcessing(false);
            });
        }
      })
      .catch((error) => {
        console.error("Error updating address:", error);
        toast.error(
          error?.data?.message ||
            error?.message ||
            "Failed to update shipping address"
        );
      });
  };

  const subtotal = cartData.totalAmount + (cartData.discount?.amount || 0);
  const shippingCost = 0;
  const finalTotal = cartData.totalAmount + shippingCost;

  return (
    <div className="min-h-screen bg-gray-800 py-8 pt-20 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <ShoppingCart className="w-8 h-8 " />
            Checkout
          </h1>
          <p className="text-gray-300 mt-2">
            Complete your order by providing shipping details
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-5">
            <Card className="">
              <h2 className="text-xl font-semibold text-white mb-4">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                {cartData.items.map((item: ICartItem) => (
                  <div
                    key={item.productId}
                    className="flex items-center space-x-4"
                  >
                    <div className="w-12 h-12 bg-gray-700 rounded border border-white/20">
                      <img
                        src={
                          item?.product?.image ||
                          "https://via.placeholder.com/150"
                        }
                        alt={
                          item?.product?.title ||
                          "https://via.placeholder.com/150"
                        }
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-white">
                        {item?.product?.title || "Unknown Product"}
                      </h3>
                      <p className="text-sm text-gray-300">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-white">
                        ৳{item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">
                    Subtotal ({cartData.totalItems} items)
                  </span>
                  <span className="text-white">৳{subtotal}</span>
                </div>

                {cartData.discount && (
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">
                      Discount ({cartData.discount.code})
                    </span>
                    <span className="text-green-600">
                      -৳{cartData.discount.amount}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-sm">
                  <span className="text-gray-300 flex items-center gap-1">
                    <Truck className="w-4 h-4" />
                    Shipping
                  </span>
                  <span className="text-white">৳{shippingCost}</span>
                </div>

                <div className="border-t pt-2 flex justify-between text-lg font-semibold">
                  <span className="text-white">Total</span>
                  <span className="">৳{finalTotal}</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Shipping Form */}
          <div className="lg:col-span-7 mt-8 lg:mt-0">
            <div className="space-y-6">
              <Card className="">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  Shipping Address
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <Label>Country</Label>
                    <Input
                      type="text"
                      name="country"
                      value={shippingAddress.country}
                      readOnly
                    />
                  </div>

                  <div>
                    <Label>District *</Label>
                    <Input
                      type="text"
                      name="district"
                      value={shippingAddress.district}
                      onChange={handleInputChange}
                      placeholder="e.g., Dhaka"
                      className={`${
                        errors.district ? "border-red-300" : "border-gray-700"
                      }`}
                    />
                    {/* <select
                      name="district"
                      value={shippingAddress.district}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 bg-black border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent ${
                        errors.district ? "border-red-300" : "border-gray-700"
                      }`}
                    >
                      <option value="">Select District</option>
                      {bangladeshDistricts.map((district) => (
                        <option key={district} value={district}>
                          {district}
                        </option>
                      ))}
                    </select> */}
                    {errors.district && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.district}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label>Zip Code *</Label>
                    <Input
                      type="text"
                      name="zipCode"
                      value={shippingAddress.zipCode}
                      onChange={handleInputChange}
                      placeholder="e.g., 1000"
                      // maxLength="4"
                      className={`${
                        errors.zipCode ? "border-red-300" : "border-gray-700"
                      }`}
                    />
                    {errors.zipCode && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.zipCode}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <Label>Thana/Upazila *</Label>
                    <Input
                      type="text"
                      name="thana"
                      value={shippingAddress.thana}
                      onChange={handleInputChange}
                      placeholder="Enter your thana/upazila"
                      className={`${
                        errors.thana ? "border-red-300" : "border-gray-700"
                      }`}
                    />
                    {errors.thana && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.thana}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <Label>Full Address *</Label>
                    <Textarea
                      name="address"
                      value={shippingAddress.address}
                      onChange={handleInputChange}
                      // rows="3"
                      placeholder="House/Building number, Road, Area details..."
                      className={`${
                        errors.address ? "border-red-300" : "border-gray-700"
                      }`}
                    />
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.address}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <Label>Phone Number *</Label>
                    <Input
                      type="tel"
                      name="phone"
                      value={shippingAddress.phone}
                      onChange={handleInputChange}
                      placeholder="01XXXXXXXXX"
                      className={`${
                        errors.phone ? "border-red-300" : "border-gray-700"
                      }`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>
              </Card>

              {/* Delivery Information */}
              <Card className="">
                <h3 className="text-lg font-medium text-white flex items-center gap-2">
                  <Truck className="w-5 h-5 text-green-600" />
                  Delivery Information
                </h3>
                <div className=" border border-green-200/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-green-400">
                        Standard Delivery
                      </p>
                      <p className="text-sm text-gray-300 mt-1">
                        Expected delivery: 3-5 business days
                      </p>
                      <p className="text-sm text-gray-300">
                        Delivery charge: ৳{shippingCost}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Submit Button */}
              <Card className="">
                <div className="grid md:grid-cols-2 gap-2">
                  <Button
                    variant={"secondary"}
                    onClick={handleCashOnDelivery}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>Processing...</>
                    ) : (
                      <>
                        <Banknote className="w-5 h-5" />
                        Cash on Delivery
                      </>
                    )}
                  </Button>
                  <Button onClick={handleSubmit} disabled={isProcessing}>
                    {isProcessing ? (
                      <>Processing...</>
                    ) : (
                      <>
                        <CreditCard className="w-5 h-5" />
                        Proceed to Payment
                      </>
                    )}
                  </Button>
                </div>

                <p className="text-xs text-gray-300 text-center mt-3">
                  By placing this order, you agree to our Terms of Service and
                  Privacy Policy
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
