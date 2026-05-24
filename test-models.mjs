import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function checkModels() {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    console.log("No GEMINI_API_KEY found");
    return;
  }
  
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;
  
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log("AVAILABLE MODELS:");
    console.log(data.models.map(m => m.name).join(", "));
  } catch (e) {
    console.error("Error fetching models:", e);
  }
}

checkModels();
