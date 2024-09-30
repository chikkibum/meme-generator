"use client";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
import { IKImage, ImageKitProvider } from "imagekitio-next";
export default function Home() {
  return (
    <div className="flex h-screen justify-center items-center">
      <Button variant={"destructive"}>click me</Button>;
      <ImageKitProvider
        publicKey={publicKey}
        urlEndpoint={urlEndpoint}
        authenticator={authenticator}
      >
        {/* ...child components */}
        <IKImage
          urlEndpoint={process.env.NEXT_PUBLIC_URL_ENDPOINT}
          path="riwul.jpg"
          width={400}
          height={400}
          alt="Alt text"
        />
      </ImageKitProvider>
      {/* <img src="https://ik.imagekit.io/bhaskar475/riwul.jpg?updatedAt=1727711384056" alt="" /> */}
    </div>
  );
}

const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
const authenticator = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/auth");

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};
