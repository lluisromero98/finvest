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

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const t = useTranslations("auth");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginForm) {
    // TODO: Integrate with Supabase Auth
    console.log("Login:", data);
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">{t("login")}</CardTitle>
        <CardDescription>
          Smart Money Trading Platform
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{t("email")}</Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{t("errors.invalidEmail")}</p>
            )}
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">{t("password")}</Label>
              <Link
                href="/forgot-password"
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                {t("forgotPassword")}
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-xs text-destructive">{t("errors.passwordMin")}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? "..." : t("login")}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            {t("noAccount")}{" "}
            <Link
              href="/register"
              className="font-medium text-emerald-500 hover:text-emerald-400"
            >
              {t("registerHere")}
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
