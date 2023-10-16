"use client";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spacer,
  Spinner,
  Textarea,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Filter from "bad-words";

const filter = new Filter();

export default function AddPost(): JSX.Element {
  const { data: session } = useSession();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [enhancing, setEnhancing] = useState(false);
  const [enhanceError, setEnhanceError] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Error creating post.");
  const router = useRouter();

  const enhanceWithAI = async () => {
    if (enhancing) return;
    if (content.length < 1) {
      setEnhanceError(true);
      return;
    }
    setEnhancing(true);
    setEnhanceError(false);

    const res = await fetch("/api/enhanceMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: content,
      }),
    });

    if (res.ok) {
      const GPTdata = await res.json();
      setContent(GPTdata.content);
    } else {
      setEnhanceError(true);
    }
    setEnhancing(false);
  };

}
