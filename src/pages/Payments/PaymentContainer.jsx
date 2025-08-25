import { CrownIcon, UserIcon, ZapIcon } from "lucide-react";
import Button from "../../components/ui/Buttons/Button";
import PaymentPresentational from "./PaymentPresentational";
import { loadStripe } from "@stripe/stripe-js";
import { memo } from "react";
import { useTranslation } from "react-i18next";

function PaymentContainer() {
  const { t } = useTranslation();
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
      color: "#5c57a1",
      icon: <UserIcon size={50} />,
      header: t("payment.Explore & Connect"),
      price: (
        <p className="mb-10 text-center text-5xl font-bold">
          {t("payment.Free")}
        </p>
      ),
      services: [
        t("payment.Join Public Circles"),
        t("payment.Up to 2 private Circles"),
      ],
      actionBtn: (
        <Button size="large" variant="primary" classes={"mx-auto block"}>
          {t("payment.Get Started")}
        </Button>
      ),
    },
    {
      color: "#ac9ffa",
      icon: <ZapIcon size={50} />,
      header: t("payment.More Circles, More Power"),
      price: (
        <p className="mb-10 text-center text-5xl font-bold">
          50 EGP <span className="text-base">/ {t("payment.month")}</span>
        </p>
      ),
      services: [
        t("payment.Unlimited private Circles"),
        t("payment.Priority support"),
        t("payment.Up to 10GB storage"),
      ],
      actionBtn: (
        <Button
          size="large"
          variant="primary"
          classes={"mx-auto block"}
          handleClick={() => checkout("price_1RmDoZ4SCalKHrm25m0sglVh")}
        >
          {t("payment.Subscribe Now")}
        </Button>
      ),
    },
    {
      color: "#4ea8de",
      icon: <CrownIcon size={50} />,
      header: t("payment.Circle+"),
      price: (
        <p className="mb-10 text-center text-5xl font-bold">
          100 EGP <span className="text-base">/ {t("payment.month")}</span>
        </p>
      ),
      services: [
        t("payment.Host up to 1000 members per Circle"),
        t("payment.Analytics & engagement insights"),
        t("payment.Custom Circle branding"),
        t("payment.Scheduled hangouts & auto-reminders"),
      ],
      actionBtn: (
        <Button
          size="large"
          variant="primary"
          classes={"mx-auto block"}
          handleClick={() => checkout("price_1RmDpH4SCalKHrm2w7ihyGY1")}
        >
          {t("payment.Subscribe Now")}
        </Button>
      ),
    },
  ];
  return <PaymentPresentational cards={cards} />;
}
export default memo(PaymentContainer);
