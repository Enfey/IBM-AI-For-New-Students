// Use server directive to make this code run serverside
"use server"

// NextResponse used to format json responses to the clientside
import { NextResponse } from "next/server";

const AssistantV1 = require('ibm-watson/assistant/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

// Instantiating WatsonX Assistant with V1 API
const assistant = new AssistantV1({
    version: "2024-11-15",
    authenticator: new IamAuthenticator({
        apikey: process.env.APIKEY
    }),
    serviceUrl: process.env.APIURL
});

// This route serves a POST request from the client, receiving the input message and returning a JSON payload with the Watson Assistant message
export async function POST(request) {
    // Unpacks the request into a json
    const data = await request.json();
    let message;

    // Attempts to fetch message generated from V1 API using valid workspace ID and user input message
    // Returns "status: error", if the assistant fails to generate a response
    try {
        let res = await assistant.message({
            workspaceId: "79ca4c1f-3256-434d-b677-053222cf4c0b",
            input: {'text': data.message}
        })
        message = res.result;
    } catch (err) {
        return NextResponse.json({
            text: "",
            status: "error"
        })
    }

    // If previous call did not return an error, return the successful message output through JSON and set "status: success"
    return NextResponse.json({
        text: message["output"]["generic"][0]["text"],
        status: "success"
    })
}