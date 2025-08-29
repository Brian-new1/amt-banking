"use server";

import {
  ACHClass,
  CountryCode,
  TransferAuthorizationCreateRequest,
  TransferCreateRequest,
  TransferNetwork,
  TransferType,
} from "plaid";

import { plaidClient } from "../actions/plaid";
import { parseStringify } from "../utils";

/* import { getTransactionsByBankId } from "./transaction.actions"; */
import { getBanks, getBank } from "./user.actions";

// Get multiple bank accounts
export const getAccounts = async ({ userId }: getAccountsProps) => {
  try {
    const banks = (await getBanks({ userId })) || [];

    const accounts = (
      await Promise.all(
        banks.map(async (bank: Bank) => {
          const accountsResponse = await plaidClient.accountsGet({
            access_token: bank.accessToken,
          });

          const institutionId = accountsResponse.data.item.institution_id;
          const institution = institutionId
            ? await getInstitution({ institutionId })
            : null;

          return accountsResponse.data.accounts.map((accountData) => ({
            id: accountData.account_id,
            availableBalance: accountData.balances.available ?? 0,
            currentBalance: accountData.balances.current ?? 0,
            institutionId: institution?.institution_id ?? "unknown",
            name: accountData.name ?? "Unnamed Account",
            officialName: accountData.official_name ?? null,
            mask: accountData.mask ?? "",
            type: accountData.type ?? "unknown",
            subtype: accountData.subtype ?? "unknown",
            appwriteItemId: bank.$id,
            shareableId: bank.shareableId,
          }));
        })
      )
    ).flat();

    const totalBanks = accounts.length;
    const totalCurrentBalance = accounts.reduce(
      (total, account) => total + account.currentBalance,
      0
    );

    return parseStringify({
      data: accounts,
      totalBanks,
      totalCurrentBalance,
    });
  } catch (error) {
    console.error("An error occurred while getting the accounts:", error);
    return parseStringify({
      data: [],
      totalBanks: 0,
      totalCurrentBalance: 0,
      error: true,
    });
  }
};

// Get one bank account

export const getAccount = async ({ appwriteItemId }: getAccountProps) => {
  try {
    // Check if appwriteItemId is provided
    if (!appwriteItemId) {
      console.error("❌ getAccount called without appwriteItemId");
      return parseStringify({
        data: null,
        transactions: [],
        error: "Missing bank identifier",
      });
    }

    // get bank from db
    const bank = await getBank({ documentId: appwriteItemId });

    if (!bank || !bank.accessToken) {
      console.error("❌ Bank not found or missing access token");
      return parseStringify({
        data: null,
        transactions: [],
        error: "Bank account not found",
      });
    }

    // get account info from plaid
    const accountsResponse = await plaidClient.accountsGet({
      access_token: bank.accessToken,
    });

    if (!accountsResponse.data.accounts.length) {
      console.error("❌ No accounts found for this bank");
      return parseStringify({
        data: null,
        transactions: [],
        error: "No accounts found",
      });
    }

    const accountData = accountsResponse.data.accounts[0];

    // ... rest of your existing code

    return parseStringify({
      data: account,
      transactions: allTransactions,
    });
  } catch (error) {
    console.error("An error occurred while getting the account:", error);
    return parseStringify({
      data: null,
      transactions: [],
      error: "Failed to fetch account",
    });
  }
};

// Get bank info
export const getInstitution = async ({
  institutionId,
}: getInstitutionProps) => {
  try {
    const institutionResponse = await plaidClient.institutionsGetById({
      institution_id: institutionId,
      country_codes: ["US"] as CountryCode[],
    });

    const intitution = institutionResponse.data.institution;

    return parseStringify(intitution);
  } catch (error) {
    console.error("An error occurred while getting the accounts:", error);
  }
};

// Get transactions
export const getTransactions = async ({
  accessToken,
}: getTransactionsProps) => {
  let hasMore = true;
  let transactions: any = [];

  try {
    // Iterate through each page of new transaction updates for item
    while (hasMore) {
      const response = await plaidClient.transactionsSync({
        access_token: accessToken,
      });

      const data = response.data;

      transactions = response.data.added.map((transaction) => ({
        id: transaction.transaction_id,
        name: transaction.name,
        paymentChannel: transaction.payment_channel,
        type: transaction.payment_channel,
        accountId: transaction.account_id,
        amount: transaction.amount,
        pending: transaction.pending,
        category: transaction.category ? transaction.category[0] : "",
        date: transaction.date,
        image: transaction.logo_url,
      }));

      hasMore = data.has_more;
    }

    return parseStringify(transactions);
  } catch (error) {
    console.error("An error occurred while getting the accounts:", error);
  }
};
