import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";

export const getData = async (url: string, method: string, token: string, actionName?: string) => {
     
     try {
        const response = await fetch(url, {
          method: method,
          headers: {
            "Content-Type": "application/json",
           // "Authorization": `Bearer ${token}`,

          },
        });
        if (!response.ok) {
      throw new Error(actionName ? `Failed ${actionName}` : "Failed action.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(actionName ? `Error ${actionName}` : "Error: ", error);
    throw error;
  }
}
export const postData = async (url: string, data: any, method: string, token: string, actionName?: string) => {
     
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
         // "Authorization": `Bearer ${token}`,

      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(actionName ? `Failed ${actionName}` : "Failed action.");
    }
    const updatedItem = await response.json();
    return updatedItem;
  } catch (error) {
    console.error(actionName ? `Error ${actionName}` : "Error: ", error);
    throw error;
  }
};
