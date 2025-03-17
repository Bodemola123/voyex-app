"use client";
import DataControl from "@/components/settings-page/DataControl";
import General from "@/components/settings-page/General";
import Personalization from "@/components/settings-page/Personalization";
import Security from "@/components/settings-page/Security";
import React from "react";

function Settings() {
  return (
    <div className="flex flex-col gap-4">
      <div id="general"><General /></div>
      <div id="personalization"><Personalization /></div>
      <div id="data-control"><DataControl /></div>
      <div id="security"><Security /></div>
    </div>
  );
}

export default Settings;
