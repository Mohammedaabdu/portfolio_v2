import Card from "./Card";
import Container from "./Container";
import emailjs from "@emailjs/browser";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "motion/react";
import toast, { Toaster, ToastBar } from "react-hot-toast";
import "../index.css";
const formSchema = z.object({
  user: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(50, { message: "Name cannot be longer than 50 characters" }),
  email: z.email({ message: "Email is incorrect" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(1000, { message: "Message can be at most 1000 characters" }),
});

type FormData = z.infer<typeof formSchema>;

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(data: FormData) {
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          user: data.user,
          email: data.email,
          message: data.message,
        },
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        },
      );
      reset();
      toast.success("Message Sent Successfully");
    } catch (error) {
      toast.error("Something went wrong.");
    }
  }
  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ margin: "0px 0px -200px 0px" }}
    >
      <Container>
        <Toaster
          reverseOrder={false}
          position="top-center"
          toastOptions={{
            duration: 5000,
            removeDelay: 1000,

            style: {
              background: "#262626",
              color: "#ffffff",
              borderRadius: "9999px",
              padding: "8px 16px",
            },

            success: {
              icon: "👏",
              style: {
                color: "#3dd598", // text-accent
                boxShadow: "0 10px 15px -3px #3dd598",
              },
            },

            error: {
              icon: "😢",
              style: {
                color: "rgb(239 68 68)", // text-red-500
                boxShadow: "0 10px 15px -3px rgb(239 68 68)",
              },
            },
          }}
        >
          {(t) => (
            <ToastBar
              toast={t}
              style={{
                ...t.style,
                animation: t.visible
                  ? "toast-grow 0.4s ease"
                  : "toast-shrink 0.4s ease forwards",
              }}
            />
          )}
        </Toaster>

        <Card className="group bg-linear-to-bl from-violet-500/40 to-transparent to-40% shadow-sm shadow-violet-600 hover:shadow-lg transition-all duration-500">
          <h2 className="mx-auto w-fit text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight group-hover:text-violet-500 transition-all duration-500">
            Contact
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-md mx-auto p-4 space-y-4 text-violet-500 leading-tight tracking-wide"
          >
            <div className="max-w-2xl space-y-4">
              <div>
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Name Namesson"
                  {...register("user")}
                  className="w-full border border-violet-400 p-2 rounded-lg mt-2 focus:outline-none
                text-violet-300
             focus:ring-2
             focus:ring-violet-500
             focus:border-violet-500
             focus:shadow-md
             focus:shadow-violet-500
             focus:bg-transparent
             focus:text-violet-300
             transition"
                />
                {errors.user && (
                  <p className="text-violet-400/60 text-sm mt-2">
                    {errors.user.message}
                  </p>
                )}
              </div>
              <div>
                <label>Email</label>
                <input
                  type="email"
                  placeholder="example@email.com"
                  {...register("email")}
                  className="w-full border border-violet-400 p-2 rounded-lg mt-2 focus:outline-none
             focus:ring-2
             focus:ring-violet-500
             focus:border-violet-500
             focus:shadow-md
             focus:shadow-violet-500
             transition text-violet-300"
                />
                {errors.email && (
                  <p className="text-violet-400/60 text-sm mt-2">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label>Message</label>
                <textarea
                  {...register("message")}
                  className="w-full border border-violet-400 p-2 rounded-lg mt-2 focus:outline-none
             focus:ring-2
             focus:ring-violet-500
             focus:border-violet-500
             focus:shadow-md
             focus:shadow-violet-500
             transition text-violet-300"
                  placeholder="Write your message here..."
                  rows={5}
                />
                {errors.message && (
                  <p className="text-violet-400/60 text-sm mt-2">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full  bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700/60 hover:cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </Card>
      </Container>
    </motion.section>
  );
};

export default Contact;
