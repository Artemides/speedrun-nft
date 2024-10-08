"use client";

import { notification } from "@/utils/scaffold-eth/notification";
import { addToIPFS } from "@/utils/simpleNFT/ipfs-fetch";
import { NextPage } from "next";
import { lazy, useEffect, useState } from "react";

// const LazyReactJson = lazy(() => import("react-json-view"));

const IpfsUpload: NextPage = () => {
  const [json, setJson] = useState({});
  const [cidUploaded, setCidUploaded] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleIpfsUpload = async () => {
    setLoading(true);
    const notificationId = notification.loading("Uploading to IPFS...");
    try {
      const uploadedItem = await addToIPFS(json);
      notification.remove(notificationId);
      notification.success("Uploaded to IPFS");

      setCidUploaded(uploadedItem.path);
    } catch (error) {
      notification.remove(notificationId);
      notification.error("Error uploading to IPFS");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <h1 className="text-center mb-4">
          <span className="block text-4xl font-bold">Upload to IPFS</span>
        </h1>

        {/* {mounted && (
          <LazyReactJson
            style={{ padding: "1rem", borderRadius: "0.75rem" }}
            src={json}
            theme="solarized"
            enableClipboard={false}
            onEdit={(edit) => {
              setJson(edit.updated_src);
            }}
            onAdd={(add) => {
              setJson(add.updated_src);
            }}
            onDelete={(del) => {
              setJson(del.updated_src);
            }}
          />
        )} */}
        <button
          className={`btn btn-secondary mt-4 ${loading ? "loading" : ""}`}
          disabled={true}
          onClick={handleIpfsUpload}
        >
          Upload to IPFS
        </button>
        {cidUploaded && (
          <div className="mt-4">
            <a
              href={`https://ipfs.io/ipfs/${cidUploaded}`}
              target="_blank"
              rel="noreferrer"
            >
              {`https://ipfs.io/ipfs/${cidUploaded}`}
            </a>
          </div>
        )}
      </div>
    </>
  );
};

export default IpfsUpload;
