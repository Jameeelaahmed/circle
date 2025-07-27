import GlowCardContainer from "../../components/ui/Payments/GlowCardContainer";
import DarkVeil from "./DarkVeil";

function PaymentPresentational({ cards }) {
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "600px",
          position: "absolute",
          zIndex: -1,
          top: "50%",
        }}
      >
        <DarkVeil />
      </div>
      <section className="mt-4 mb-10">
        <h1 className="text-primary mb-10 text-center text-2xl font-semibold">
          Pricing
        </h1>
        <p className="mb-10 text-center text-4xl font-semibold">
          Choose Your Circle. Unlock the Experience.
        </p>
        <div className="mx-16 grid grid-cols-1 justify-center gap-10 select-none md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <GlowCardContainer
              className={"bg-black/55 p-10 backdrop-blur-2xl"}
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
