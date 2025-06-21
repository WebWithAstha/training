import { Loader2, ShoppingCart } from "lucide-react";
import { Card,CardContent } from "../ui/card";

export default function LoadingPage({ message = "Loading…" }) {
  return (
    <div className="flex fixed top-0 left-0  items-center justify-center w-full min-h-screen ">
      <Card className="flex shadow-none border-0 flex-col items-center gap-4 p-8">
        {/* Brand cue
        <ShoppingCart className="h-10 w-10 text-primary" /> */}

        {/* Spinner */}
        <Loader2 className="h-8 w-8 animate-spin text-primary" />

        {/* Status text */}
        <CardContent className="p-0">
          <p className="text-sm text-muted-foreground">{message}</p>
        </CardContent>
      </Card>
    </div>
  );
}
