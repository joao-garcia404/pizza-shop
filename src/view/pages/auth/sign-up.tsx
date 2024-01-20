import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { z } from "zod";
import { toast } from "sonner";

import { registerRestaurant } from "@/app/services/auth";

import { Button } from "@/view/components/ui/button";
import { Input } from "@/view/components/ui/input";
import { Label } from "@/view/components/ui/label";

const signUpFormSchema = z.object({
  restaurantName: z.string(),
  managerName: z.string(),
  phone: z.string(),
  email: z.string().email(),
});

type SignUpForm = z.infer<typeof signUpFormSchema>;

export function SignUp() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: "",
      phone: "",
      managerName: "",
      restaurantName: "",
    },
  });

  const { mutateAsync: registerRestaurantFn } = useMutation({
    mutationFn: registerRestaurant,
  });

  async function handleSignUp(data: SignUpForm) {
    try {
      await registerRestaurantFn({
        email: data.email,
        phone: data.phone,
        managerName: data.managerName,
        restaurantName: data.restaurantName,
      });

      toast.success("Restaurante cadastrado com sucesso.", {
        action: {
          label: "Login",
          onClick: () => navigate(`/sign-in?email=${data.email}`),
        },
      });
    } catch {
      toast.error("Erro ao cadastrar restaurante.");
    }
  }

  return (
    <>
      <Helmet title="Cadastro" />

      <div className="p-8">
        <Button asChild variant="ghost" className="absolute right-8 top-8">
          <Link to="/sign-in">Fazer login</Link>
        </Button>

        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta grátis
            </h1>
            <p className="text-sm text-muted-foreground">
              Seja um parceiro e comece suas vendas.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(handleSignUp)}
            className="flex flex-col gap-4"
          >
            <div className="space-y-2">
              <Label htmlFor="restaurantName">Nome do estabelecimento</Label>
              <Input
                id="restaurantName"
                type="text"
                {...register("restaurantName")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="managerName">Seu nome</Label>
              <Input
                id="managerName"
                type="text"
                {...register("managerName")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" type="email" {...register("email")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Seu celular</Label>
              <Input id="phone" type="tel" {...register("phone")} />
            </div>

            <Button type="submit" disabled={isSubmitting}>
              Finalizar cadastro
            </Button>

            <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
              Ao continudar, você concorda com nossos{" "}
              <a className="underline underline-offset-4" href="">
                Termos de serviço
              </a>{" "}
              e{" "}
              <a className="underline underline-offset-4" href="">
                política de privacidade
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
