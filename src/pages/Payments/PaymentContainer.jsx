import { CrownIcon, UserIcon, ZapIcon } from "lucide-react";
import Button from "../../components/ui/Buttons/Button";
import PaymentPresentational from "./PaymentPresentational";
import { loadStripe } from "@stripe/stripe-js";
import { memo } from "react";
function PaymentContainer() {
  let stripePromise;
  const getStripe = () => {
    if (!stripePromise) {
      stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);
    }
    return stripePromise;
  };
  const checkout = async (priceId) => {
    const item = {
      price: priceId,
      quantity: 1,
    };
    const checkoutOptions = {
      lineItems: [item],
      mode: "subscription",
      successUrl: `${window.location.origin}/success`,
      cancelUrl: `${window.location.origin}/cancel`,
    };
    const stripe = await getStripe();
    await stripe.redirectToCheckout(checkoutOptions);
  };

  const cards = [
    {
      color: "#1e40af",
      icon: <UserIcon size={50} />,
      header: "Explore & Connect",
      price: <p className="mb-10 text-center text-5xl font-bold">Free</p>,
      services: ["Join public Circles", "Up to 2 private Circles"],
      actionBtn: (
        <Button size="large" variant="primary" classes={"mx-auto block"}>
          Get Started
        </Button>
      ),
    },
    {
      color: "#dc2626",
      icon: <ZapIcon size={50} />,
      header: "More Circles, More Power",
      price: (
        <p className="mb-10 text-center text-5xl font-bold">
          $4.99 <span className="text-base">/ month</span>
        </p>
      ),
      services: [
        "Unlimited private Circles",
        "Priority support",
        "Up to 10GB storage",
      ],
      actionBtn: (
        <Button
          size="large"
          variant="primary"
          classes={"mx-auto block"}
          handleClick={() => checkout("price_1RmDoZ4SCalKHrm25m0sglVh")}
        >
          Subscribe Now
        </Button>
      ),
    },
    {
      color: "#059669",
      icon: <CrownIcon size={50} />,
      header: "Circle+",
      price: (
        <p className="mb-10 text-center text-5xl font-bold">
          $9.99 <span className="text-base">/ month</span>
        </p>
      ),
      services: [
        "Host up to 1000 members per Circle",
        "Analytics & engagement insights",
        "Custom Circle branding",
        "Scheduled hangouts & auto-reminders",
      ],
      actionBtn: (
        <Button size="large" variant="primary" classes={"mx-auto block"}  handleClick={() => checkout("price_1RmDpH4SCalKHrm2w7ihyGY1")}>
          Subscribe Now
        </Button>
      ),
    },
  ];
  return <PaymentPresentational cards={cards} />;
}
export default memo(PaymentContainer);
