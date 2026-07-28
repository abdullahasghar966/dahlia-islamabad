import { z } from "zod";

/** Pakistani mobile/landline, tolerant of spaces, dashes and +92 / 0 prefixes. */
const phone = z
  .string()
  .trim()
  .min(7, "Please add a phone number we can reach you on.")
  .max(24, "That number looks too long.")
  .regex(/^[+0-9][0-9\s\-()]{6,23}$/, "Please use digits, spaces or dashes only.");

export const reserveSchema = z.object({
  name: z.string().trim().min(2, "Please tell us your name.").max(80),
  phone,
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Please pick a date.")
    .refine((value) => {
      const picked = new Date(`${value}T00:00:00`);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return picked >= today;
    }, "Please pick today or a date in the future."),
  time: z.string().regex(/^\d{2}:\d{2}$/, "Please pick a time."),
  /**
   * The house runs on walk-ins; only tables of 8+ are reservable
   * (02b §1). Enforced here as well as in the UI so the endpoint cannot be used
   * to book a table the policy does not actually hold.
   */
  party: z.coerce
    .number()
    .int()
    .min(8, "Tables under 8 are walk-in — no booking needed.")
    .max(30, "For parties over 30, please call us directly."),
  note: z.string().trim().max(500, "Please keep the note under 500 characters.").optional(),
  /**
   * Bot trap. Deliberately permissive: rejecting a filled honeypot in the
   * schema returns a validation error naming the field, which tells a bot
   * exactly which input to leave alone next time. The routes accept it and
   * silently discard instead.
   */
  company: z.string().optional(),
});

export type ReserveInput = z.infer<typeof reserveSchema>;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please tell us your name.").max(80),
  email: z.string().trim().email("Please check that email address."),
  message: z.string().trim().min(10, "A little more detail, please.").max(2000),
  company: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const subscribeSchema = z.object({
  email: z.string().trim().email("Please check that email address."),
  company: z.string().optional(),
});

export type SubscribeInput = z.infer<typeof subscribeSchema>;
