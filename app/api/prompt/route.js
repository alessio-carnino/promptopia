import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// This forces the browser to not cache
export const dynamic = "force-dynamic";

export const GET = async (request) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({}).sort({ _id: -1 }).populate("creator");
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts.", { status: 500 });
  }
};
