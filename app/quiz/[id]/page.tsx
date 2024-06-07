import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";

export default function page({ params }: { params: { id: string } }) {
  return (
    <div>
        <h1>Quiz {params.id}</h1>
    </div>
  )
}
