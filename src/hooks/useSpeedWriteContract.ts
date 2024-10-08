import {
  ContractAbi,
  ContractName,
  ScaffoldWriteContractOptions,
  ScaffoldWriteContractVariables,
} from "@/utils/scaffold-eth/contract";
import {
  Config,
  UseWriteContractParameters,
  useAccount,
  useWriteContract,
} from "wagmi";
import { useTransactor } from "./useTransactor";
import { useTargetNetwork } from "./useTargetNetwork";
import { useState } from "react";
import { useDeployedContractInfo } from "./useDeployedContract";
import { notification } from "@/utils/scaffold-eth/notification";
import { Abi, ExtractAbiFunctionNames } from "abitype";
import { WriteContractVariables } from "wagmi/query";
import { MutateOptions } from "@tanstack/react-query";
import { WriteContractErrorType, WriteContractReturnType } from "wagmi/actions";

export const useSpeedWriteContract = <TContractName extends ContractName>(
  contractName: TContractName,
  writeContractParams?: UseWriteContractParameters
) => {
  const { chain } = useAccount();
  const writeTx = useTransactor();
  const { targetNetwork } = useTargetNetwork();

  const [isMining, setIsMining] = useState(false);
  const contractWriter = useWriteContract(writeContractParams);
  const { data: deployedContractData } = useDeployedContractInfo(contractName);

  const sendContractWriteAsyncTx = async <
    TFunctionName extends ExtractAbiFunctionNames<
      ContractAbi<TContractName>,
      "nonpayable" | "payable"
    >
  >(
    variables: ScaffoldWriteContractVariables<TContractName, TFunctionName>,
    options?: ScaffoldWriteContractOptions
  ) => {
    if (!deployedContractData) {
      notification.error(
        "Target Contract is not deployed, did you forget to run `yarn deploy`?"
      );
      return;
    }

    if (!chain?.id) {
      notification.error("Please connect your wallet");
      return;
    }
    if (chain?.id !== targetNetwork.id) {
      notification.error("You are on the wrong network");
      return;
    }

    try {
      setIsMining(true);
      const { blockConfirmations, onBlockConfirmation, ...mutateOptions } =
        options || {};
      const makeWriteWithParams = () =>
        contractWriter.writeContractAsync(
          {
            abi: deployedContractData.abi as Abi,
            address: deployedContractData.address,
            ...variables,
          } as WriteContractVariables<Abi, string, any[], Config, number>,
          mutateOptions as
            | MutateOptions<
                WriteContractReturnType,
                WriteContractErrorType,
                WriteContractVariables<Abi, string, any[], Config, number>,
                unknown
              >
            | undefined
        );
      const writeTxResult = await writeTx(makeWriteWithParams, {
        blockConfirmations,
        onBlockConfirmation,
      });
      return writeTxResult;
    } catch (error: any) {
      throw error;
    } finally {
      setIsMining(false);
    }
  };

  const sendContractWriteTx = <
    TContractName extends ContractName,
    TFunctionName extends ExtractAbiFunctionNames<
      ContractAbi<TContractName>,
      "nonpayable" | "payable"
    >
  >(
    variables: ScaffoldWriteContractVariables<TContractName, TFunctionName>,
    options?: Omit<
      ScaffoldWriteContractOptions,
      "onBlockConfirmation" | "blockConfirmations"
    >
  ) => {
    if (!deployedContractData) {
      notification.error(
        "Target Contract is not deployed, did you forget to run `yarn deploy`?"
      );
      return;
    }
    if (!chain?.id) {
      notification.error("Please connect your wallet");
      return;
    }
    if (chain?.id !== targetNetwork.id) {
      notification.error("You are on the wrong network");
      return;
    }

    contractWriter.writeContract(
      {
        abi: deployedContractData.abi as Abi,
        address: deployedContractData.address,
        ...variables,
      } as WriteContractVariables<Abi, string, any[], Config, number>,
      options as
        | MutateOptions<
            WriteContractReturnType,
            WriteContractErrorType,
            WriteContractVariables<Abi, string, any[], Config, number>,
            unknown
          >
        | undefined
    );
  };
  return {
    ...contractWriter,
    isMining,
    // Overwrite wagmi's writeContactAsync
    writeContractAsync: sendContractWriteAsyncTx,
    // Overwrite wagmi's writeContract
    writeContract: sendContractWriteTx,
  };
};
