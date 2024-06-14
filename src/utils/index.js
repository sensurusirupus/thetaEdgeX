// // whisper  (audio transcription)
// //this will accept and enpoint
// eg: https://whisperd7a63q1k3t-7ca42ca16474a2a6.tec-s1.onthetaedgecloud.com
// and also a small audo recoring animation looking at the documentation below to convert sound to Text

// audio
// output
// ·
// Built with Gradio logo
// API documentation
// https://whisperd7a63q1k3t-7ca42ca16474a2a6.tec-s1.onthetaedgecloud.com/
// 1 API endpoint

// Use the gradio_client Python library (docs) or the @gradio/client Javascript package (docs) to query the app via API.

// 1. Install the client if you don't already have it installed.

// $ npm i -D @gradio/client

// 2. Find the API endpoint below corresponding to your desired function in the app. Copy the code snippet, replacing the placeholder values with your own input data. Run the code, that's it!
// api_name: /predict

// import { client } from "@gradio/client";

// const response_0 = await fetch("https://github.com/gradio-app/gradio/raw/main/test/test_files/audio_sample.wav");
// const exampleAudio = await response_0.blob();

// const app = await client("https://whisperd7a63q1k3t-7ca42ca16474a2a6.tec-s1.onthetaedgecloud.com/");
// const result = await app.predict("/predict", [
// 				exampleAudio, 	// blob in 'audio' Audio component
// 	]);

// console.log(result.data);

// Accepts 1 parameter:

// [0] undefined Required

// The input value that is provided in the "audio" Audio component.
// Returns 1 element

// string

// The output value that appears in the "output" Textbox component.
