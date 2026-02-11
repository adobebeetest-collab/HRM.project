import React from "react";
import AssetsList from "components/assets/AssetsList";

export default function Assets() {
  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-5 md:grid-cols-1 2xl:grid-cols-1 3xl:grid-cols-1">
      <div className="h-full w-full rounded-xl">
        <AssetsList />
      </div>
    </div>
  );
}
