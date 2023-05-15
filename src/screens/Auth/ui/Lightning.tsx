import { useEffect, useState } from "react";
import QRCode from "qrcode";
import Image from "next/image";

import Button from "@/client/ui/atoms/Button";
import Spinner from "@/client/ui/atoms/Spinner";

export type Props = {
  lnurl: string;
  onSubmit: () => void;
};

export default function Lightning({ lnurl, onSubmit }: Props) {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [qrCode, setQrCode] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (lnurl) {
        const output = await QRCode.toDataURL(lnurl, { margin: 2, width: 500 });
        setQrCode(output);
      } else {
        setQrCode(null);
      }
    })();
  }, [lnurl]);

  if (isLoading) {
    return (
      <div className="flex w-full justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="w-full">
      {!qrCode && (
        <Button
          className="w-full"
          onClick={async () => {
            setLoading(true);
            await onSubmit();
            setLoading(false);
          }}
        >
          Sign in with lightning
        </Button>
      )}
      {qrCode && (
        <div>
          <Image
            className="w-full"
            src={qrCode}
            alt="Login with lightning - QRCode"
            width={500}
            height={500}
          />

          <Button
            className="mt-sm w-full"
            onClick={() => window.location.assign(lnurl)}
          >
            Open Lightning Wallet
          </Button>
        </div>
      )}
    </div>
  );
}
