/*
 * This api route is used to create a new session for the assistant.
 * It returns a JSON object with the session ID.
 *
 * The session ID is stored in a global variable to be used by the other API routes.
 * It currently can only exist for 15min without any activity. After that, the session will be automatically deleted.
 */

import { NextResponse } from "next/server";

const AssistantV2 = require("ibm-watson/assistant/v2");
const { IamAuthenticator } = require("ibm-watson/auth");

export const dynamic = "force-dynamic";


const assistant = new AssistantV2({
<<<<<<< HEAD
    version: "2025-04-02",
=======
    version: '2025-05-01',
>>>>>>> a6445437e2d3fae3107283ec9aa3d86c00d4eedf
    authenticator: new IamAuthenticator({
        // !!!!  Replace with your API key !!!!
        apikey: process.env.APIKEY,
    }),
    serviceUrl: process.env.APIURL,
});

export async function GET(request) {
    try {
<<<<<<< HEAD
        if (session_id) {
            console.log("Deleting old session!");
            await assistant.deleteSession({
                assistantId: "7b6004ec-9cf4-4631-a286-fac63052422d",
                sessionId: session_id,
            });
        }

        const res = await assistant.createSession({
            assistantId: "7b6004ec-9cf4-4631-a286-fac63052422d",
        });
        session_id = res.result.session_id;
        console.log("New session!");
=======

        const res = await assistant.createSession({
            assistantId: '7b6004ec-9cf4-4631-a286-fac63052422d'
        })
        console.log("New session!")
>>>>>>> a6445437e2d3fae3107283ec9aa3d86c00d4eedf

        return NextResponse.json({
            payload: res.result.session_id,
        });
    } catch (err) {
        console.log(err);
        return NextResponse.json({
            message: "There was an error handling your request.",
        });
    }
}
