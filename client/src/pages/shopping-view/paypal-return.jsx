import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { capturePayment } from "@/store/slices/shop/order-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

function PaypalReturnPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");

  useEffect(() => {
    console.log("ids :", paymentId, payerId);
    if (paymentId && payerId) {
      const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"))||'68625652ac39d84b369ba8d4';
console.log(orderId , " this is orderID")
      dispatch(capturePayment({ paymentId, payerId, orderId })).then((data) => {
        console.log(data)
        if (data?.payload?.success) {
          sessionStorage.removeItem("currentOrderId");
          window.location.href = "/shop/payment-success";
        }
      });
    }
  }, [paymentId, payerId, dispatch]);

  return (
    <div className="flex items-center justify-center h-screen w-full">

    <Card>
      <CardHeader>
        <CardTitle>Processing Payment...Please wait!</CardTitle>
      </CardHeader>
    </Card>
    </div>
  );
}

export default PaypalReturnPage;