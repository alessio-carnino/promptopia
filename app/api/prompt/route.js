import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request, res) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({}).sort({ _id: -1 }).populate("creator");

    // return new Response(JSON.stringify(prompts), { status: 200 });

    const response = new Response(JSON.stringify(prompts), { status: 200 });
    // with the following line the cache won't work and every time I refresh the page there is a new api call
    // await response.setHeader("Cache-Control", "max-age=0, s-maxage=0");
    response.headers.set("Cache-Control", "max-age=0, s-maxage=0");
    return response;
  } catch (error) {
    return new Response("Failed to fetch all prompts.", { status: 500 });
  }
};
