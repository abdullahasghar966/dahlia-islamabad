import { discountsByBank } from "@/lib/content/site";
import { formatPrice } from "@/lib/utils";

/**
 * Bank partnership discounts (02b §3).
 *
 * TODO: Phase 3 — move to a Sanity `discount` document with validFrom/validTo.
 * 02b is explicit that these rotate and must never be hard-coded, so the
 * validity caveat below stays visible until staff can retire an expired card
 * themselves.
 */
export function BankDiscounts() {
  const banks = Object.entries(discountsByBank);
  if (!banks.length) return null;

  return (
    <section aria-labelledby="discounts-heading">
      <h2 id="discounts-heading" className="eyebrow mb-4 opacity-65">
        Card offers
      </h2>

      <div className="flex flex-col gap-8">
        {banks.map(([bank, cards]) => (
          <div key={bank}>
            <h3 className="font-display-sm mb-3 text-lead">{bank}</h3>
            <ul className="flex flex-col">
              {cards.map((card) => (
                <li
                  key={`${bank}-${card.card}`}
                  className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-current/10 py-2.5 text-small"
                >
                  <span className="opacity-80">{card.card}</span>
                  <span className="tabular-nums">
                    <strong className="font-semibold">{card.percent}%</strong>
                    <span className="opacity-60"> · up to {formatPrice(card.cap)}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-4 text-small opacity-55">
        Bank offers change — please confirm the current deal with us or your bank before you
        order.
      </p>
    </section>
  );
}
