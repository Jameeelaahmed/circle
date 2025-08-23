import { useTranslation } from "react-i18next";
import GlowCardContainer from "../../components/ui/Payments/GlowCardContainer";
import Aurora from "./Aurora";

function PaymentPresentational({ cards }) {
  const { t } = useTranslation();

  return (
    <>
      <section className="relative z-10 mt-[64px] mb-10 pb-10">
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
          }}
        >
           <Aurora
        colorStops={["#5c57a1", "#5c57a1", "#4ea8de"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
        
      />
          <div className="mx-auto max-w-7xl">
            <p className="relative z-10 mb-10 pt-10 text-center text-2xl  font-bold lg:text-3xl">
              {t("payment.Choose Your Circle. Unlock the Experience.")}
            </p>
            <div className="relative z-10 mx-7 grid grid-cols-1 justify-center gap-4 select-none sm:mx-16 md:mx-10 md:grid-cols-2 xl:grid-cols-3">
              {cards.map((card, idx) => (
                <GlowCardContainer
                  className={`z-10 grid bg-transparent p-7 backdrop-blur-2xl ${idx == 1 && "xl:scale-105"}`}
                  color={card.color}
                  key={card.header}
                >
                  <div className="mb-10 flex justify-center">{card.icon}</div>
                  <p className="from-secondary to-primary block bg-gradient-to-l bg-clip-text text-transparent ltr:bg-gradient-to-r rtl:bg-gradient-to-l mb-10 text-center text-xl font-bold xl:text-2xl">
                    {card.header}
                  </p>
                  {card.price}
                  <ul className="mb-10 text-[var(--color-text)] h-40 [&>*]:list-disc">
                    {card.services.map((service) => (
                      <li key={service}>{service}</li>
                    ))}
                  </ul>
                  {card.actionBtn}
                </GlowCardContainer>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default PaymentPresentational;
