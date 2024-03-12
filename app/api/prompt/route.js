import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request, res) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({})
      .sort({ updatedAt: "desc" })
      .populate("creator");

    const response = Response(JSON.stringify(prompts), {
      status: 200,
    });
    // with the following line the cache won't work and every time I refresh the page there is a new api call
    response.setHeader("Cache-Control", "max-age=0, s-maxage=0");
    return response;
  } catch (error) {
    return new Response("Failed to fetch all prompts.", { status: 500 });
  }
};
