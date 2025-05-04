import { NextResponse } from "next/server";
const AssistantV2 = require("ibm-watson/assistant/v2");
const { IamAuthenticator } = require("ibm-watson/auth");
const OpenAI = require("openai");
const client = new OpenAI();

export const dynamic = "force-dynamic";

const assistant = new AssistantV2({
    version: "2025-04-02",
    authenticator: new IamAuthenticator({
        apikey: process.env.APIKEY,
    }),
    serviceUrl: process.env.APIURL,
});

export async function POST(request) {
    let data = await request.json();

    // Get language from the request body
    const language = data.language;

    // Initialize transText
    let transText = "";

    if (language !== "English") {
        const response = await client.responses.create({
            model: "gpt-4o-mini",
            input:
                "Translate the following text into English:" +
                data.message +
                "If the text is already in English, it will be returned as is. Return a pure translation.", // 翻译文本
        });

        transText = response.output_text.trim();

        console.log("Translated text:", transText);
    } else {
        transText = data.message;
    }

    // Clean up the translation invalid characters
    transText = String(transText)
        .replace(/[\t\r\n]/g, " ")
        .replace(/\s+/g, " ")
        .trim();

    let params = {
        assistantId: "7b6004ec-9cf4-4631-a286-fac63052422d",
        sessionId: data.session_id,
        input: {
            message_type: "text",
            text: transText,
            options: {
                return_context: true,
            },
        },
    };

    try {
        const res = await assistant.message(params);

        // Log response
        console.log(JSON.stringify(res.result));

        // Extract text responses
        let textResponses = [];
        textResponses = res.result.output.generic
            .filter((item) => item.response_type === "text")
            .map((item) => item.text);

        // Extract options
        let options = [];
        const optionItems = res.result.output.generic.find(
            (item) => item.response_type === "option"
        );
        if (optionItems && optionItems.options) {
            options = optionItems.options.map((opt) => opt.label);
        }

        // Extract suggestions
        let suggestions = [];
        const suggestionItems = res.result.output.generic.find(
            (item) => item.response_type === "suggestion"
        );
        if (suggestionItems && suggestionItems.suggestions) {
            suggestions = suggestionItems.suggestions.map((sug) => sug.label);
        }

        let sessionVariables =
            res.result.context.skills["actions skill"].skill_variables;

        // Translate the output back to user language
        let transRes = "";
        if (language !== "English" && textResponses.length > 0) {
            const response = await client.responses.create({
                model: "gpt-4o-mini",
                input:
                    "Translate the following text into" +
                    language +
                    ":" +
                    textResponses.join("\n"), // 翻译文本
            });

            transRes = response.output_text.trim(); // get translated response
            console.log("Translated response:", transRes);
        } else {
            transRes = textResponses.join("\n"); // If no translation needed, just join responses
            console.log("Original text:", transText);
        }

        // Return response
        return NextResponse.json({
            payload: res.result,
            texts: transRes,
            options: options,
            suggestions: suggestions,
            location: sessionVariables["target_location"],
            status: "INPUT_SUCCESS",
        });
    } catch (err) {
        // Handle errors
        console.log("err happened");
        console.log(JSON.stringify(err));
        return NextResponse.json({
            status: "INPUT_FAIL",
        });
    }
}
