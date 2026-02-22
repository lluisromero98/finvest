"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const registerSchema = z
  .object({
    username: z.string().min(3),
    email: z.email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
  });

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const t = useTranslations("auth");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data: RegisterForm) {
    // TODO: Integrate with Supabase Auth
    console.log("Register:", data);
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">{t("register")}</CardTitle>
        <CardDescription>
          Smart Money Trading Platform
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">{t("username")}</Label>
            <Input
              id="username"
              placeholder="trader_pro"
              {...register("username")}
            />
            {errors.username && (
              <p className="text-xs text-destructive">
                {t("errors.usernameMin")}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">{t("email")}</Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-destructive">
                {t("errors.invalidEmail")}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{t("password")}</Label>
            <Input
              id="password"
              type="password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-xs text-destructive">
                {t("errors.passwordMin")}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">{t("confirmPassword")}</Label>
            <Input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-destructive">
                {t("errors.passwordMatch")}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? "..." : t("register")}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            {t("hasAccount")}{" "}
            <Link
              href="/login"
              className="font-medium text-emerald-500 hover:text-emerald-400"
            >
              {t("loginHere")}
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
