import { NextResponse } from "next/server";

const AssistantV1 = require('ibm-watson/assistant/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const assistant = new AssistantV1({
    version: "2024-11-15",
    authenticator: new IamAuthenticator({
        apikey: "o2IoqbMZh97454-HsrIAUdA6WkqrIFhoTv3Irzauhd_I"
    }),
    serviceUrl: "https://api.eu-gb.assistant.watson.cloud.ibm.com/instances/f0d47658-0d2a-4a9e-a2b0-454062c0bf3d"
});

export async function POST(request) {
    const data = await request.json();
    let message;

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

    return NextResponse.json({
        text: message["output"]["generic"][0]["text"],
        status: "success"
    })
}