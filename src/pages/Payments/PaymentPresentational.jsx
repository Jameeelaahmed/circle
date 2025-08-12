import { useTranslation } from "react-i18next";
import GlowCardContainer from "../../components/ui/Payments/GlowCardContainer";
import DarkVeil from "./DarkVeil";

function PaymentPresentational({ cards }) {
  const { t } = useTranslation();
  return (
    <>
      <section className="relative mt-[64px] mb-10 bg-black pb-10">
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
          }}
        >
          <DarkVeil />
        </div>
        <p className="relative z-10 mb-10 pt-10 text-center text-2xl font-semibold lg:text-4xl">
          {t("payment.Choose Your Circle. Unlock the Experience.")}
        </p>
        <div className="relative z-10 mx-7 grid grid-cols-1 justify-center gap-10 select-none sm:mx-16 md:mx-10 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => (
            <GlowCardContainer
              className={"grid bg-black/55 p-7 backdrop-blur-2xl"}
              color={card.color}
              key={card.header}
            >
              <div className="mb-10 flex justify-center">{card.icon}</div>
              <p className="text-primary mb-10 text-center text-xl font-bold xl:text-2xl">
                {card.header}
              </p>
              {card.price}
              <ul className="mb-10 h-40 [&>*]:list-disc">
                {card.services.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>
              {card.actionBtn}
            </GlowCardContainer>
          ))}
        </div>
      </section>
    </>
  );
}
export default PaymentPresentational;
