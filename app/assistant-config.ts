export let assistantId = "asst_ONG1kQglrgkJRDsnLE7ag7jF"; // set your assistant ID here

if (assistantId === "") {
  assistantId = process.env.OPENAI_ASSISTANT_ID;
}
