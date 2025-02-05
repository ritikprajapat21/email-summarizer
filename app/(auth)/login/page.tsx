import { Button } from "@/components/ui/button";
import { oauthClient } from "@/lib/auth";
import Link from "next/link";
import { Card } from "@/components/ui/card";

export default function LoginPage() {
  const SCOPE = [
    "https://www.googleapis.com/auth/gmail.metadata",
    "https://www.googleapis.com/auth/gmail.readonly",
  ];

  const authUrl = oauthClient.generateAuthUrl({
    access_type: "offline",
    scope: SCOPE,
  });

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="p-8">
        <Link href={authUrl}>
          <Button className="font-semibold">Login with Google</Button>
        </Link>
      </Card>
    </div>
  );
}
