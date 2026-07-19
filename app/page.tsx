"use client"
import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import {
  testGetAccountBinding,
  testGetSheetAuthUrl,
  testSetRefreshToken,
  testCreateSpreadSheet
} from "./action"

export default function Home() {
  const searchParams = useSearchParams()
  const code = searchParams.get("code")

  const execGetAccountBinding = async () => {
    const res = await testGetAccountBinding()
    console.log(res)
  }

  useEffect(() => {
    if(code) testSetRefreshToken(code)
  }, [code])

  useEffect(() => {
    execGetAccountBinding()
  }, [])
  
  const execGetSheetAuthUrl = async () => {
    const authUrl = await testGetSheetAuthUrl()
    window.location.href = authUrl
  }

  const execCreateSpreadSheet = async () => {
    const res = await testCreateSpreadSheet()
    console.log(res)
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col gap-y-4">
          <button onClick={execGetSheetAuthUrl}>Get Sheet Authorization</button>
          <button onClick={execCreateSpreadSheet}>Create Spreadsheet</button>
        </div>
      </main>
    </div>
  );
}
