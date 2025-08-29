import React, { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  PlaidLinkOnSuccess,
  PlaidLinkOptions,
  usePlaidLink,
} from "react-plaid-link";
import { useRouter } from "next/navigation";
import {
  createLinkToken,
  exchangePublicToken,
} from "@/lib/actions/user.actions";

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null); // ✅ start with null

  useEffect(() => {
    const getLinkToken = async () => {
      const data = await createLinkToken(user);
      setToken(data?.linkToken || null);
    };
    getLinkToken();
  }, [user]);

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string) => {
      try {
        await exchangePublicToken({
          publicToken: public_token,
          user,
        });
        router.push("/");
      } catch (error) {
        console.error("Error exchanging public token:", error);
      }
    },
    [user, router]
  );

  // ⬇️ Only create config if token exists
  const config: PlaidLinkOptions | null = token
    ? {
        token,
        onSuccess,
      }
    : null;

  const { open, ready } = usePlaidLink(config ?? { token: "", onSuccess }); // safe fallback

  return (
    <>
      {variant === "primary" ? (
        <Button
          onClick={() => open()}
          disabled={!ready || !token} // ✅ disable until token is loaded
          className="text-16 rounded-lg border border-bankGradient bg-gradient-to-r from-[#4facfe] to-[#009dfe] font-semibold text-white shadow-form"
        >
          Connect Bank
        </Button>
      ) : variant === "ghost" ? (
        <Button>Connect Bank</Button>
      ) : (
        <Button>Connect Bank</Button>
      )}
    </>
  );
};

export default PlaidLink;
