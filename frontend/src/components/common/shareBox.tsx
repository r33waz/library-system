import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Copy, Share2 } from "lucide-react"; // ✅ import Check icon
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { ErrorToast, SuccessToast } from "./toast";

const ShareBox = () => {
  const location = useLocation();
  const [copied, setCopied] = useState(false);

  const fullUrl = `${window.location.origin}${location.pathname}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      SuccessToast("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000); // ✅ reset after 2 seconds
    } catch (error) {
      console.error("Failed to copy:", error);
      ErrorToast("Failed to copy link!");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          aria-label="share"
          className="bg-white text-black backdrop-blur-sm p-2 cursor-pointer rounded-full hover:bg-green-secondary hover:text-white transition-colors"
        >
          <Share2 className="h-5 w-5" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input id="link" value={fullUrl} readOnly />
          </div>

          <Button
            aria-label="copy"
            type="button"
            size="sm"
            onClick={handleCopy}
            className="px-3 dark:text-white text-black dark:hover:bg-white dark:hover:text-black flex items-center gap-1"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" /> Copied
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" /> Copy
              </>
            )}
          </Button>
        </div>

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button aria-label="close" type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShareBox;
