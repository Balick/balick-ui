"use client"

import * as React from "react"

import { StatusButton, type ButtonStatus } from "@/registry/balick/ui/status-button"

export default function StatusButtonDemo() {
  const [status, setStatus] = React.useState<ButtonStatus>("idle")

  function save() {
    setStatus("loading")
    setTimeout(() => {
      setStatus("success")
      setTimeout(() => setStatus("idle"), 1500)
    }, 1200)
  }

  return (
    <StatusButton status={status} onClick={save}>
      Save changes
    </StatusButton>
  )
}
